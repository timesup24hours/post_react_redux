import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, SubmissionError } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
// declare the form selector
import UpCaseFirstLetter from '../../utils/UpCaseFirstLetter'
import _ from 'lodash'
//actions
import { changeInfo, changeInfoField } from '../../actions/profileActions'
import setAuthorizationToken from '../../utils/setAuthorizationToken';


// import CheckCircle from 'material-ui/svg-icons/action/check-circle'


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

class UpdateField extends Component {
  constructor() {
    super()
    this.state = {
      formHide: true
    }
    this.submitChangeField = this.submitChangeField.bind(this)
  }

  componentWillMount() {
    this.props.change([this.props.fieldName], this.props.auth.user[this.props.fieldName])
    // this.props.initialize({
    //   [this.props.fieldName]: this.props.auth.user[this.props.fieldName]
    // })
  }

  submitChangeField(values) {
      console.log('asdf');
    // return new Promise( (resolve, reject) => {
      return this.props.changeInfo({ [this.props.fieldName] : values[this.props.fieldName], _id: this.props.auth.user.id }).then( res => {
        if(res.data.success) {
          this.props.changeInfoField({ fieldName: this.props.fieldName, value: res.data[this.props.fieldName] })
          setAuthorizationToken(res.data.token)
          localStorage.setItem('token', res.data.token)
          console.log(res.data);
          this.setState({ formHide: true })
          // resolve()
        } else {
          throw new SubmissionError(res.data.err)
          // reject(res.data.err)
        }
      })
    // })
  }

  fieldFocus = () => {
    this.setState({ formHide: false })
  }

  fieldCancel = () => {
    this.setState({ formHide: true })
    this.props.change([this.props.fieldName], this.props.auth.user[this.props.fieldName] )
  }

  fieldOnBlur = () => {
    if(this.props.pristine) {
      this.setState({ formHide: true })
    }
  }


  render() {
    const { handleSubmit, pristine, submitting } = this.props

    return (
      <form className='updateField-container' onSubmit={handleSubmit(this.submitChangeField)}>
        <div className='updateField-textField'>
          <Field name={this.props.fieldName}
                component={renderTextField}
                label={UpCaseFirstLetter(this.props.fieldName)}
                onFocus={this.fieldFocus}
                onBlur={this.fieldOnBlur} />

        </div>

        <div className={this.state.formHide ? 'updateField-button-group updateField-button-group-hide' : 'updateField-button-group'} >
          <RaisedButton className='updateField-cancel' label="Cancel" onClick={this.fieldCancel} disabled={submitting} />
          <RaisedButton className='updateField-update' type="submit" label="Update" primary={true} disabled={pristine || submitting} />
        </div>

      </form>
    )
  }

}

UpdateField = reduxForm({
  form: 'UpdateField',
  validate
})(UpdateField)


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeInfo: bindActionCreators(changeInfo, dispatch),
    changeInfoField: bindActionCreators(changeInfoField, dispatch)
  }
}

UpdateField = connect(mapStateToProps, mapDispatchToProps)(UpdateField);


export default UpdateField
