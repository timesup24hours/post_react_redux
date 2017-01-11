import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import { bindActionCreators } from 'redux'
//material ui
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
//actions
import { requestForgetPassword } from '../../actions/forgetPasswordActions'

class ForgetPassword extends Component {
  constructor() {
    super()
    this.state = {
      error: '',
      onBlurNum: 0,
      hasErr: false,
      email: '',
      submitDone: false,
      submitting: false,
      boxContent: ''
    }
  }

  checkEmail = () => {
    if(this.state.onBlurNum > 0) {
      this.checkErr()
    }
  }

  checkErr = () => {
    this.setState({ onBlurNum: 1 });
    if(this.refs.email.input.value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.refs.email.input.value)) {
      this.setState({ error: 'Invalid email address!', hasErr: true })
    } else if (!ReactDOM.findDOMNode(this.refs.email.input).value) {
      this.setState({ error: '', hasErr: true })
    } else {
      this.setState({ error: '', hasErr: false })
    }
    return this.state.hasErr
  }

  sendEmail = (e) => {
    const email = this.refs.email.input.value
    e.preventDefault()
    if(!this.checkErr() && email) {
        this.setState({ submitting: true })
        this.props.requestForgetPassword({email: email}).then( res => {
          if(res.data.success) {
            this.setState({ boxContent: res.data.success })
            this.setState({ submitting: false })
            this.setState({ email: email })
            this.setState({ submitDone: true })
          } else {
            this.setState({ boxContent: res.data.err })
            this.setState({ submitDone: true })
            this.setState({ submitting: false })
          }
        })
    } else {
      this.setState({ error: 'Email is Required!', hasErr: true })
    }
  }

  render() {
    let maskHide = this.state.submitting ? '' : 'forgetPassword-mask-hide'
    let sentInfo = this.state.submitDone ? '' : 'forgetPassword-sent-hide'
    return (
      <div className='forgetPassword-container'>
        <form onSubmit={this.sendEmail} className='forgetPasswordForm'>
          <div className='forgetPassword-text-field'>
            <TextField onBlur={this.checkErr} onChange={this.checkEmail} ref='email' hintText="Email"
                floatingLabelText="Email"
                fullWidth={true} errorText={this.state.error}/>
          </div>
          <div className='forgetPassword-btn'>
            <RaisedButton type='submit' label="Send" primary={true} disabled={this.state.hasErr} />
          </div>
          <div className={`forgetPassword-mask ${maskHide}`}><CircularProgress size={60} thickness={7} /></div>
          <div className={`animated fadeIn forgetPassword-sent ${sentInfo}`}>
            <div>{this.state.boxContent}<strong>{this.state.email}</strong></div>
          </div>
        </form>
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
    requestForgetPassword: bindActionCreators(requestForgetPassword, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword);
