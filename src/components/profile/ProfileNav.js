import React, { Component } from 'react'
import FlatButton from 'material-ui/FlatButton';

class ProfileNav extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    return (
      <div className='profileNav-container'>
        <FlatButton onClick={() => this.context.router.push('/profile/information')} label="Infomation" />
        <FlatButton onClick={() => this.context.router.push('/profile/avatar')} label="Avatar" />
        <FlatButton onClick={() => this.context.router.push('/profile/reset_password')} label="Reset Password" />
      </div>
    )
  }
}

export default ProfileNav

// <Link to='/profile/information' >Infomation</Link>
// <Link to='/profile/avatar' >Avatar</Link>
// <Link to='/profile/reset_password' >Reset Password</Link>
