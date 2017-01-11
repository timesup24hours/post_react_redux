import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//actions
import { submitLogin } from '../../actions/loginActions'
//components
import Mask from '../mask/Mask'
import Notification from '../notification/Notification'
//actions
import { login } from '../../actions/authActions'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'account', 'password' ]
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

class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      showBox: false,
      showBoxContent: ''
    }
    // location = window.location.protocol + "//" + window.location.host +  "/auth/facebook";
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  login = (values, dispatch) => {
    return new Promise( (resolve, reject) => {
      return this.props.submitLogin(values).then( res => {
        if(res.data.success) {
          this.props.login(res.data.token)
          resolve()
          this.context.router.push('/posts')
        } else {
          if(res.data.notVerify) {
            this.setState({ showBoxContent: res.data.notVerify })
            this.handleHide()
          } else {
            this.setState({ showBoxContent: 'Unauthenticated!' })
            this.handleHide()
          }
          reject(res.data.err)
        }
      })
    })
  }

  handleHide = () => {
    this.setState({ showBox: !this.state.showBox })
    return this.state.showBox
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form className='loginForm-container' onSubmit={handleSubmit(this.login)}>
        <div className='loginForm-field-group'>
          <div>
            <Field name="account" component={renderTextField} label="Email or Username"/>
          </div>
          <div>
            <Field name="password" type='password' component={renderTextField} label="Password"/>
          </div>
        </div>
        <div className='loginForm-button-group'>
          <RaisedButton className='loginForm-submit' type="submit" label="Sign in" primary={true} disabled={pristine || submitting} />
        </div>
        <Mask show={submitting} showCircle={true}/>
        <Notification cancellable={true} handleHide={this.handleHide} show={this.state.showBox} content={this.state.showBoxContent} />
      </form>
    )
  }
}

LoginForm = reduxForm({
  form: 'LoginForm',
  validate
})(LoginForm)

function mapStateToProps(state) {
  return {
    // LoginForm: state.LoginForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitLogin: bindActionCreators(submitLogin, dispatch),
    login: bindActionCreators(login, dispatch)
  }
}

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginForm
