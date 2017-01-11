import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import { openNav, closeNav, toggleNav } from '../../actions/navActions'
import { logout } from '../../actions/authActions'
//material-ui
import Home from 'material-ui/svg-icons/action/home'
import Forum from 'material-ui/svg-icons/communication/forum'
import Communication from 'material-ui/svg-icons/communication/chat'
// import QuestionAnswer from 'material-ui/svg-icons/action/question-answer'
import ContactMail from 'material-ui/svg-icons/communication/contact-mail'
import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
import EventNote from 'material-ui/svg-icons/notification/event-note'
import AccountBox from 'material-ui/svg-icons/action/account-box'
import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk'


class LeftNav extends Component {

  handleLogout = () => {
    this.props.logout()
    this.props.closeNav()
  }


  render() {
    const { isAuthenticated } = this.props.auth;
    const userLinks = [
        <li key='1'><AccountBox /><Link to='/profile' onClick={() => this.props.closeNav()} >PROFILE</Link></li>,
        <li key='2'><DirectionsWalk /><Link onClick={this.handleLogout} >SIGN OUT</Link></li>
      ]

    const guestLinks = [
      <li key='3'><EventNote /><Link onClick={() => this.props.closeNav()} to='/signup' className=''>SIGN UP</Link></li>,
      <li key='4'><FingerPrint /><Link onClick={() => this.props.closeNav()} to='/login' className=''>SIGN IN</Link></li>
      ]

    const isOpen = this.props.nav.isOpen ? 'LeftNav-show' : ''
    return (
      <div className={`LeftNav-container ${isOpen}`}>
        <ul>
          <li><Home /><Link onClick={() => this.props.closeNav()} to='/' className=''>HOME</Link></li>
          <li><Communication /><Link onClick={() => this.props.closeNav()} to='/posts' className=''>POST</Link></li>
          <li><Forum /><Link onClick={() => this.props.closeNav()} to='/chat' className=''>CHAT</Link></li>
          <li><ContactMail /><Link onClick={() => this.props.closeNav()} to='/contact' className=''>CONTACT</Link></li>
          { isAuthenticated ? userLinks : guestLinks }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
    auth: state.auth
  }
}

function mapDispactchToProps(dispatch) {
  return {
    openNav: bindActionCreators(openNav, dispatch),
    closeNav: bindActionCreators(closeNav, dispatch),
    toggleNav: bindActionCreators(toggleNav, dispatch),
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(LeftNav)
