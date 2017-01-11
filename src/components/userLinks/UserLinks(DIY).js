import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Paper from 'material-ui/Paper';
//acionts
import { logout } from '../../actions/authActions'


class UserLinks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleTouchTap = (event) => {
    this.setState({
      open: !this.state.open
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  goToProfile = () => {
    this.handleRequestClose()
    this.context.router.push('/profile')
  }

  render() {
    return (
      <div className='userLinks-container'>
        { this.props.auth.user.avatar_name
          ?
            <div className='userLinks-avatar-div' >
              <img ref='avatar' className='userLinks-avatar-img' onTouchTap={this.handleTouchTap} src={this.props.auth.user.avatar_name} alt=""/>
            </div>
          :
            <Face style={{ margin: '0px 10px', height: '30px', width: '30px'}} />
        }
        <div className='userLinks-menu-div'>
          {this.state.open
          ?
          <Paper className='animated slideInRight userLinks-menu'>
            <Menu>
              <MenuItem primaryText="Profile" onTouchTap={this.goToProfile} />
              <MenuItem primaryText="Log out" onTouchTap={() => this.props.logout()} />
            </Menu>
          </Paper>
          : null }
        </div>

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
