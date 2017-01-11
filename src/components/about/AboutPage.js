import React, { Component } from 'react'
import axios from 'axios'

class AboutPage extends Component {

  a = () => {
    axios.get('/p').then( res => {
      console.log(res.data);
    })
  }
  render() {
    return (
      <div>
        <div onClick={this.a}>test</div>
      </div>
    )
  }
}

export default AboutPage
