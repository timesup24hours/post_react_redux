import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//components
import Notification from '../notification/Notification'
import Mask from '../mask/Mask'
//redux form
import { Field, reduxForm } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//actions
import { resetPassword } from '../../actions/resetPasswordActions'
import { setContent } from '../../actions/notificationActions'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.password !== values.passwordConfirm) {
    errors.password = 'Password mush be match'
  }
  if (values.password && values.password.length < 6) {
    errors.password = 'Password mush be longer than 6 character'
  }
  if (values.passwordConfirm && values.passwordConfirm.length < 6) {
    errors.passwordConfirm = 'Password Comfirmation mush be longer than 6 character'
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

class ResetPassword extends Component {

  submitReset = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      return this.props.resetPassword(this.props.location.query.token, values)
        .then( res => {
          if(res.data.success) {
            console.log(res.data.success);
            this.props.setContent(res.data.success)
            resolve()
          } else {
            console.log(res.data.err);
            this.props.setContent(res.data.err)
            reject(res.data.err)
          }
        })
    })
  }

  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded } = this.props
    return (
      <div className='resetPassword-container'>
        <form className='resetPasswordForm' onSubmit={handleSubmit(this.submitReset)}>
          <div className='resetPasswordForm-password'>
            <Field name="password" component={renderTextField} label="Password" />
          </div>
          <div className='resetPasswordForm-password'>
            <Field name="passwordConfirm" component={renderTextField} label="Password Confirmation"/>
          </div>
          <div className='resetPasswordForm-button-group'>
            <RaisedButton className='resetPasswordForm-submit' type="submit" label="Reset" primary={true} disabled={pristine || submitting} />
          </div>
          <Mask show={submitting} showCircle={true} />
          <Notification show={submitSucceeded} cancellable={false} content={this.props.notification.content} />
        </form>
      </div>
    )
  }
}

ResetPassword = reduxForm({
  form: 'ResetPassword',
  validate
})(ResetPassword)

function mapStateToProps(state) {
  return {
    notification: state.notification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    resetPassword: bindActionCreators(resetPassword, dispatch),
    setContent: bindActionCreators(setContent, dispatch)
  }
}

ResetPassword = connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

export default ResetPassword
