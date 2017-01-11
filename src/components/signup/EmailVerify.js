import React, { Component } from 'react'

import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Notification from '../notification/Notification'
//acionts
import { verfiyEmail } from '../../actions/emailVerifyActions'
import { setContent } from '../../actions/notificationActions'

class EmailVerify extends Component {

  componentWillMount() {
    this.props.verfiyEmail(this.props.location.query.token).then( res => {
      if(res.data.success) {
        this.props.setContent(res.data.success)
      } else {
        this.props.setContent(res.data.err)
      }
    })
  }

  render() {
    return (
      <div className='emailVerified-container'>
        <div className='emailVerified-notification'>
          <Notification cancellable={false} show={true} content={this.props.notification.content} />
        </div>
        <div className='sendVerificationEmail-Link'><Link to='/send_verify_email'>Resend Verification Email</Link></div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification
  }
}

function mapDispactchToProps(dispatch) {
  return {
    verfiyEmail: bindActionCreators(verfiyEmail, dispatch),
    setContent: bindActionCreators(setContent, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(EmailVerify)
