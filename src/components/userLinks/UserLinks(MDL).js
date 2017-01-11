import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
import MenuItem from 'material-ui/MenuItem'
//acionts
import { logout } from '../../actions/authActions'
import MDLite from 'material-design-lite/dist/material.js'
const componentHandler = MDLite.componentHandler;

class UserLinks extends Component {

  componentDidMount() {
    componentHandler.upgradeDom();
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }


  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  goToProfile = () => {
    this.context.router.push('/profile')
  }

  render() {
    return (
      <div className='userLinks-container'>

        <button id="userLinks-avatar-menu"
          className="mdl-button mdl-js-button mdl-button--icon">
          { this.props.auth.user.avatar_name
            ? <img ref='avatar' className='userLinks-avatar-img' style={{ marginTop: '-3px' }}
                   src={`${this.props.auth.user.avatar_name}`} alt=""/>
            : <Face style={{ margin: '0px 0px', height: '30px', width: '30px'}} />
          }
        </button>

        <ul className="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
            htmlFor="userLinks-avatar-menu" >
          <MenuItem primaryText="Profile" onTouchTap={this.goToProfile} />
          <MenuItem primaryText="Log out" onTouchTap={() => this.props.logout()} />
        </ul>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispactchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(UserLinks)
