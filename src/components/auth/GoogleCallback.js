import React, { Component } from 'react'

class GoogleCallback extends Component {
  componentDidMount() {
    console.log(location);
  }

  render() {
    return (
      <div>Google Callback</div>
    )
  }
}

export default GoogleCallback
