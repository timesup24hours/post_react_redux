import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, reset, SubmissionError } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//actions
import { sendContactEmail } from '../../actions/contactActions'
//component
import Mask from '../mask/Mask'
import Notification from '../notification/Notification'


const validate = values => {
  const errors = {}
  const requiredFields = []//[ 'title', 'content', 'email' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if(values.title && values.title.length > 60) {
    errors.title = `Content should be less then 60 characters!  60/${values.title.length}`
  }
  if(values.title && values.title.length < 10) {
    errors.title = `Title could not be less then 10 characters!  10/${values.title.length}`
  }
  if(values.content && values.content.length > 1000) {
    errors.content = `Content should be less then 1000 characters!  1000/${values.content.length}`
  }
  if(values.content && values.content.length < 40) {
    errors.content = `Content could not be less then 40 characters!  40/${values.content.length}`
  }
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    fullWidth={true}
    {...input}
    {...custom}
  />
)

class ContactForm extends Component {
  constructor() {
    super()
    this.state = {
      content: '',
      notifiShow: false,
      submitting: false
    }
  }

  handleHide = () => {
    this.setState({ notifiShow: false })
    return this.state.notifiShow
  }

  componentWillMount() {
    this.props.initialize({
      email: this.props.auth.user.email ? this.props.auth.user.email : null
    })
  }

  componentWillUpdate(nextProps) {
    if(!nextProps.auth.isAuthenticated) {
      this.props.change('email', null)
    }
  }

  componentWillUnmount() {
    this.props.change('email', null)
  }

  submitContact = (values, dispatch) => {
    return this.props.sendContactEmail(values).then( res => {
      if(res.data.success) {
        this.setState({ content: res.data.success, notifiShow: true })
        dispatch(reset('ContactForm'))
      } else if(res.data.errors) {
        throw new SubmissionError(res.data.errors)

      } else if(res.data.err) {
        this.setState({ content: res.data.err, notifiShow: true })
        console.log(res.data.err);
      }
    })
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form className='contactForm-container' onSubmit={handleSubmit(this.submitContact)}>
        <div>
          <Field name="title" component={renderTextField} label="Title" multiLine={true} rowsMax={2} />
        </div>
        <div>
          <Field name="content" component={renderTextField} label="Content" multiLine={true} rowsMax={20} />
        </div>
        <div className={this.props.auth.isAuthenticated ? 'contactForm-email-div-hide' : ''}>
          <Field name="email" component={renderTextField} label="Your email" multiLine={true} rowsMax={2} />
        </div>
        <div className='contactForm-button-group'>
          <RaisedButton className='contactForm-submit' type="submit" label="Submit" primary={true} disabled={pristine || submitting} />
        </div>
        <Mask show={submitting} showCircle={submitting}/>
        {this.state.notifiShow
          ? <div className='contactForm-notifi-container'>
              <div className='contactForm-notifi-div'>
                <Notification show={this.state.notifiShow} handleHide={this.handleHide} content={this.state.content} cancellable={true} />
              </div>
            </div>
          : null }

      </form>
    )
  }
}

ContactForm = reduxForm({
  form: 'ContactForm',
  validate
})(ContactForm)

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    sendContactEmail: bindActionCreators(sendContactEmail, dispatch)
  }
}

ContactForm = connect(mapStateToProps, mapDispatchToProps)(ContactForm);

export default ContactForm
