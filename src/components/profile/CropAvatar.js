import AvatarCropper from '../../utils/AvatarCropper/AvatarCropper'
import FileUpload from '../../utils/FileUpload'
import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
// import axios from 'axios'

class CropAvatar extends Component {
  constructor() {
    super()
    this.state = {
      cropperOpen: false,
      img: null,
      croppedImg: null
    }
  }

  handleFileChange = (dataURI) => {
    this.setState({
      img: dataURI,
      croppedImg: this.state.croppedImg,
      cropperOpen: true
    })
  }

  handleCrop = (dataURI) => {
    this.setState({
      cropperOpen: false,
      img: null,
      croppedImg: dataURI
    })
  }

  handleRequestHide = () => {
    this.setState({
      cropperOpen: false
    })
  }

  upLoad = () => {
    // console.log('upload');
    // let data = new FormData()
    // data.append('file', this.state.croppedImg);
    // console.log(data);
    // let options = {
    //   headers: {
    //     'Content-Type': this.state.croppedImg.type
    //   }
    // };
    //
    // axios.post('/profile/upload_avatar', data, options)
    // .then( res => {
    //   console.log(res.data);
    // })
  }

  render() {
    return (
      <div className='cropAvatar-container'>
        <div className="avatar-photo">
          <FileUpload handleFileChange={this.handleFileChange} />
          <div className="avatar-edit">
          </div>
          <img role="presentation" src={this.state.croppedImg} />
        </div>
        {this.state.cropperOpen &&
          <AvatarCropper
            onRequestHide={this.handleRequestHide}
            cropperOpen={this.state.cropperOpen}
            onCrop={this.handleCrop}
            image={this.state.img}
            width={200}
            height={200}
          />
        }
        <div className='cropAvatar_btn-group'>
          <RaisedButton className='cropAvatar_upload' label='upload' type="button" onClick={this.upLoad}/>
        </div>
      </div>
    )
  }
}

export default CropAvatar
