import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, formValueSelector } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
//actions
import { submitSignup, isUserExist } from '../../actions/signupActions'
//components
import Notification from '../notification/Notification'
import Mask from '../mask/Mask'
// declare the form selector
const selector = formValueSelector('SignupForm')

const asyncValidate = (values, dispatch) => {
  if(values) {
    return new Promise(( resovle, reject ) => {
     return dispatch(isUserExist(values))
      .then( res => {
        if(res.data.success) {
          resovle()
        } else {
          // console.log(res.data);
          reject(res.data)
          // throw res.data
          // throw new SubmissionError(res.data.err)
        }
      })
    })
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = [ 'username', 'email', 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.username && values.username.length < 6) errors.username = `mush be longer than 6 characters! ${values.username.length}/6`
  if (values.username && values.username.length > 20) errors.username = `mush be less than 20 characters! ${values.username.length}/20`
  if (values.username && values.username.indexOf(' ') >= 0) errors.username = `Could not contain white space!`
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.passwordConfirm && values.password !== values.passwordConfirm) {
    errors.password = 'Password mush be match'
  }
  if (values.password && values.password.length < 6) errors.password = `mush be longer than 6 characters! ${values.password.length}/6`
  if (values.password && values.password.length > 20) errors.password = `mush be less than 20 characters! ${values.password.length}/20`
  if (values.password && values.password.indexOf(' ') >= 0) errors.password = `Could not contain white space!`
  if (values.passwordConfirm && values.passwordConfirm.length < 6) errors.passwordConfirm = `mush be longer than 6 characters! ${values.passwordConfirm.length}/6`
  if (values.passwordConfirm && values.passwordConfirm.length > 20) errors.passwordConfirm = `mush be less than 20 characters! ${values.passwordConfirm.length}/20`
  if (values.passwordConfirm && values.passwordConfirm.indexOf(' ') >= 0) errors.passwordConfirm = `Could not contain white space!`
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

class SignupForm extends Component {




  signup = (values, dispatch) => {
    return new Promise( (resovle, reject) => {
      return this.props.submitSignup(values).then( res => {
        if(res.data.success) {
          resovle()
          // dispatch(reset('SignupForm'))
        } else {
          console.log(res.data.err);
          reject(res.data.err)
          // throw new SubmissionError(res.data.err)
        }
      })
    })
  }

  // this is how to change the value of the field
  // test = () => {
  //   this.props.change('email', 'asdf')
  // }
  // <RaisedButton className='singupForm-submit' onClick={this.test} label="TEST" primary={true}  />

  render() {
    const { handleSubmit, pristine, submitting, submitSucceeded } = this.props

    return (
      <form className='singupForm-container' onSubmit={handleSubmit(this.signup)}>
        <div className='singupForm-field-group'>
          <div>
            <Field name="username" component={renderTextField} label="Username"  />
          </div>
          <div>
            <Field name="email" component={renderTextField} label="Email"/>
          </div>
          <div>
            <Field name="password" type='password' component={renderTextField} label="Password"/>
          </div>
          <div>
            <Field name="passwordConfirm" type='password' component={renderTextField} label="Password Confirmation"/>
          </div>
        </div>
        <div className='singupForm-button-group'>
          <RaisedButton className='singupForm-submit' type="submit" label="Sign up" primary={true} disabled={pristine || submitting} />
        </div>
        <Mask show={submitting} showCircle={true}/>
        <Notification cancellable={false} show={submitSucceeded} content='You will be received a verification email in a few minutes, please check ' email={this.props.email} />
      </form>
    )
  }
}

SignupForm = reduxForm({
  form: 'SignupForm',
  validate,
  asyncValidate,
  asyncBlurFields: [ 'username', 'email' ]
})(SignupForm)

function mapStateToProps(state) {
  return {
    email: selector(state, 'email'), // 'formValueSelector' select the values of the form
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitSignup: bindActionCreators(submitSignup, dispatch),
    isUserExist: bindActionCreators(isUserExist, dispatch)
  }
}

SignupForm = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default SignupForm
