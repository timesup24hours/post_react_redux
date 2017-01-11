import React, { Component } from 'react'
import ReactDom from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
//material-ui
import Face from 'material-ui/svg-icons/action/face'
import Close from 'material-ui/svg-icons/navigation/close'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
//actions
import { showNotification, hideNotification, setContent } from '../../actions/notificationActions'
import { deleteComment, deleteCommentFromReducer } from '../../actions/commentFormActions'
import { showUserDetail } from '../../actions/userDetailActions'
//components
import Notification from '../notification/Notification'
import Mask from '../mask/Mask'

class CommentList extends Component {
  constructor() {
    super()
    this.state = {
      open: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleClose = () => {
    this.setState({ open: false })
  };

  handleDeleteComment = () => {
    this.props.deleteComment(this.props.comment._id).then( res => {
      if(res.data.deletedResult.n === 1) {
        ReactDom.findDOMNode(this.refs.commentList).className = 'commentList-container animated fadeOut'
        setTimeout(() => this.props.deleteCommentFromReducer(this.props.comment._id), 1000)
      } else {
        this.props.setContent('This post has already been deleted by the poster!')
        this.props.showNotification()
        setTimeout(() => {
          console.log('This post has already been deleted!')
          this.props.hideNotification()
          this.context.router.push('/posts')
        }, 4000)

      }
    })
    this.handleClose()
  }

  showUserDetail = () => {
    this.props.showUserDetail({
      avatar_name: this.props.comment.postedBy.local.avatar_name,
      nick_name: this.props.comment.postedBy.local.nick_name,
      username: this.props.comment.postedBy.local.username
    })
  }

  render() {
    const { _id, content, created_at, postedBy } = this.props.comment
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleDeleteComment}
      />,
    ];

    return (
      <div ref='commentList' className='commentList-container animated fadeIn'>

        <div className='commentList-header'>


          {postedBy.local.avatar_name
            ? <div className='commentList-avatar'>
                <img onClick={this.showUserDetail} src={`${postedBy.local.avatar_name}`} alt=""/>
              </div>
            : <Face onClick={this.showUserDetail} style={{ height: '30px', width: '30px'}} />}

          <div className='commentList-userInfo'>
            <div className='commentList-poster'>{postedBy.local.nick_name ? postedBy.local.nick_name : postedBy.local.username}</div>
            <div className='commentList-createdAt'>{moment(created_at).fromNow()}</div>
          </div>

          {/* delete button */}
          {this.props.auth.user.id === postedBy._id
            ?   <div className='commentList-delete' onTouchTap={this.handleOpen} >
                  <Close style={{ height: '18px', width: '18px' }} />
                </div>
            :   null}
        </div>

        <div className='commentList-body'>
          <div className='commentList-content'>{content}</div>
        </div>

        <div>
          <Dialog
            title="Delete Confirm"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            This comment would be deleted permanently.
          </Dialog>
        </div>

        {this.props.notification.show
          ?
          <div className='commentList-mask-container'>
          <Mask show={this.props.notification.show} showCircle={false} >
           <Notification cancellable={false} handleHide={this.props.hideNotification} show={this.props.notification.show} content={this.props.notification.content} />
          </Mask></div>
          : null}

      </div>

    )
  }
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
    userDetail: state.userDetail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: bindActionCreators(deleteComment, dispatch),
    deleteCommentFromReducer: bindActionCreators(deleteCommentFromReducer, dispatch),
    showNotification: bindActionCreators(showNotification, dispatch),
    hideNotification: bindActionCreators(hideNotification, dispatch),
    setContent: bindActionCreators(setContent, dispatch),
    showUserDetail: bindActionCreators(showUserDetail, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList)
// moment(new Date(created_at)).format("YYYY-MM-DD")

// <img src={`http://localhost:3000/uploads/${postedBy._id}/images/avatar/thumbs/${postedBy.local.avatar_name}`} alt=""/>
