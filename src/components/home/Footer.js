import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

class Footer extends Component {
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  goToSignup = () => {
    this.context.router.push('/signup')
  }

  scrollFooter = () => {
    let wScrollTop = document.body.scrollTop
    // console.log('滾到哪里: ', document.body.scrollTop);
    // console.log('整个dom的高度: ', document.body.scrollHeight);
    // console.log('元素的高: ', this.refs.Footer.clientHeight);
    // console.log('browser height: ', window.outerHeight);
    if(this.refs.Footer.clientHeight + window.outerHeight + wScrollTop >= document.body.scrollHeight - window.innerHeight / 2) {
      if(this.state.show === false) {
        // console.log('show');
        this.setState({ show: true })
      } else {
        return
      }
    } else {
      if(this.state.show === true) {
        // console.log('hide');
        this.setState({ show: false })
      }
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.scrollFooter)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.scrollFooter)
  }



  render() {
    const show = this.state.show ? '' : 'hide'
    return (
      <div ref='Footer' className={`Footer-container ${show}`}>

        <div className='Footer-content row'>

          <div className='Footer-col-left col-md-6'>
            <div className='Footer-public row'>

              <div className='Footer-social col-xs-6'>
                <strong> FIND US ON </strong>
                <ul>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Twitter</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Facebook</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram</a></li>
                </ul>
              </div>

              <div className='Footer-shops col-xs-6'>
                <strong> OTHER SHOPS </strong>
                <ul>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Red Robbin</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Emerald Eagle</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Crimson Crane</a></li>
                  <li><a href="#" onClick={(e) => e.preventDefault()}>Auburn Abbot</a></li>
                </ul>
              </div>

            </div>
          </div>



          <div className='Footer-col-right col-md-6'>
            <p className='Footer-p'> <strong> Sign Up for post and chat </strong> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempo. </p>

            <div className='Footer-signup row'>
              <div className='Footer-btn col-xs-6'>
                <RaisedButton onClick={this.goToSignup} primary={true} label="Sign up" />
              </div>
              <div className='Footer-sth col-xs-6'>
              </div>
            </div>

          </div>

        </div>
      </div>
    )
  }
}


export default Footer
