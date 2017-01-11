import React, { Component } from 'react'
import _ from 'lodash'

class SectionModel extends Component {
  constructor() {
    super()
    this.state = {
      stop: false
    }
  }

  scrollModel = () => {
    let wScrollTop = document.body.scrollTop

    // console.log(document.getElementsByClassName('sectionModel-container')); 可以看到el的状态
    // const height = this.refs.sectionModelContainer.offsetParent.offsetTop + this.refs.sectionModelContainer.offsetTop // get the parent height and the current height from the parent
    // const height = this.refs.sectionModelContainer.getBoundingClientRect().height // get the height of the el from the browser top, it will change when refresh depends on the top position

    if(wScrollTop > this.refs.sectionModelContainer.offsetTop + this.refs.sectionModelContainer.offsetParent.offsetTop / 2) {
      if(this.state.stop) {
        return window.removeEventListener('scroll', this.scrollModel)
      }
      _.map(document.getElementsByClassName('sectionModel-figure'), (el, i) => {
        this.setState({ stop: true })
        setTimeout( () => {
          // eslint-disable-next-line
          el.className = el.className + ' is-showing'
        // }, 150 * (i + 1) ) // DevTips version
        }, 700 * (Math.exp(i * 0.14)) - 700) // pull request version
      })
    }

  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollModel)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollModel)
  }

  render() {



    return (
      <div ref='sectionModelContainer' className='sectionModel-container'>
        <div className='container-fluid'>
          <div className='row sectionModel-row'>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model1.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model2.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model3.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
          </div>
          <div className='row sectionModel-row'>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model3.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model2.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure><figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model1.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
          </div>
          <div className='row sectionModel-row'>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model2.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
            <figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model3.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure><figure ref='sectionModelFigure' className='col-md-4 sectionModel-figure'>
              <div>
                <img src='images/SectionOne/model1.jpg' alt=""/>
                <figcaption> BlackBird Sweater - <strong>$135</strong> </figcaption>
              </div>
            </figure>
          </div>
        </div>
      </div>
    )
  }

}

export default SectionModel
// const models = data.map( (m, i) => {
//   return (
//     <div className='row sectionModel-row'>
//       <figure className='col-md-4 sectionModel-figure'>
//         <img src={m.img} alt=""/>
//         <figcaption> {m.name} - <strong>${m.price}</strong> </figcaption>
//       </figure>
//     </div>
//   )
// })
// const data = [
//   {
//     img: 'http://localhost:3000/images/SectionOne/model1.jpg',
//     name: 'BlackBird Sweater',
//     price: '$135'
//   },
//   {
//     img: 'http://localhost:3000/images/SectionOne/model1.jpg',
//     name: 'BlackBird Sweater',
//     price: '$135'
//   },
//   {
//     img: 'http://localhost:3000/images/SectionOne/model1.jpg',
//     name: 'BlackBird Sweater',
//     price: '$135'
//   }
// ]
