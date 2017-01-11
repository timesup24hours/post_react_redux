import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
//actions
import { showUserDetail } from '../../actions/userDetailActions'

class ChatViewList extends Component {

  showUserDetail = () => {
    this.props.showUserDetail({
      avatar_name: this.props.avatar_name,
      nick_name: this.props.nick_name,
      username: this.props.username
    })
  }

  render() {
    const { message, userId, avatar_name } = this.props
    const meClass = this.props.auth.user.id && this.props.auth.user.id === userId ? 'chatViewList-li-me me-margin-left' : 'other-margin-right'
    return (
      <li className={`chatViewList-li ${meClass}`}>

        {/*  头像  */}
        {avatar_name
          ? <div className='chatViewList-avatar'>
              <img onClick={this.showUserDetail} src={`${avatar_name}`} alt=""/>
            </div>
          : <Face onClick={this.showUserDetail} style={{ margin: '0px 10px', height: '30px', minWidth: '30px'}} />}

        {/*  内容  */}
        <div className='chatViewList-message'>{message}</div>

      </li>
    )
  }
}

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showUserDetail: bindActionCreators(showUserDetail, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatViewList)
