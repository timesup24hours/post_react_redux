import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import ProfileNav from './ProfileNav'

class ProfilePage extends Component {
  render() {
    return (
      <div className='profilPage-container'>
        <ProfileNav />
        <div className='profilPage-view'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default ProfilePage
