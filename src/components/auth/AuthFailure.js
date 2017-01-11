import React, { Component } from 'react'
import { connect } from 'react-redux'

class AuthFailure extends Component {

  componentWillMount() {
    // const token = location.pathname.split('/')[3]
    // this.props.doLogin(token)
    // this.context.router.push('/posts')
  }

  render() {
    return (
      <div>The email in your facebook account is already register!</div>
    )
  }
}

AuthFailure.contextTypes = {
  router: React.PropTypes.object
}

// const mapDispatchToProps = (dispatch) => ({
//   doLogin: (token) => dispatch(login(token))
// })

export default connect(null, null)(AuthFailure)
