import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostForm from './PostForm'
//actions
import { showPostForm } from '../../actions/postFormActions'
//material-ui
import ChecKCircle from 'material-ui/svg-icons/action/check-circle'
// import Info from 'material-ui/svg-icons/action/info'

class PostsPage extends Component {

  togglePostForm = () => {
    this.props.showPostForm()
  }

  render() {
    const posts = this.props.posts.map( (p, i) => {
      return (
        <Post post={p} key={i}></Post>
      )
    })

    let showForm = this.props.postForm.show ? 'post-form-show' : ''
    let hideButton = this.props.postForm.show ? 'postForm-button-hide' : ''
    let showMask = this.props.postForm.show ? 'postForm-mask-show' : ''
    let showSubmttingMask = this.props.postForm.submitting ? 'post-form-submitting-mask-show' : ''
    let showSubmittingProcessBar = this.props.postForm.success ? 'post-form-submitting-process-bar-hide' : ''
    let showSuccessIcon = this.props.postForm.success ? 'post-form-success-icon-show animated flipInY' : ''
    // let showFailureIcon = this.props.postForm.failure ? 'post-form-failure-icon-show animated flipInY' : ''
    // <div className={`${showFailureIcon} post-form-icon`}><Info style={{ color: 'red', height: '100px', width: '100px'}}/>{this.props.postForm.errMsg}</div>
    return (
      <div className='HomePage-container'>
        {posts.reverse()}
        <div className={`post-form ${showForm}`}>
          <PostForm/>
        </div>
        <div className={`post-form-submitting-mask ${showSubmttingMask}`}>
          <div className={`${showSubmittingProcessBar} mdl-progress mdl-js-progress mdl-progress__indeterminate`}>Submitting Post</div>
          <div className={`${showSuccessIcon} post-form-icon`}><ChecKCircle style={{ color: 'green', height: '100px', width: '100px'}}/></div>
        </div>
        <div onClick={this.togglePostForm} className={`postForm-mask ${showMask}`}></div>
        <button onClick={this.togglePostForm} className={`${hideButton} postPage-add mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--primary`}>
          <i className="material-icons">add</i>
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    postForm: state.postForm
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPostForm: bindActionCreators(showPostForm, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
