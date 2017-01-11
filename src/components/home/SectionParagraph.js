import React, { Component } from 'react'

class SectionParagraph extends Component {

  render() {
    return (
      <div className='sectionParagraph-container'>
        <div className='sectionParagraph-div'>
          <h1>{this.props.title}</h1>
          <hr/>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
        </div>
      </div>
    )
  }

}

export default SectionParagraph
