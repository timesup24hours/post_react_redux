import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import Dropzone from '../../utils/Dropzone'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser } from '../../actions/authActions'
import Notification from '../notification/Notification'

class UploadAvatar extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
      data: new FormData(),
      show: false,
      content: ''
    }
  }

  onDrop = (files) => {
    let data = new FormData();
    data.append('file', files[0]);
    this.setState({
      files: files,
      data: data
    })

  }

  upLoad = () => {
    let options = {
      headers: {
        'Content-Type': this.state.files[0].type
      }
    };

    axios.post('/profile/upload_avatar', this.state.data, options)
      .then( res => {
        if(res.data.success) {
          this.setState({ show: true, content: res.data.success, files: [] })
          this.props.setUser(res.data.token)
        } else {
          this.setState({ show: true, content: res.data.err })
        }
      })
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  handleCancelPreview = () => {
    this.setState({ files: [] })
  }

  handleHide = () => {
    this.setState({ show: !this.state.show })
    return this.state.show
  }

  render() {
    return (
      <div className='uploadAvatar-container'>
        <div className='uploadAvatar-upload-container'>
          <div className='uploadAvatar-sub-upload-container'>
            <Dropzone ref={(node) => { this.dropzone = node; }}
                onDrop={this.onDrop}
                multiple={false}
                accept='image/*'
                maxSize={3145728}
                >
                <div className='uploadAvatar-drop-div'> drop your avatar image here, or click to select files to upload.</div>
            </Dropzone>
            <Notification cancellable={true} handleHide={this.handleHide} show={this.state.show} content={this.state.content} />
          </div>
          <div className='uploadAvatar-btn-group'>
            <RaisedButton className='uploadAvatar-upload' label='upload' type="button" onClick={this.upLoad}/>
          </div>
        </div>


        {this.state.files.length > 0 ? <div>
          <div className='uploadAvatar-preview'>
            <div className='uploadAvatar-preview-container' >
              <div onClick={this.handleCancelPreview} className='uploadAvatar-preview-cancel-btn'><Cancel /></div>
              <img role="presentation" style={{ height: '80px', width: '80px' }} src={this.state.files[0].preview} />
            </div>
          </div>
        </div> : null}

      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUser: bindActionCreators(setUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadAvatar);

// <RaisedButton className='uploadAvatar_choose' label='choose image' type="button" onClick={this.onOpenClick}/>

// <div className='uploadAvatar_container'>
//   <form onSubmit={this.handleUpload} encType='multipart/form-data' >
//     <input ref='upload' className='uploadAvatar-uploadField' accept="image/*" type="file" name='avatar'/>
//     <RaisedButton className='singupForm-submit' onClick={this.handleUpload} type="submit" label="upload" primary={true}  />
//   </form>
// </div>
