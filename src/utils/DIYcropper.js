import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Cropper from 'cropperjs'

class DIYcropper extends Component {
    readURL = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
              document.getElementById('blah').src = e.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            setTimeout(this.initCropper, 1000);
        }
    }

    initCropper = () => {
        console.log("Came here")
        var image = document.getElementById('blah');
        var cropper = new Cropper(image, {
            aspectRatio: 1 / 1,
            crop: function(e) {
                console.log(e.detail.x);
                console.log(e.detail.y);
            }
        })

        // On crop button clicked
        document.getElementById('crop_button').addEventListener('click', function() {
            var imgurl = cropper.getCroppedCanvas().toDataURL();
            var img = document.createElement("img");
            img.src = imgurl;
            console.log(imgurl);
            document.getElementById("cropped_result").appendChild(img);
        })

    }

    render() {
        return (
          <div>
            <input type="file" name="image" id="image" onChange={this.readURL}/>
              <div className="image_container">
                <img id="blah" src="#" alt="your image" />
              </div>
              <div id="cropped_result"></div>
            <button id="crop_button">Crop</button>
          </div>
        )
    }
}

export default DIYcropper

/* ---------------- SEND IMAGE TO THE SERVER-------------------------

      cropper.getCroppedCanvas().toBlob(function (blob) {
            var formData = new FormData();
            formData.append('croppedImage', blob);
            // Use `jQuery.ajax` method
            $.ajax('/path/to/upload', {
              method: "POST",
              data: formData,
              processData: false,
              contentType: false,
              success: function () {
                console.log('Upload success');
              },
              error: function () {
                console.log('Upload error');
              }
            });
      });
  ----------------------------------------------------*/
