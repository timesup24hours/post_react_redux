import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'
//actions
import { addMessage, requestChatHistory } from '../../actions/chatActions'
//material-ui
import CircularProgress from 'material-ui/CircularProgress';
//components
import Mask from '../mask/Mask'
import ChatView from './ChatView'
import ChatForm from './ChatForm'
import Notification from '../notification/Notification'
import UserDetail from '../userDetail/UserDetail'


// import axios from 'axios'
import { setCurrentUser, login } from '../../actions/authActions'

class ChatPage extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    if(!this.props.auth.isAuthenticated) {
      this.redirectTimer = setTimeout( () => {
        this.redirect = this.context.router.push('/login');
      }, 6000)
    }
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      // http://localhost:4000
      // wss://boiling-headland-77828.herokuapp.com or www.huanlinhuang.com
      this.socket = io.connect('www.huanlinhuang.com/api/chat', { 'forceNew': true }) // start connecting socket
      this.props.requestChatHistory() // load chat history from DB
      this.socket.on('message', message => {
        this.props.addMessage(message)
      })
    }
  }

  componentWillUpdate(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.redirectTimer = setTimeout( () => {
        this.redirect = this.context.router.push('/login');
      }, 6000)
    }
  }

  componentWillUnmount() {
    // this.socket.disconnect();
    if(this.socket) {
      this.socket.close(); // 上面和这个一样，任何一个写法都是可以的，是close connection 用的
    }

    clearTimeout(this.redirectTimer)
    this.redirectTimer = undefined
    this.redirect = undefined

  }


  render() {
    return (
      <div className='chatPage-container'>
        <ChatView {...this.props} />
        <ChatForm socket={this.socket} {...this.props} />
        {!this.props.auth.isAuthenticated
          ? <Mask show={true} showCircle={false} >
              <div className='chatPage-notifi-container'>
                <Notification cancellable={false} show={true}  >
                  <div>Please Sign In to chat</div>
                  <br/>
                  <div>Redirecting...</div>
                  <div className='chatPage-spinner'><CircularProgress /></div>
                </Notification>
              </div>
            </Mask>
          : null}

        {/*  用户信息  */}
        {this.props.userDetail.show
          ? <UserDetail userDetailInfo={this.props.userDetail.userDetailInfo} />
          : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chat: state.chat,
    auth: state.auth,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: bindActionCreators(addMessage, dispatch),
    setCurrentUser: bindActionCreators(setCurrentUser, dispatch),
    login: bindActionCreators(login, dispatch),
    requestChatHistory: bindActionCreators(requestChatHistory, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPage)
