import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import { closeNav } from '../../actions/navActions'

class Mask extends Component {

  closeNav = () => {
    this.props.closeNav();
  }

  render() {
    const isOpen = this.props.nav.isOpen ? 'NavMask-show' : 'NavMask-hide'
    return (
      <div className={`NavMask ${isOpen}`} onClick={this.closeNav}>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav
  }
}

function mapDispactchToProps(dispatch) {
  return {
    closeNav: bindActionCreators(closeNav, dispatch)
  }
}

export default connect(mapStateToProps, mapDispactchToProps)(Mask)
