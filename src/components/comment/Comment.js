import React, { Component } from 'react'
//components
import CommentList from './CommentList'
import CommentForm from './CommentForm'
//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import { loadComment } from '../../actions/commentFormActions'
import CircularProgress from 'material-ui/CircularProgress';


class Comment extends Component {

  componentDidMount() {
    this.props.loadComment(this.props.postId)
  }

  render() {
    const comment = this.props.comments.map( c => {
      return <CommentList {...this.props} key={c._id} comment={c} />
    })


    return (
      <div className='comment-container'>
        <div className='comment-title'>comments</div>
        <CommentForm loadComment={this.props.loadComment} postId={this.props.postId}/>
        {this.props.appStatus.loading ? <div className='comment-progress-icon-div'><CircularProgress size={30} thickness={4} /></div> : comment.reverse()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    appStatus: state.appStatus,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadComment: bindActionCreators(loadComment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
