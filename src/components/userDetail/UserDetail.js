import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
//action
import { hideUserDetail } from '../../actions/userDetailActions'

class UserDetail extends Component {
  render() {
    const { avatar_name, nick_name, username } = this.props.userDetail.userDetailInfo
    return (
      <div onClick={this.props.hideUserDetail} className='UserDetail-container'>
        <div className='UserDetail-user-info-container'>
          {/* header */}
          <div className='UserDetail-user-info-header'>
            {avatar_name
              ? <div className='UserDetail-avatar UserDetail-custom-avatar'>
                  <img src={avatar_name} alt=""/>
                </div>
              : <div className='UserDetail-avatar UserDetail-default-avatar'>
                  <Face style={{ height: '120px', width: '120px'}} />
                </div>}
          </div>
          {/* body */}
          <div className='UserDetail-user-info-body'>
            <div className='UserDetail-user-info-detail'>
              <div className='UserDetail-user-info-detail-username'>{username}</div>
              {nick_name ? <div className='UserDetail-user-info-detail-nickName'>{nick_name}</div> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    hideUserDetail: bindActionCreators(hideUserDetail, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail)
