import React, { Component } from 'react'

class SectionScope extends Component {

  scrollScope = () => {
    let wScrollTop = document.body.scrollTop
    // window.innerHeight 浏览器的高
    if(wScrollTop > this.refs.sectionScopeContainer.offsetTop + this.refs.sectionScopeContainer.offsetParent.offsetTop - window.innerHeight
      && this.refs.sectionScopeContainer.offsetTop + this.refs.sectionScopeContainer.offsetParent.offsetTop > wScrollTop
    ) {
      let h = wScrollTop - this.refs.sectionScopeContainer.offsetTop + this.refs.sectionScopeContainer.offsetParent.offsetTop
      let opacity = (wScrollTop - this.refs.sectionScopeContainer.offsetTop - this.refs.sectionScopeContainer.offsetParent.offsetTop + window.innerHeight / 2) / (wScrollTop / 9)
      this.refs.sectionScopeContainer.style.backgroundPosition = `center ${h}px`
      this.refs.sectionScopeWindowTint.style.opacity = opacity
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollScope)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollScope)
  }

  render() {
    return (
      <div ref='sectionScopeContainer' className='sectionScope-container'>
        <div ref='sectionScopeWindowTint' className='sectionScope-window-tint'>
          <div className='sectionScope-promo-text'>
            Fall Suits <strong> <span> from </span> $99 </strong>
            <a href="#" onClick={(e) => e.preventDefault()}>Shop Now</a>
          </div>
        </div>
      </div>
    )
  }

}

export default SectionScope
