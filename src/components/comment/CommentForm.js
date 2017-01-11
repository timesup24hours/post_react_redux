import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//redux form
import { Field, reduxForm, reset } from 'redux-form'
//material ui
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';
//actions
import { submitComment, addComment } from '../../actions/commentFormActions'
import { showNotification, hideNotification, setContent } from '../../actions/notificationActions'
import { loadPost } from '../../actions/postFormActions'
//components

const validate = values => {
  const errors = {}
  const requiredFields = [ 'content', 'postedBy' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    fullWidth={true}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class CommentForm extends Component {
  constructor() {
    super()
    this.state = {
      hideFooter: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.props.loadComment(this.props.postId)
    this.props.initialize({
      postedBy: this.props.auth.user.id
    })
  }

  componentDidMount() {
    this.countdown = setInterval(() => {
      this.props.loadComment(this.props.postId)
    }, 60000)
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  hideFooter = () => {
    this.setState({ hideFooter: true })
    this.props.dispatch(reset('CommentForm'))
  }
  showFooter = () => {
    this.setState({ hideFooter: false })
  }

  submitPost = (values, dispatch) => {
    return new Promise((resovle, reject) => {
      return this.props.submitComment({
        postId: this.props.postId,
        content: values.content,
        postedBy: values.postedBy
      }).then( res => {
        if(res.data.success) {
          this.hideFooter()
          this.props.addComment({
            ...res.data.comment,
            postedBy: {
              _id: this.props.auth.user.id,
              local: {
                avatar_name: this.props.auth.user.avatar_name,
                nick_name: this.props.auth.user.nick_name,
                username: this.props.auth.user.username
              }
            }
           })
          resovle()
        } else {
          this.props.setContent(res.data.err)
          this.props.showNotification();
          this.props.loadPost()
          setTimeout( () => {
            this.context.router.push('/posts')
            this.props.hideNotification()
          }, 4000 )
          // reject(res.data.err)
        }
      })
    })
  }

  goToSignin = () => {
    this.context.router.push('/login')
  }

  render() {
    let hideFooter = this.state.hideFooter ? 'commentForm-footer-hide' : ''
    const { handleSubmit, pristine, submitting } = this.props
    if(!this.props.auth.isAuthenticated) {
      return (
        <dvi><RaisedButton onTouchTap={this.goToSignin} label="Sign in" primary={true}/></dvi>
      )
    } else {
      return (
        <div className='commentForm-container'>
          <div className={submitting ? 'commentForm-mask' : 'commentForm-mask commentForm-mask-hide'}><div className="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div></div>
          <form onSubmit={handleSubmit(this.submitPost)}>
            <div className='commentForm-body'>
              <Field onFocus={this.showFooter} name="content" component={renderTextField} label="Add a public comment..." multiLine={true}/>
            </div>
            <div className={`commentForm-footer ${hideFooter}`}>
              <div className='commentForm-postedBy' style={{ display: 'none' }} >
                <Field name="postedBy" component={renderTextField} label="User Name"/>
              </div>
              <div className='commentForm-button-group'>
                <RaisedButton className='commentForm-cancel' type="button" onClick={this.hideFooter} label="Cancel" disabled={submitting} />
                <RaisedButton className='commentForm-submit' type="submit" label="Submit" primary={true} disabled={pristine || submitting} />
              </div>
            </div>
          </form>
        </div>
      )
    }
  }
}

CommentForm = reduxForm({
  form: 'CommentForm',
  validate
})(CommentForm)

function mapStateToProps(state) {
  return {
    auth: state.auth,
    notification: state.notification
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitComment: bindActionCreators(submitComment, dispatch),
    showNotification: bindActionCreators(showNotification, dispatch),
    hideNotification: bindActionCreators(hideNotification, dispatch),
    setContent: bindActionCreators(setContent, dispatch),
    loadPost: bindActionCreators(loadPost, dispatch),
    addComment: bindActionCreators(addComment, dispatch)
  }
}

CommentForm = connect(mapStateToProps, mapDispatchToProps)(CommentForm);

export default CommentForm
