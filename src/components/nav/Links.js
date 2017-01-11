import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { setRouteStatus } from '../../actions/routeActions'
import { navActiveClass } from '../../actions/navActions'
//component
import UserLinks from '../userLinks/UserLinks(MDL)'
//material-ui
import RaisedButton from 'material-ui/RaisedButton'
// import Home from 'material-ui/svg-icons/action/home'
// import Forum from 'material-ui/svg-icons/communication/forum'
// import Communication from 'material-ui/svg-icons/communication/chat'
// // import QuestionAnswer from 'material-ui/svg-icons/action/question-answer'
// import ContactMail from 'material-ui/svg-icons/communication/contact-mail'
// import FingerPrint from 'material-ui/svg-icons/action/fingerprint'
// import EventNote from 'material-ui/svg-icons/notification/event-note'
// import AccountBox from 'material-ui/svg-icons/action/account-box'
// import DirectionsWalk from 'material-ui/svg-icons/maps/directions-walk'
// {pathName === 'Home' ? <Home/>
// : pathName === 'Posts' ? <Communication/>
// : pathName === 'Chat' ? <Forum/>
// : pathName === 'Contact' ? <ContactMail/>
// : pathName === 'Register' ? <EventNote/>
// : pathName === 'Login' ? <FingerPrint/> : null}

class Links extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleRouteActive = () => {
    // this.props.setRouteStatus(this.props.pathLocation)
    this.props.navActiveClass()
  }

  goToSignIn = () => {
    this.context.router.push('/login')
  }
  render() {
    const { pathName, path, pathLocation } = this.props

    if(path === '/profile') {
      return (
        <li className='links-UserLinks-container'>
          {this.props.auth.isAuthenticated ? <UserLinks /> : null}
        </li>
      )
    } else if(path === '/login') {
      return (
        <li className='links-signin-btn'>
          <RaisedButton primary={true} type="button" onClick={this.goToSignIn} label="sign in" />
        </li>
      )
    } else {
      return (
        <li>
          <Link
                to={path}
                onClick={this.handleRouteActive}
              >
              {pathName}
          </Link>
          <div className={pathLocation === path ? (this.props.activeClass.active === false ? 'links-route-active' : '') : ''}></div>
          <div className={location.pathname === path ? (this.props.activeClass.active === true ? 'links-route-active' : '') : ''}></div>
        </li>
      )
    }

  }

}

function mapStateToProps(state) {
  return {
    routeStatus: state.routeStatus,
    activeClass: state.activeClass,
    auth: state.auth
  }
}

function mapDispactchToProps(dispatch) {
  return {
    setRouteStatus: bindActionCreators(setRouteStatus, dispatch),
    navActiveClass: bindActionCreators(navActiveClass, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(Links)

//
// import React from 'react'
// import { Link } from 'react-router'
//
// export default (props) => {
//   const { pathName, handleRouteActive } = props
//   let splitPathName = pathName.split('/')[0];
//   return (
//     <li>
//       <Link
//             to={pathName === 'home' ? '/' : `/${pathName}`}
//             onClick={handleRouteActive}
//           >
//           {splitPathName.charAt(0).toUpperCase() + splitPathName.slice(1)}
//       </Link>
//       <div className={props.location === `/${pathName}` ? 'activeClassDiv' : ''}></div>
//     </li>
//   )
// }
