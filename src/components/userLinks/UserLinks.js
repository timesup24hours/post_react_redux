import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
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
    this.refs.avatar.style.cursor = 'pointer'
    this.setState({
      open: true,
      anchorEl: event.currentTarget
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
              <img ref='avatar' className='userLinks-avatar-img' onTouchTap={this.handleTouchTap} src={`http://localhost:3000${this.props.auth.user.avatar_name}`} alt=""/>
            </div>
          :
            <Face style={{ margin: '0px 10px', height: '30px', width: '30px'}} />
        }
        <Popover
          animated={true}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}
          style={{ marginTop: '16px' }}
        >
          <Menu>
            <MenuItem primaryText="Profile" onTouchTap={this.goToProfile} />
            <MenuItem primaryText="Log out" onTouchTap={() => this.props.logout()} />
          </Menu>
        </Popover>


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
