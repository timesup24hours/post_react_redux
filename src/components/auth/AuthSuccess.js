import React, { Component } from 'react'
import { login } from '../../actions/authActions'
import { connect } from 'react-redux'

class AuthSuccess extends Component {

  componentWillMount() {
    const token = location.pathname.split('/')[3]
    this.props.doLogin(token)
    this.context.router.push('/posts')
  }

  render() {
    return (
      <div>AuthSuccess</div>
    )
  }
}

AuthSuccess.contextTypes = {
  router: React.PropTypes.object
}

const mapDispatchToProps = (dispatch) => ({
  doLogin: (token) => dispatch(login(token))
})

export default connect(null, mapDispatchToProps)(AuthSuccess)
