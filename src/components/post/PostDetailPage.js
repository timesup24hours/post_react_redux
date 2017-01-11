import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostDetail from './PostDetail'

class PostDetailPage extends Component {


  render() {
    let post = {};
    this.props.posts.map( p => {
      if(p._id === this.props.params._id) {
        return post = p
      }
      return false
    })

    return (
      <div>
        <PostDetail post={post} postId={this.props.params._id}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)
