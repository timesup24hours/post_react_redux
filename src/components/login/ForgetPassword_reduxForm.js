import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, reset, SubmissionError } from 'redux-form'
// import { bindActionCreators } from 'redux'
//material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


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

class ForgetPassword extends Component {

  send = (values, dispatch) => {
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <div className='forgetPassword-container'>
        <form onSubmit={handleSubmit(this.send)} className='forgetPasswordForm'>
          <div className='forgetPassword-text-field'>
            <Field name="email" component={renderTextField} label="Email"/>
          </div>
          <div className='forgetPassword-btn'>
            <RaisedButton type='submit' label="Send" primary={true} disabled={pristine || submitting} />
          </div>
        </form>
        <div className='forgetPassword-sent'>
          <div>A reset password has been sent to EMAIL</div>
        </div>
      </div>
    )
  }
}
// <div className='forgetPassword-sent'>
//   <div>A reset password has been sent to EMAIL</div>
// </div>
ForgetPassword = reduxForm({
  form: 'ForgetPassword',
  validate
})(ForgetPassword)

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

ForgetPassword = connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);

export default ForgetPassword
