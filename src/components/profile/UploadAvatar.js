import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import Dropzone from '../../utils/Dropzone'
import Cancel from 'material-ui/svg-icons/navigation/cancel'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setUser } from '../../actions/authActions'
import Notification from '../notification/Notification'

import AvatarCropper from '../../utils/AvatarCropper/AvatarCropper'


class UploadAvatar extends Component {
  constructor() {
    super()
    this.state = {
      files: [],
      file: null,
      data: new FormData(),
      show: false,
      content: '',
      cropperOpen: false,
      img: null,
      croppedImg: null,
      cancelBtnHide: true,
      uploadBtnGroupHide: true,
      uploadContainerHide: false
    }
  }

  onDrop = (files) => {
    let data = new FormData();
    data.append('file', files[0]);
    this.setState({
      files: files,
      file: files[0],
      data: data
    })

    var reader = new FileReader();
    var file = files[0];

    if (!file) return;

    reader.onload = function(img) {
      this.handleFileChange(img.target.result);
    }.bind(this);
    reader.readAsDataURL(file)

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
      // croppedImg: downscaleImage(dataURI, 120, this.state.files[0].type, 0.8),
      cancelBtnHide: false,
      uploadBtnGroupHide: false,
      uploadContainerHide: true
    })
    resizeImage(dataURI, 120, 120, img => {
      this.setState({ croppedImg: img })
    })
  }

  handleRequestHide = () => {
    this.setState({
      cropperOpen: false
    })
  }

  upLoad = () => {
    axios.post('/profile/upload_avatar_dataurl', { img: this.state.croppedImg }).then( res => {
      if(res.data.success) {
        this.setState({ show: true, content: res.data.success, croppedImg: null, cancelBtnHide: true, uploadBtnGroupHide: true, uploadContainerHide: false })
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
    this.setState({ croppedImg: null, cancelBtnHide: true, uploadBtnGroupHide: true, uploadContainerHide: false })
  }

  handleHide = () => {
    this.setState({ show: !this.state.show })
    return this.state.show
  }

  render() {
    const hide = this.state.cancelBtnHide ? 'hide' : ''
    const uploadBtnGroupHide = this.state.uploadBtnGroupHide ? 'uploadAvatar-preview-btn-group-hide' : ''
    const uploadContainerHide = this.state.uploadContainerHide ? 'uploadAvatar-upload-container-hide' : ''

    return (
      <div className='uploadAvatar-container'>

        <div className='uploadAvatar-sub-container'>

          <div className={`uploadAvatar-upload-container ${uploadContainerHide}`}>
            <div className='uploadAvatar-sub-upload-container'>
              <Dropzone ref={(node) => { this.dropzone = node; }}
                  onDrop={this.onDrop}
                  multiple={false}
                  accept='image/*'
                  maxSize={3145728}
                  >
                  <div className='uploadAvatar-drop-div'> drop your avatar image here, or click to select files to upload.</div>
              </Dropzone>

            </div>
            <Notification cancellable={true} handleHide={this.handleHide} show={this.state.show} content={this.state.content} />
          </div>


          <div className='uploadAvatar-preview-container'>

            {this.state.croppedImg ?
            <div className="uploadAvatar-preview-img" >
              <div onClick={this.handleCancelPreview} className={`uploadAvatar-preview-cancel-btn ${hide}`}><Cancel style={{ backgroundColor: 'white', borderRadius: '50%' }}/></div>
              <img role="presentation" src={this.state.croppedImg} />
            </div> : null }

            {this.state.cropperOpen &&
              <div className='ModalCustom-container'>
              <AvatarCropper
                onRequestHide={this.handleRequestHide}
                cropperOpen={this.state.cropperOpen}
                onCrop={this.handleCrop}
                image={this.state.img}
                width={200}
                height={200}
              /></div>
            }

            <div className={`uploadAvatar-preview-btn-group ${uploadBtnGroupHide}`} >
              <RaisedButton className='uploadAvatar-upload-btn' label='upload' type="button" onClick={this.upLoad}/>
            </div>

          </div>



        </div>

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


// doesn't work for safari
// Take an image URL, downscale it to the given width, and return a new image URL.
// function downscaleImage(dataUrl, newWidth, imageType, imageArguments) {
//     var image, oldWidth, oldHeight, newHeight, canvas, ctx, newDataUrl;
//
//     // Provide default values
//     imageType = imageType || "image/jpeg";
//     imageArguments = imageArguments || 0.7;
//
//     // Create a temporary image so that we can compute the height of the downscaled image.
//     image = new Image();
//     image.src = dataUrl;
//     oldWidth = image.width;
//     oldHeight = image.height;
//     newHeight = Math.floor(oldHeight / oldWidth * newWidth)
//
//     // Create a temporary canvas to draw the downscaled image on.
//     canvas = document.createElement("canvas");
//     canvas.width = newWidth;
//     canvas.height = newHeight;
//     ctx = canvas.getContext("2d");
//
//     // Draw the downscaled image on the canvas and return the new data URL.
//     ctx.drawImage(image, 0, 0, newWidth, newHeight);
//     newDataUrl = canvas.toDataURL(imageType, imageArguments);
//     return newDataUrl;
// }

// work for safari
function resizeImage(url, width, height, callback) {
    var sourceImage = new Image();

    sourceImage.onload = function() {
        // Create a canvas with the desired dimensions
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        // Scale and draw the source image to the canvas
        canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);

        // Convert the canvas to a data URL in PNG format
        callback(canvas.toDataURL());
    }

    sourceImage.src = url;
}
