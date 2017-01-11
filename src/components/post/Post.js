import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import moment from 'moment'
//components
import Face from 'material-ui/svg-icons/action/face'
//actions
import { showUserDetail } from '../../actions/userDetailActions'

class Post extends Component {


  showUserDetail = () => {
    this.props.showUserDetail({
      avatar_name: this.props.post.postedBy.local.avatar_name,
      nick_name: this.props.post.postedBy.local.nick_name,
      username: this.props.post.postedBy.local.username
    })
  }

  render() {
    const { _id, title, content, postedBy, created_at } = this.props.post
    return (
      <div className='post-container animated fadeIn'>
        <Link to={`/posts/${_id}`} className='post-header'>{title}</Link>
        <div className='post-body'>
          <div className='post-body-container'>
            {content}
          </div>
        </div>
        <div className='post-footer'>
          <div className='post-footer-user'>
            {postedBy.local.avatar_name ? <div onClick={this.showUserDetail} className='post-footer-avatar'>
            <img src={`${postedBy.local.avatar_name}`} alt=""/>
            </div> : <Face onClick={this.showUserDetail} style={{ height: '30px', width: '30px'}} />}
            <div className='post-footer-poster'>{postedBy.local.nick_name ? postedBy.local.nick_name : postedBy.local.username}</div>
          </div>
          <div className='post-footer-createdAt'>{moment(new Date(created_at)).format("YYYY-MM-DD")}</div>
        </div>


      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showUserDetail: bindActionCreators(showUserDetail, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Post)
