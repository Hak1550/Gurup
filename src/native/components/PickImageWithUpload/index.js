import React, {Component} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux'
import PickImage from "../../components/PickImage"
import {sendFile} from "../../../actions/misc"

class PickImageWithUpload extends Component {

	onFileDrop = (result, options) => {
		const {dispatch, onUpload, onUploadProgress,onDrop} = this.props;
		// console.log("OPTIONS", options)
		if (!result.cancelled) {
			

			if(options && options.type=="document"){
				let file_name = null;
				if(result && result.uri){
					file_name = result.uri.split(".")[1];
				}
				// console.log("file_name ",file_name);
				let document = {
					uri: result.uri,
					type: "application/"+file_name,
					name: "" + Math.floor(Math.random() * 1000000)+"."+file_name,
				};

				// console.log("document ",document);
				dispatch(sendFile([document], onUploadProgress, onUploadEnd)).then(data => {
					// console.log("SEND FILE", data)
					if (data.status == 200 || data.status == "ok") {
						onUpload(data.files[0])
						
					}
				});
			}else{
				// console.log("PickImageWithUpload => ",result);

				
				let photo = {
					uri: result.uri,
					type: 'image/jpeg',
					// name: result.name
					name: "" + Math.floor(Math.random() * 1000000)
				};

				if(onDrop){
					// console.log("onDrop ");
					onDrop(photo)
				}

				// console.log('PickImageWithUpload PHOTO', photo,"  onUploadProgress=>",onUploadProgress);
				dispatch(sendFile([photo],onUploadProgress))
				.then( data => {
					// console.log("Avatar uploaded ",data);
					if (data.status == 200 || data.status == 'ok') {
						onUpload(data.files[0])
					}
				})
			}
			
		}
	}

	render() {
		const {children,...rest} = this.props

		return (
		  <PickImage onImagePick={this.onFileDrop} {...rest}>
			  {children}
		  </PickImage>
		)
	}
}

export default connect(null)(PickImageWithUpload)
