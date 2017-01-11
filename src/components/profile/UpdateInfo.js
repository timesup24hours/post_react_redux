import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
//actions
import { updateInfo } from '../../actions/profileActions'
import { setUser } from '../../actions/authActions'
import Notification from '../notification/Notification'


const validate = values => {
  const errors = {}
  const requiredFields = [ 'username' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })

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

class UpdateInfo extends Component {
  constructor() {
    super()
    this.state = {
      show: false,
      content: ''
    }
  }

  componentWillMount() {
    this.props.initialize({
      username: this.props.auth.user.username,
      nick_name: this.props.auth.user.nick_name
    })
  }

  submitUpdateInfo = (values) => {
    return this.props.updateInfo(values).then( res => {
      if(res.data.success) {
        this.setState({ content: res.data.success, show: true })
        this.props.setUser(res.data.token)
      } else {
        throw new SubmissionError(res.data.err)
      }
    })
  }

  handleHide = () => {
    this.setState({ show: !this.state.show })
    return this.state.show
  }

  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <div className='updateInfo-container'>
        <form className='updateInfo-form' onSubmit={handleSubmit(this.submitUpdateInfo)}>
          <div className='updateInfo-field'>
            <Field name='username' component={renderTextField} label='Username'/>
            <Field name='nick_name' component={renderTextField} label='Nick Name'/>
          </div>

          <div className='updateInfo-button-group' >
            <RaisedButton className='updateInfo-update-btn' type="submit" label="Update" primary={true} disabled={submitting} />
          </div>
          <Notification cancellable={true} handleHide={this.handleHide} show={this.state.show} content={this.state.content} />
        </form>
      </div>
    )
  }

}

UpdateInfo = reduxForm({
  form: 'UpdateInfo',
  validate
})(UpdateInfo)


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateInfo: bindActionCreators(updateInfo, dispatch),
    setUser: bindActionCreators(setUser, dispatch)
  }
}

UpdateInfo = connect(mapStateToProps, mapDispatchToProps)(UpdateInfo);


export default UpdateInfo
