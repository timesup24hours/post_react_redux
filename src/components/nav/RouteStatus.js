import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import StatusLinks from './StatusLinks'
//action
import { setRouteStatus } from '../../actions/routeActions'


class RouteStatus extends Component {
  constructor() {
    super()
    this.state = {
      show: true
    }
  }

  scroll = () => {
    if(document.body.scrollTop > 300) {
      if(document.body.clientWidth > 700) {
        this.setState({ move: true })
        this.refs.wrapper.style.marginTop = '56px';
      }
    } else {
      if(document.body.clientWidth > 700) {
        this.setState({ move : false })
        this.refs.wrapper.style.marginTop = '0px';
      }

    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll);
    this.refs.wrapper.style.marginLeft =  '-' + ReactDom.findDOMNode(this.refs.wrapper).offsetWidth / 1.1 + 'px'
  }

  componentWillMount() {
    if(this.props.path === '/chat') {
      this.setState({ show: false })
    } else {
      this.setState({ show: true })
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.path === '/chat') {
      this.setState({ show: false })
    } else {
      this.setState({ show: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll');

  }

  setRouteStatus = () => {
    this.props.setRouteStatus(this.props.path)
  }

  activeRouteStatus = () => {
    this.setState({ active: !this.state.active })
  }

  handleClear = () => {
    this.refs.wrapper.style.opacity = '1'
    this.refs.wrapper.style.marginLeft =  '0px'

  }

  handleFuzzy = () => {
    this.refs.wrapper.style.opacity = '1'
    this.refs.wrapper.style.marginLeft =  '-' + ReactDom.findDOMNode(this.refs.wrapper).offsetWidth / 1.1 + 'px'
  }


  render() {
    let path = '';
    let arrow = '';
    let pathArray = this.props.path.split('/');
    let Links = this.props.path === '/' ?
    <Link onClick={this.setRouteStatus} className='routeStatus-home-link' to='/'>Home</Link> :
    pathArray.map( (l, i) => {
      arrow = ''
      if(l === '') l = 'home'
      if(l !== 'home') path += '/' + l
      if(pathArray[pathArray.length - 1] !== l) arrow = '-'
      return <StatusLinks key={i} path={path} pathName={l} arrow={arrow} />
    })


    const show = this.state.show ? '' : 'routeStatus-hide'

    return (
      <div ref='wrapper' id='wrapper' className={`routeStatus-wrapper ${show}`}
            onMouseOver={this.handleClear}
            onMouseOut={this.handleFuzzy}
            >

        <div className={`animated bounceInLeft routeStatus-container`}>
          {Links}
        </div>

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
    setRouteStatus: bindActionCreators(setRouteStatus, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(RouteStatus)

// static contextTypes = {                //
//   router: PropTypes.object.isRequired  //
// }                                      // in order to use this.context.router
