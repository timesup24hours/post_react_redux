import React, { Component } from 'react'

class FacebookCallback extends Component {
  componentDidMount() {
    console.log(location.search.split('=')[1]);
  }

  render() {
    return (
      <div>Facebook Callback</div>
    )
  }
}

export default FacebookCallback
