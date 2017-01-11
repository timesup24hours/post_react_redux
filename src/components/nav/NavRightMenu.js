import React, { Component } from 'react'
import { connect } from 'react-redux'
import Links from './Links'

class NavRightMenu extends Component {


  render() {
    const signedInRoute = [ { pathName: 'HOME', path: '/'},
                            { pathName: 'POST', path: '/posts'},
                            { pathName: 'CHAT', path: '/chat' },
                            { pathName: 'CONTACT', path: '/contact' },
                            { pathName: 'PROFILE', path: '/profile'} ]

    const publicRoute = [ { pathName: 'HOME', path: '/'},
                          { pathName: 'POST', path: '/posts'},
                          { pathName: 'CONTACT', path: '/contact' },
                          { pathName: 'SIGN IN', path: '/login'} ]
    const RouteArray = this.props.auth.isAuthenticated ? signedInRoute : publicRoute

    const RouteLinks = RouteArray.map( (p, i) => {
      return (
        <Links
            pathName={p.pathName}
            path={p.path}
            key={i}
            pathLocation={this.props.routeStatus.status}/>
      )
    })

    return (
      <div ref='NavRight' className={`animated bounceInRight NavRightMenu-container ${this.props.NavRightMenuContainerHide}`}>
        <ul className='links-ul'>
          {RouteLinks}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routeStatus: state.routeStatus,
    auth: state.auth
  }
}

function mapDispactchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(NavRightMenu)
