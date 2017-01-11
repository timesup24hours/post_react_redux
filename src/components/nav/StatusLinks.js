import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//action
import { setRouteStatus } from '../../actions/routeActions'
import { navDeactiveClass } from '../../actions/navActions'
//utils
import stringToWords from '../../utils/stringToWords'

class StatusLinks extends Component {
  handleSetRouteStatus = () => {
    this.props.setRouteStatus(this.props.path === '' ? '/' : this.props.path)
    this.props.navDeactiveClass()
  }

  render() {
    const { path, pathName, arrow } = this.props
    //convert path to words with first capital character
    let newWord = stringToWords(pathName)

    return (
      <div className='status-links-inline-block'>
        <Link onClick={this.handleSetRouteStatus} to={path === '' ? '/' : path}>{newWord}</Link>
        <div className='status-links-inline-block'> {arrow} </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routeStatus: state.routeStatus
  }
}

function mapDispactchToProps(dispatch) {
  return {
    setRouteStatus: bindActionCreators(setRouteStatus, dispatch),
    navDeactiveClass: bindActionCreators(navDeactiveClass, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(StatusLinks)
