import React, { Component } from 'react'

class SectionBird extends Component {
  constructor() {
    super()
    this.state = {
      top: 0,
      topBackBird: 0,
      topForeBird: 0,
    }
  }

  scrollBird = () => {
    let wScrollTop = document.body.scrollTop
    // console.log(this.refs.SectionOneContainer.offsetTop) // offsetTop distance from parent
    // console.log(document.getElementsByClassName('SectionOne-container')) // check the status of the element
    if(wScrollTop >= this.refs.SectionOneContainer.offsetParent.offsetTop && wScrollTop < this.refs.SectionOneContainer.offsetParent.offsetTop + this.refs.SectionOneContainer.offsetParent.offsetTop) {
      this.refs.SectionOneLogo.style.transform = 'translate(0px, ' + (wScrollTop - this.state.top) / 2 + '%)'
      this.refs.SectionOneBackBird.style.transform = 'translate(0px, ' + (wScrollTop - this.state.topBackBird) / 4 + '%)'
      this.refs.SectionOneForeBird.style.transform = 'translate(0px, -' + (wScrollTop - this.state.topForeBird) / 30 + '%)'
    }
  }


  componentDidMount() {
    this.setState({
      top: this.refs.SectionOneContainer.offsetParent.offsetTop + this.refs.SectionOneContainer.offsetTop,
      topBackBird: this.refs.SectionOneContainer.offsetParent.offsetTop + this.refs.SectionOneContainer.offsetTop,
      topForeBird: this.refs.SectionOneContainer.offsetParent.offsetTop + this.refs.SectionOneForeBird.offsetTop,

    })
    window.addEventListener('scroll', this.scrollBird)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollBird)
  }

  render() {
    return (
      <div ref='SectionOneContainer' className='SectionOne-container'>
        <div ref='SectionOneBackBird' className="SectionOne-back-bird"></div>
        <div ref='SectionOneLogo' className='animated SectionOne-logo'></div>
        <div ref='SectionOneForeBird' className="SectionOne-fore-bird"></div>
      </div>
    )
  }

}

export default SectionBird
