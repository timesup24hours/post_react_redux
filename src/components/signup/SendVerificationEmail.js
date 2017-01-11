import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, formValueSelector } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//components
import Notification from '../notification/Notification'
import Mask from '../mask/Mask'
//actions
import { sendVerificationEmail } from '../../actions/sendVerificationEmailActions'
import { setContent } from '../../actions/notificationActions'

const selector = formValueSelector('SendVerificationEmail') // declare the form selector

const validate = values => {
  const errors = {}
  const requiredFields = []
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
)

class SendVerificationEmail extends Component {

  send = (values, dispatch) => {
    return new Promise( (resovle, reject) => {
      return this.props.sendVerificationEmail(values).then( res => {
        if(res.data.msg) {
          this.props.setContent(res.data.msg)
          resovle()
        } else {
          this.props.setContent(res.data.err)
          reject(res.data.err)
          // throw new SubmissionError(res.data.err)
        }
      })
    })
  }

  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded } = this.props
    return (
      <div className='sendVerificationEmail-container'>
        <form onSubmit={handleSubmit(this.send)} className='sendVerificationEmailForm'>
          <div className='sendVerificationEmail-text-field'>
            <Field name="email" component={renderTextField} label="Email"/>
          </div>
          <div className='sendVerificationEmail-btn'>
            <RaisedButton type='submit' label="send" primary={true} disabled={pristine || submitting} />
          </div>
          <Mask show={submitting}/>
          <Notification cancellable={false} show={submitSucceeded} content={this.props.notification.content} />
        </form>
      </div>
    )
  }
}

SendVerificationEmail = reduxForm({
  form: 'SendVerificationEmail',
  validate
})(SendVerificationEmail)

function mapStateToProps(state) {
  return {
    email: selector(state, 'email'), // 'formValueSelector' select the values of the form
    notification: state.notification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendVerificationEmail: bindActionCreators(sendVerificationEmail, dispatch),
    setContent: bindActionCreators(setContent, dispatch)
  }
}

SendVerificationEmail = connect(mapStateToProps, mapDispatchToProps)(SendVerificationEmail);

export default SendVerificationEmail
