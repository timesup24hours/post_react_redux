import React, { Component } from 'react'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ContactForm from './ContactForm'

class ContactPage extends Component {
  render() {
    return (
      <div className='contactPage-container'>
        <div className='contactPage-intro'>
          Welcome to our site, we would like to hear from you.
        </div>
        <div>
          <ContactForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage)
