import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//components
import Nav from './nav/Nav'
import LeftNav from './nav/LeftNav'
import NavMask from './nav/NavMask'
import UserDetail from './userDetail/UserDetail'
//actions
import { loadPost } from '../actions/postFormActions'

class App extends Component {

  scroll = () => {
    let NavStyle = ReactDOM.findDOMNode(this.refs.nav).style
    if(document.body.scrollTop > 50) {
      // NavStyle.borderBottom = '1px solid rgba(0, 0, 0, 0)'
      NavStyle.boxShadow = '0px 1px 3px 2px rgba(0, 0, 0, 0.4)'
      NavStyle.transition = 'all 0.3s ease-in-out'
    } else {
      // NavStyle.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'
      NavStyle.boxShadow = '0px 0px 0px 0px rgba(0, 0, 0, 0)'
      NavStyle.transition = 'all 0.3s ease-in-out'
    }
  }

  componentWillMount() {
    console.log('loading data')
    this.props.loadPost()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scroll)
  }

  render() {
    return (
      <div className='App-container'>
        <LeftNav />

        <Nav ref='nav' path={location.pathname} />

        <div className='body-container'>
          {this.props.children}
        </div>
        
        <NavMask />
        {/* user detail */}
        {this.props.userDetail.show
          ? <UserDetail userDetailInfo={this.props.userDetail.userDetailInfo}  />
          : null }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadPost: bindActionCreators(loadPost, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
