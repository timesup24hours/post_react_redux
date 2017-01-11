import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//actions
import { showPostForm, addPost, loadMoreOldPost, loadNewPost } from '../../actions/postFormActions'
import { storeTempNewPosts } from '../../actions/tempNewPosts'
import { gotoUserPage } from '../../actions/paginatedPostsActions'
//material-ui
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import CircularProgress from 'material-ui/CircularProgress'
import Chip from 'material-ui/Chip';
//library
import _ from 'lodash'
//components
import Post from './Post'
import PostForm from './PostForm'
import UserDetail from '../userDetail/UserDetail'


class PostsPage extends Component {
  constructor() {
    super();
    this.state = {
      isInfiniteLoading: false,
      noMoreOldPost: false
    }
  }

  fetchOldData = () => {
    var triggerDistance = 50;
    const container = document.getElementById('postPage-container');

    var distance = container.getBoundingClientRect().bottom - window.innerHeight;
    if ( distance < triggerDistance ) {
      this.loadMoreOldPost()
    }
  }

  loadMoreOldPost = () => {
    if(this.props.posts.length !== 0) {
      if(!this.state.isInfiniteLoading) {
        this.setState({ isInfiniteLoading: true })
        this.loadMoreOldPostTimer = setTimeout(() => {
          let oldestDate = this.getOldestPostDate()
          this.props.loadMoreOldPost(oldestDate).then( res => {
            if (this.unmounted) return
            if(res.data.posts.length > 0) {
              this.setState({ isInfiniteLoading: false, noMoreOldPost: false })
              this.props.addPost(res.data.posts)
            } else {
              this.setState({ isInfiniteLoading: false, noMoreOldPost: true })
              if(res.data.err) console.log(res.data.err)
            }
          })
        }, 2000)
      }
    } else {
      return false
    }

  }

  loadNewPost = () => {
    if(this.props.posts.length !== 0) {
      let latestDate = this.getLatestPostDate()
      this.props.loadNewPost(latestDate).then( res => {
        if(res.data.posts) {
          this.props.storeTempNewPosts(res.data.posts)
        } else {
          if(res.data.err) console.log(res.data.err)
        }
      })
    } else {
      return false
    }
  }

  concatTempNewPostsToPostsReducer = () => {
    this.props.addPost(this.props.tempNewPosts.tempPosts)
    this.props.storeTempNewPosts()
  }

  componentDidMount() {
    window.addEventListener('scroll', this.fetchOldData)
    this.loadNewPostCountDown = setInterval(this.loadNewPost, 60000)
  }

  componentWillUnmount() {
    this.unmounted = true
    window.removeEventListener('scroll', this.fetchOldData)
    clearInterval(this.loadNewPostCountDown)
    clearTimeout(this.loadMoreOldPostTimer)
  }


  togglePostForm = () => {
    this.props.showPostForm()
  }

  // latestDate
  getLatestPostDate = () => {
    let dataArray = this.props.posts.map( p => {
      return p.created_at
    })

    let latestDate = _.reduce(dataArray, (pre, cur) => {
      return cur > pre ? cur : pre
    })

    return latestDate
  }

  // oldestDate
  getOldestPostDate = () => {
    let dataArray = this.props.posts.map( p => {
      return p.created_at
    })

    let oldestDate = _.reduce(dataArray, (pre, cur) => {
      return cur < pre ? cur : pre
    })

    return oldestDate
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

    if(this.props.appStatus.loading) {
      return <div className='postPage-container'><div className='postPage-progress'><CircularProgress size={60} thickness={4} /></div></div>
    } else {
      return (
        <div id='postPage-container' className='postPage-container'>

          <div className="postPage-subcontainer">

            {/* new notification */}
            {this.props.tempNewPosts.newPostsLength > 0
              ? <div onClick={this.concatTempNewPostsToPostsReducer} className='postPage-newPost-notification animated fadeIn'>
                  <Chip style={{ margin: '4px' }}>
                    you have {this.props.tempNewPosts.newPostsLength} new post
                  </Chip>
                </div>
              : null }

            {/* posts */}
            {posts.reverse()}

            {/* spinner */}
            {this.state.isInfiniteLoading
              ? <div className="postPage-loading">
                  <CircularProgress size={60} thickness={7} />
                </div>
              : null }

            {/* form */}
            <div className={`post-form ${showForm}`}>
              <PostForm/>
            </div>

            {/* no more message */}
            {this.state.noMoreOldPost & !this.state.isInfiniteLoading
              ? <div className="postPage-loading">
                  No more post
                </div>
              : null }

            {/* no more post message */}
            {!this.props.appStatus.loading && this.props.posts.length === 0 ? <div style={{ color: 'grey', textAlign: 'center' }}>No post, be the first one to post</div> : null }

            {/* mask */}
            <div onClick={this.togglePostForm} className={`postForm-mask ${showMask}`}></div>

            {/* form add button */}
            {this.props.auth.isAuthenticated
              ? <div onClick={this.togglePostForm} className={`${hideButton} postPage-add`}>
                <FloatingActionButton backgroundColor="#3f51b5" ><ContentAdd /></FloatingActionButton>
              </div>
              : null }

            {/* user detail */}
            {this.props.userDetail.show
              ? <UserDetail userDetailInfo={this.props.userDetail.userDetailInfo}  />
              : null }

          </div>


        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    postForm: state.postForm,
    paginatedPosts: state.paginatedPosts,
    tempNewPosts: state.tempNewPosts,
    appStatus: state.appStatus,
    auth: state.auth,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPostForm: bindActionCreators(showPostForm, dispatch),
    addPost: bindActionCreators(addPost, dispatch),
    gotoUserPage: bindActionCreators(gotoUserPage, dispatch),
    loadMoreOldPost: bindActionCreators(loadMoreOldPost, dispatch),
    loadNewPost: bindActionCreators(loadNewPost, dispatch),
    storeTempNewPosts: bindActionCreators(storeTempNewPosts, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
