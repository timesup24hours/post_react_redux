import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
// import { Link } from 'react-router'
import UpdateInfo from './UpdateInfo'
// import UpdateField from './UpdateField'

class ProfileInfo extends Component {

  render() {
    return (
      <div className='profileInfo-container'>
        <UpdateInfo {...this.props} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);

// <UpdateField form='usernameForm' fieldName='username' />
// <UpdateField form='emailForm' fieldName='email' />
// <UpdateField form='nickNameForm' fieldName='nick_name' />
