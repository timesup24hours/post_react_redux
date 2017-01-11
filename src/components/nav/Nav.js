import React, { Component } from 'react'
// import ReactDOM from 'react-dom'
// import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import rLogo2 from '../../images/rLogo2.png'
//actions
import { openNav, closeNav, toggleNav } from '../../actions/navActions'
import { setRouteStatus } from '../../actions/routeActions'
//material-ui
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
//components
// import RouteStatus from './RouteStatus' <RouteStatus path={location.pathname} />
import NavRightMenu from './NavRightMenu'


class Nav extends Component {
  constructor() {
    super()
    this.state = {
      NavNavbarContainerMin: '',
      NavLogoHide: '',
      NavLogoMinShow: '',
      NavRightMenuContainerHide : '',
      NavRightMenuIconShow : ''
    }
  }


  toggleLeftMenu = () => {
    this.props.toggleNav();
  }

  scroll = () => {
    if(document.body.scrollTop > 300) {
      if(document.body.clientWidth > 700) {
        this.setState({ NavNavbarContainerMin: 'Nav-navbar-container-min',
                        NavLogoHide: 'hide',
                        NavLogoMinShow: 'Nav-logo-min-show',
                        NavRightMenuContainerHide : 'hide',
                        NavRightMenuIconShow : 'Nav-right-menu-icon-show'
        })
      }
    } else {
      if(document.body.clientWidth > 700) {
        this.setState({ NavNavbarContainerMin: '',
                        NavLogoHide: '',
                        NavLogoMinShow: '',
                        NavRightMenuContainerHide : '',
                        NavRightMenuIconShow : ''
        })
      }

    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
  }


  render() {
    return (
      <nav ref='NavBar' className={`animated Nav-navbar-container ${this.state.NavNavbarContainerMin}`}>

        <div ref='logo' className={`animated fadeIn Nav-logo ${this.state.NavLogoHide}`}>
          <img className='Nav-logo-img' src={rLogo2} alt=""/>
        </div>

        <div ref='logo' className={`animated fadeIn Nav-logo-min ${this.state.NavLogoMinShow}`}>
          <img className='Nav-logo-img' src={rLogo2} alt=""/>
        </div>

        <NavRightMenu NavRightMenuContainerHide={this.state.NavRightMenuContainerHide} />

        <div ref='NavIcon' className={`animated bounceInRight Nav-right-menu-icon ${this.state.NavRightMenuIconShow}`} onClick={this.toggleLeftMenu}>
          <NavigationMenu style={{ fill: 'black', height: '40px', width: '30px' }}/>
        </div>


      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
    routeStatus: state.routeStatus,
    auth: state.auth
  }
}

function mapDispactchToProps(dispatch) {
  return {
    openNav: bindActionCreators(openNav, dispatch),
    closeNav: bindActionCreators(closeNav, dispatch),
    toggleNav: bindActionCreators(toggleNav, dispatch),
    setRouteStatus: bindActionCreators(setRouteStatus, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(Nav)
