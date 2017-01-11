import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, reset, formValueSelector } from 'redux-form'
//material-ui
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
// import shortid from 'shortid';
//socket
// import io from 'socket.io-client'
// const socket = io('http://localhost:3000/chat')

// const socket = io('http://localhost:3000', { path: '/chat' })

// import crypto from 'crypto'
//   let seed = crypto.randomBytes(20);
//   let token = crypto.createHash('sha1').update(shortid.generate()).digest('hex');
//components

const selector = formValueSelector('ChatForm')

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    errorText={touched && error}
    fullWidth={true}
    multiLine={true}
    rowsMax={2}
    {...input}
    {...custom}
  />
)

class ChatForm extends Component {

  sendMsg = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      if(values.message) {
        this.props.socket.emit('message', {
          //  msgId: Math.floor(Math.random() * new Date().getTime()) + shortid.generate() + new Date().getTime().toString() + Math.floor(Math.random() * 20),
           userId: this.props.auth.user.id,
          //  username: this.props.auth.user.username,
          //  nick_name: this.props.auth.user.nick_name,
          //  avatar_name: this.props.auth.user.avatar_name,
           message: values.message })
        dispatch(reset('ChatForm'))
        resolve()
      } else {
        reject()
        // throw { message : 'can not be empty' }
      }
    })
  }

  handleKeySubmit = () => {
    if(event.keyCode === 13 && this.props.message) {

    }
  }

  render() {
    const { handleSubmit } = this.props
    // let maskHide = this.props.auth.isAuthenticated ? 'chatForm-mask-hide' : ''
    return (
      <div className='chatForm-container'>
        <form className='chatForm' onSubmit={handleSubmit(this.sendMsg)}>
          <div className='chatForm-input'>
            <Field name="message" component={renderTextField} label="Message..." onKeyUp={this.handleKeySubmit} />
          </div>
          <div className='chatForm-btn'>
            <RaisedButton type="submit" label="SEND" primary={true} />
          </div>
        </form>

      </div>
    )
  }
}
        // <div className={`chatForm-mask ${maskHide}`}>Must be login to chat</div>

ChatForm = reduxForm({
  form: 'ChatForm'
})(ChatForm)

function mapStateToProps(state) {
  return {
    auth: state.auth,
    message: selector(state, 'message')
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

ChatForm = connect(mapStateToProps, mapDispatchToProps)(ChatForm);

export default ChatForm
