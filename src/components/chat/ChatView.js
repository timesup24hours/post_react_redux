import React, { Component } from 'react'
import ChatViewList from './ChatViewList'

class ChatView extends Component {

  componentDidMount() {
    let element = document.getElementById("chatView")
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  componentDidUpdate() {
    let element = document.getElementById("chatView")
    element.scrollTop = element.scrollHeight - element.clientHeight;
  }

  render() {
    const { chat } = this.props
    const messages = chat.map( c => {
      return (
        <ChatViewList {...this.props}
            key={c._id}
            userId={c.userId._id}
            avatar_name={c.userId.local.avatar_name}
            nick_name={c.userId.local.nick_name}
            username={c.userId.local.username}
            message={c.message} />
      )
    })
    return (
      <div id='chatView' className='chatView-container'>
        <ul>
          {messages}
        </ul>
      </div>
    )
  }
}

export default ChatView
