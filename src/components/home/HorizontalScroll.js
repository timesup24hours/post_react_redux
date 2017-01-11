import React, { Component } from 'react'
import Post from '../post/Post'
import ReactDOM from 'react-dom'
//material-ui
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left'
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right'

class HorizontalScroll extends Component {

  preClick = () => {
    this.refs.rightBtn.style.display = ''
    let o = this.refs.horznScroll.scrollLeft
    clearInterval(this.countdown);
    this.countdown = setInterval(() => {
      this.refs.horznScroll.scrollLeft -= 4
      if(this.refs.horznScroll.scrollLeft < o - 300) {
        clearInterval(this.countdown);
      }
      if(this.refs.horznScroll.scrollLeft < 1) {
        ReactDOM.findDOMNode(this.refs.horznScroll).style.paddingLeft = '50px'
        setTimeout( () => {
          this.refs.horznScroll.style.paddingLeft = '0px'
          clearInterval(this.countdown);
        }, 300)
      }
      // hide the buttom when reach the beggining
      // if(this.refs.horznScroll.scrollLeft === 0) {
      //   this.refs.leftBtn.style.display = 'none'
      // }
    }, 1);
  }

  nextClick = () => {
    this.refs.leftBtn.style.display = ''
    let o = this.refs.horznScroll.scrollLeft
    clearInterval(this.countdown);
    this.countdown = setInterval(() => {
      this.refs.horznScroll.scrollLeft += 4
      if(this.refs.horznScroll.scrollLeft > o + 300 || this.refs.horznScroll.scrollLeft  >= this.refs.horznScroll.scrollWidth - this.refs.horznScroll.offsetWidth - 1) {
        ReactDOM.findDOMNode(this.refs.horznScroll).style.paddingRight = '50px'
        setTimeout( () => {
          this.refs.horznScroll.style.paddingRight = '0px'
          clearInterval(this.countdown);
        }, 300)

      }
      // hide the buttom when reach the end
      // if(this.refs.horznScroll.scrollLeft === this.refs.horznScroll.scrollWidth - this.refs.horznScroll.offsetWidth) {
      //   this.refs.rightBtn.style.display = 'none'
      // }
    }, 1);
  }

  displayBtn = () => {
    if(this.refs.horznScroll.scrollLeft === 0) {
      this.refs.leftBtn.style.display = 'none'
    } else {
      this.refs.leftBtn.style.display = ''
    }

    if(this.refs.horznScroll.scrollLeft === this.refs.horznScroll.scrollWidth - this.refs.horznScroll.offsetWidth) {
      this.refs.rightBtn.style.display = 'none'
    } else {
      this.refs.rightBtn.style.display = ''
    }
  }

  componentDidMount() {
    // hide the buttom when mounted
    // this.refs.leftBtn.style.display = 'none'
    // hide the buttom when reach the beggining or the ending event
    // this.refs.horznScroll.addEventListener('scroll', this.displayBtn);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
    // remove the EventListener of hide button when scroll
    // this.refs.horznScroll.removeEventListener('scroll', this.displayBtn);
  }

  render() {
    const posts = this.props.posts.map( (p, i) => {
      return (
        <div className='post-holder' key={i} style={{ display: 'inline-block' }}><Post post={p}/></div>
      )
    })

    return (
      <div ref='horznScrollContainer' className='HorizontalScroll-container'>
        <div id='horznScroll' ref='horznScroll' className='HorizontalScroll-sub-container'>
          {posts.reverse()}
        </div>
        <div ref='leftBtn' onClick={this.preClick} className='HorizontalScroll-pre-btn'><KeyboardArrowLeft hoverColor='black' style={{ width: '50px', height: '50px', color: 'grey' }}/></div>
        <div ref='rightBtn' onClick={this.nextClick} className='HorizontalScroll-next-btn'><KeyboardArrowRight hoverColor='black' style={{ width: '50px', height: '50px', color: 'grey' }}/></div>
      </div>
    )
  }

}

export default HorizontalScroll
