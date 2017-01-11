import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import SignupForm from './SignupForm'

class SignupPage extends Component {
  render() {
    return (
      <div className='signup-page-container'>
        <div className='signup-page-text'>Create your Account</div>
        <SignupForm />
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
