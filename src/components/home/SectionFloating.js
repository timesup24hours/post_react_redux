import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

class SectionFloating extends Component {
  constructor() {
    super()
    this.state = {
      floatingStop: false
    }
  }

  scrollFloating = () => {
    let wScrollTop = document.body.scrollTop
    // window.innerHeight 浏览器的高
    if(wScrollTop > this.refs.SectionFloatingContainer.offsetTop + this.refs.SectionFloatingContainer.offsetParent.offsetTop - window.innerHeight) {
      if(window.innerWidth < 992) {
        this.refs.SectionFloatingPostOne.style.transform = 'translate(0px, 0px)'
        this.refs.SectionFloatingPostThree.style.transform = 'translate(0px, 0px)'
        this.setState({ floatingStop: true })
        return
      } else {
        let offset = Math.min(0, wScrollTop - (this.refs.SectionFloatingContainer.offsetTop + this.refs.SectionFloatingContainer.offsetParent.offsetTop) + window.innerHeight / 4)
        this.refs.SectionFloatingPostOne.style.transform = 'translate(' + offset + 'px, ' + Math.abs(offset * 0.2) + 'px)'
        this.refs.SectionFloatingPostThree.style.transform = 'translate(' + Math.abs(offset) + 'px, ' + Math.abs(offset * 0.2) + 'px)'
      }
    }

  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFloating)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFloating)
  }


  render () {
    return (
      <div ref='SectionFloatingContainer' className='SectionFloating-container'>

        <div className='SectionFloating-row row'>

          <div className='SectionFloating-post-col col-md-4'>
            <div ref='SectionFloatingPostOne' className='SectionFloating-post SectionFloating-post-one'>
              <h5>Post Title</h5>
              <img src='images/SectionOne/posts/one.jpg' alt=""/>
              <p> ccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
              <RaisedButton label="Read more" />
            </div>
          </div>

          <div className='SectionFloating-post-col col-md-4'>
            <div className='SectionFloating-post SectionFloating-post-two'>
              <h5>Post Title</h5>
              <img src='images/SectionOne/posts/two.jpg' alt=""/>
              <p> ccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
              <RaisedButton label="Read more" />
            </div>
          </div>

          <div className='SectionFloating-post-col col-md-4'>
            <div ref='SectionFloatingPostThree' className='SectionFloating-post SectionFloating-post-three'>
              <h5>Post Title</h5>
              <img src='images/SectionOne/posts/three.jpg' alt=""/>
              <p> ccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
              <RaisedButton label="Read more" />
            </div>
          </div>

        </div>

      </div>
    )
  }
}

export default SectionFloating
