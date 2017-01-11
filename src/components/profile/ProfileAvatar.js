import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import Face from 'material-ui/svg-icons/action/face'
import UploadAvatar from './UploadAvatar'



class ProfileAvatar extends Component {

  render() {
    return (
      <div className='profileAvatar-container'>
        { this.props.auth.user.avatar_name
          ?
            <div className='profileAvatar-avatar'>
            <img src={`${this.props.auth.user.avatar_name}`} alt=""/>
            </div>
          :
            <Face style={{ margin: '0px 10px', height: '80px', width: '80px'}} />
        }

        <UploadAvatar />
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAvatar);


// import DIYcropper from '../../utils/DIYcropper'
// import CropAvatar from './CropAvatar'
