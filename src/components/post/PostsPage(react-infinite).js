import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostForm from './PostForm'
//actions
import { showPostForm, addPost } from '../../actions/postFormActions'
//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
//library
import InfiniteScroll from 'react-infinite'
import axios from 'axios'
import _ from 'lodash'

class PostsPage extends Component {
  constructor() {
    super()
    this.state = {
      isInfiniteLoading: false
    }
  }

  togglePostForm = () => {
    this.props.showPostForm()
  }

  loadMorePost = () => {
    if(!this.state.isInfiniteLoading) {
      this.setState({
        isInfiniteLoading: true
      })
      setTimeout(() => {
        // get the latest date
        let latestDate = this.getLatestPostDate()
        axios.get('/post/loadMorePost/' + latestDate).then( res => {
          if(res.data.posts.length >= 0) {
            this.setState({ isInfiniteLoading: false })
            console.log('res.data.posts: ', res.data.posts)
            this.props.addPost(res.data.posts)
          } else {
            this.setState({ isInfiniteLoading: false })
            console.log('no more post: ',res.data.err)
          }
        })
      }, 2000)
    }

  }

  getLatestPostDate = () => {
    let dataArray = this.props.posts.map( p => {
      return p.created_at
    })

    let latestDate = _.reduce(dataArray, (pre, cur) => {
      return cur > pre ? cur : pre
    })

    console.log('latestDate: ', latestDate);
    return latestDate
  }

  elementInfiniteLoad = () => {
    return (<div className="infinite-list-item">
        Loading...
    </div>)
  }

  render() {

    let showForm = this.props.postForm.show ? 'post-form-show' : ''
    let hideButton = this.props.postForm.show ? 'postForm-button-hide' : ''
    let showMask = this.props.postForm.show ? 'postForm-mask-show' : ''

    const posts = this.props.posts.map( p => {
        return (
          <Post post={p} key={p._id} />
        )
      })




    return (
      <div id='postPage-container' className='postPage-container'>

        <div className="postPage-subcontainer">

          <Infinite elementHeight={40}
             containerHeight={250}
             infiniteLoadBeginEdgeOffset={200}
             onInfiniteLoad={this.loadMorePost}
             loadingSpinnerDelegate={this.elementInfiniteLoad()}
             isInfiniteLoading={this.state.isInfiniteLoading}
             >
              {posts}
          </Infinite>

          <div className={`post-form ${showForm}`}>
            <PostForm/>
          </div>

          <div onClick={this.togglePostForm} className={`postForm-mask ${showMask}`}></div>

          <div onClick={this.togglePostForm} className={`${hideButton} postPage-add`}>
            <FloatingActionButton backgroundColor="#3f51b5" ><ContentAdd /></FloatingActionButton>
          </div>

        </div>


      </div>
    )
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
    showPostForm: bindActionCreators(showPostForm, dispatch),
    addPost: bindActionCreators(addPost, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
