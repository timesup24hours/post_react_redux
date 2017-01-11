import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import LoginForm from './LoginForm'
import RaisedButton from 'material-ui/RaisedButton'

class LoginPage extends Component {
  render() {
    return (
      <div className='login-page-container'>
        <div className='login-page-header'>
          Sign In
        </div>
        <LoginForm />
        <div className='social-login-group'>
          <RaisedButton className='login-page-facebook-login' href="/auth/facebook" label="Facebook Login" primary={true} />
        </div>
        <br/>
        <div>
          <Link to='/signup'>or Register Here</Link>
        </div>
        <div className='login-page-forget-password'>
          <Link to='/forget_password'>Forget Password</Link>
        </div>
      </div>
    )
  }
}

/**
 *  Social Login Feature, it's not ready to use yet, it needed to implement API and DB and redirecting.
 */
// <div className='social-login-group'>
// <RaisedButton className='login-page-facebook-login' href="http://localhost:4000/auth/facebook" label="Facebook Login" primary={true} />
// <RaisedButton className='login-page-google-login' href="http://localhost:4000/auth/google" label="Google Login" primary={true} />
// </div>

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
