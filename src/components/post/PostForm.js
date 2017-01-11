import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, reset, SubmissionError } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
//actions
import { showPostForm, sumbitPost, postFormSubmitting, postFormSubmitSuccess, postFormSubmitFailure, postFormSubmitDone, loadPost, addPost } from '../../actions/postFormActions'
//component
import Mask from '../mask/Mask'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'title', 'content' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if(values.title && values.title.length > 30) errors.title = `Title should be less then 30 characters! ${values.title.length}/30`
  if(values.title && values.title.length < 10) errors.title = `Title could not be less than 10 characters! ${values.title.length}/10`
  if(!values.title) errors.title = 'Title is required!'
  if(values.content && values.content.length < 30) errors.content = `Content could not be less than 30 characters! ${values.content.length}/30`
  if(values.content && values.content.length > 4000) errors.content = `Content should be less than 4000 characters! ${values.content.length}/4000`
  if(!values.content) errors.content = 'Content is required!'
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

class PostForm extends Component {


  hideForm = () => {
    this.props.showPostForm()
  }

  submitPost = (values, dispatch) => {
    // this.props.postFormSubmitting()
    return this.props.sumbitPost({
      title: values.title,
      content: values.content,
      postedBy: this.props.auth.user.id
    })
      .then( res => {
        if(res.data.success) {
          // this.props.postFormSubmitSuccess()
          // this.props.showPostForm()
          this.props.addPost({
            _id: res.data.post._id,
            title: res.data.post.title,
            content: res.data.post.content,
            created_at: res.data.post.created_at,
            postedBy: {
              _id: this.props.auth.user.id,
              local: {
                username: this.props.auth.user.username,
                avatar_name: this.props.auth.user.avatar_name,
                nick_name: this.props.auth.user.nick_name
              }
            }
          })
          this.hideForm()
          dispatch(reset('PostForm'))
          // this.props.postFormSubmitDone()
          // this.props.loadPost()
        } else {
          // this.props.postFormSubmitFailure(res.data.err)
          // this.props.postFormSubmitDone()
          throw new SubmissionError(res.data)
        }
      })
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <form onSubmit={handleSubmit(this.submitPost)}>
        <div>
          <Field name="title" component={renderTextField} label="Title" multiLine={true} rowsMax={2} />
        </div>
        <div>
          <Field name="content" component={renderTextField} label="Content" multiLine={true} rowsMax={8} />
        </div>
        <div className='postForm-button-group'>
          <RaisedButton className='postForm-cancel' type="button" onClick={this.hideForm} label="Cancel" disabled={submitting} />
          <RaisedButton className='postForm-submit' type="submit" label="Submit" primary={true} disabled={pristine || submitting} />
        </div>
        <Mask show={submitting} showCircle={true} />
      </form>
    )
  }
}

PostForm = reduxForm({
  form: 'PostForm',
  validate
})(PostForm)

function mapStateToProps(state) {
  return {
    posts: state.posts,
    postForm: state.postForm,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPostForm: bindActionCreators(showPostForm, dispatch),
    sumbitPost: bindActionCreators(sumbitPost, dispatch),
    postFormSubmitting: bindActionCreators(postFormSubmitting, dispatch),
    postFormSubmitSuccess: bindActionCreators(postFormSubmitSuccess, dispatch),
    postFormSubmitFailure: bindActionCreators(postFormSubmitFailure, dispatch),
    postFormSubmitDone: bindActionCreators(postFormSubmitDone, dispatch),
    loadPost: bindActionCreators(loadPost, dispatch),
    addPost: bindActionCreators(addPost, dispatch)
  }
}

PostForm = connect(mapStateToProps, mapDispatchToProps)(PostForm);

export default PostForm
