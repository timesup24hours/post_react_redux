import React, { Component } from 'react'
import Post from './Post'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PostForm from './PostForm'
//actions
import { showPostForm } from '../../actions/postFormActions'
import { gotoUserPage } from '../../actions/paginatedPostsActions'
import { loadPost } from '../../actions/postFormActions'
//material-ui
import ChecKCircle from 'material-ui/svg-icons/action/check-circle'
import LinearProgress from 'material-ui/LinearProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import CircularProgress from 'material-ui/CircularProgress';
// import Info from 'material-ui/svg-icons/action/info'
import ReactPaginate from 'react-paginate';

class PostsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0
    }
  }

  componentWillMount() {
    this.props.loadPost();
  }

  componentDidMount() {
    this.countdown = setInterval(() => {
      this.props.loadPost()
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  handlePageClick = offset => {
    this.props.gotoUserPage(offset.selected + 1)
    this.setState({ offset: offset.selected });
  };

  togglePostForm = () => {
    this.props.showPostForm()
  }

  render() {
    const posts = this.props.paginatedPosts.pageList.map( (p, i) => {
      return (
        <Post post={p} key={i}></Post>
      )
    })

    let showForm = this.props.postForm.show ? 'post-form-show' : ''
    let hideButton = this.props.postForm.show ? 'postForm-button-hide' : ''
    let isLoggedIn = this.props.auth.isAuthenticated ? '' : 'postForm-button-hide'
    let showMask = this.props.postForm.show ? 'postForm-mask-show' : ''
    let showSubmttingMask = this.props.postForm.submitting ? 'post-form-submitting-mask-show' : ''
    let showSubmittingProcessBar = this.props.postForm.success ? 'post-form-submitting-process-bar-hide' : 'post-form-submitting-process-bar'
    let showSuccessIcon = this.props.postForm.success ? 'post-form-success-icon-show animated flipInY' : ''
    // let showFailureIcon = this.props.postForm.failure ? 'post-form-failure-icon-show animated flipInY' : ''
    // <div className={`${showFailureIcon} post-form-icon`}><Info style={{ color: 'red', height: '100px', width: '100px'}}/>{this.props.postForm.errMsg}</div>

    if(this.props.appStatus.loading) {
      return <div className='postPage-container'><div className='postPage-progress'><CircularProgress size={60} thickness={4} /></div></div>
    } else {
      return (
        <div className='postPage-container'>
          <div className="postPage-subcontainer">
            {posts}
            <div className={`post-form ${showForm}`}>
              <PostForm/>
            </div>

            <div onClick={this.togglePostForm} className={`postForm-mask ${showMask}`}></div>
            <div onClick={this.togglePostForm} className={`${hideButton} ${isLoggedIn} postPage-add`}>
              <FloatingActionButton backgroundColor="#3f51b5" ><ContentAdd /></FloatingActionButton>
            </div>
          </div>
          {!this.props.appStatus.loading && this.props.posts.length === 0 ? <div style={{ color: 'grey', textAlign: 'center' }}>No post, be the first one to post</div> : null }

          {this.props.posts.length > this.props.paginatedPosts.per ?
          <div className='postPage-pagination'>
             <ReactPaginate previousLabel={"previous"}
                            nextLabel={"next"}
                            breakLabel={<a href="">...</a>}
                            breakClassName={"break-me"}
                            pageNum={this.props.paginatedPosts.total}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            clickCallback={this.handlePageClick}
                            containerClassName={"pagination"}
                            subContainerClassName={"pages pagination"}
                            activeClassName={"active"} />
          </div>
          : null }

        </div>

      )
    }

  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    postForm: state.postForm,
    paginatedPosts: state.paginatedPosts,
    auth: state.auth,
    appStatus: state.appStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showPostForm: bindActionCreators(showPostForm, dispatch),
    gotoUserPage: bindActionCreators(gotoUserPage, dispatch),
    loadPost: bindActionCreators(loadPost, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);
//
// <div className={`post-form-submitting-mask ${showSubmttingMask}`}>
//   <div className={showSubmittingProcessBar}><LinearProgress max={100} mode="indeterminate" />Submitting Post</div>
//   <div className={`${showSuccessIcon} post-form-icon`}><ChecKCircle style={{ color: 'green', height: '100px', width: '100px'}}/></div>
// </div>
