import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import Loading from '../../utils/Loading'
import DeleteForever from 'material-ui/svg-icons/action/delete-forever'
import Face from 'material-ui/svg-icons/action/face'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
//Components
import Notification from '../notification/Notification'
import Mask from '../mask/Mask'
import UserDetail from '../userDetail/UserDetail'
import Comment from '../comment/Comment'
//actions
import { showNotification, hideNotification, setContent } from '../../actions/notificationActions'
import { loadPost, deletePost } from '../../actions/postFormActions'
import { showUserDetail } from '../../actions/userDetailActions'
// MDL
import MDLite from 'material-design-lite/dist/material.js'
const componentHandler = MDLite.componentHandler;

class PostDetail extends Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      open: false
    }
  }

  componentDidUpdate() {
    componentHandler.upgradeDom();
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    componentHandler.upgradeDom();
    setTimeout( () => {
      this.setState({ loading: this.props.appStatus.loading })
    }, 1000)
  }

  componentWillUnmount() {
    if(this.redirect) clearTimeout(this.redirect)
  }

  handleDelete = () => {
    this.props.deletePost(this.props.postId).then( res => {
      if(res.data.success) {
        this.props.setContent(res.data.success)
        this.props.showNotification()
        this.props.loadPost()
        this.redirect = setTimeout( () => {
          this.context.router.push('/posts')
          this.props.hideNotification()
        }, 4000 )
      } else {
        this.props.setContent(res.data.err)
        this.props.showNotification()
        this.redirect = setTimeout( () => {
          this.context.router.push('/posts')
          this.props.hideNotification()
        }, 4000 )
      }
    })
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({open: true})
  };

  handleClose = () => {
    this.setState({open: false})
  };

  showUserDetail = () => {
    this.props.showUserDetail({
      avatar_name: this.props.post.postedBy.local.avatar_name,
      nick_name: this.props.post.postedBy.local.nick_name,
      username: this.props.post.postedBy.local.username
    })
  }


  render() {
    const { _id, postedBy, created_at, title, content } = this.props.post
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Comfirm"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDelete}
      />,
    ];

    if(this.props.post._id === undefined) {
      return (
        <div className='post-detail-container'>
          <Mask show={this.props.notification.show} showCircle={false} >
            <div className='post-detail-notifi-container'>
              <Notification cancellable={false} handleHide={this.props.hideNotification} show={this.props.notification.show} content={this.props.notification.content} />
            </div>
          </Mask>
        </div>
      )
    } else {
      if(this.state.loading) {
        return (
          <Loading />
        )
      } else {
        return (
          <div className='post-detail-container'>
            <div className='post-detail-card'>

              <div className='post-detail-header'>

                <div className='post-detail-title'>
                  {title}
                </div>

                {this.props.auth.user.id === postedBy._id
                  ? <div id='postDelete' onTouchTap={this.handleOpen} className='post-detail-delete'><DeleteForever /></div>
                  : null }
                <div className="mdl-tooltip" data-mdl-for="postDelete">
                  Delete
                </div>
              </div>

              {/* User Detail */}
              {this.props.userDetail.show
                ? <UserDetail userDetailInfo={this.props.userDetail.userDetailInfo} />
                : null}

              <div className='post-detail-body'>

                <div className='post-detail-content'>{content}</div>

                <div className='post-detail-user'>
                  {postedBy.local.avatar_name ? <div className='post-detail-avatar' onClick={this.showUserDetail}>
                  <img src={`${postedBy.local.avatar_name}`} alt=""/>
                  </div> : <Face onClick={this.showUserDetail} style={{ height: '30px', width: '30px'}} />}
                  <div className='post-detail-info'>
                    <div className='post-detail-poster'>{postedBy.local.nick_name ? postedBy.local.nick_name : postedBy.local.username}</div>
                    <div className='post-detail-createdAt'>{moment(new Date(created_at)).format("YYYY-MM-DD")}</div>
                  </div>
                </div>

              </div>

            </div>

            <Comment postId={this.props.postId} />

              <div>
               <Dialog
                 title="Delete Confirm"
                 actions={actions}
                 modal={false}
                 open={this.state.open}
                 onRequestClose={this.handleClose}
               >
                 This post and comments would be deleted permanently!
               </Dialog>
             </div>



          </div>
        )
      }
    }
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    posts: state.posts,
    appStatus: state.appStatus,
    notification: state.notification,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showNotification: bindActionCreators(showNotification, dispatch),
    hideNotification: bindActionCreators(hideNotification, dispatch),
    setContent: bindActionCreators(setContent, dispatch),
    loadPost: bindActionCreators(loadPost, dispatch),
    deletePost: bindActionCreators(deletePost, dispatch),
    showUserDetail: bindActionCreators(showUserDetail, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail)
