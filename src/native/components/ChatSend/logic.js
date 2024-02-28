import React, { Component } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { connect } from "react-redux";
import { sendMessage } from "../../../actions/chat";
import { sendFile } from "../../../actions/misc";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props);
			this.state = {
				text: "",
				user: "",
				attachment: {},
				showPreview: false
			};
		}

		_onPressButton = () => {
			// console.log("_onPressButton");
			const { dispatch, chatID } = this.props;
			let { text, user } = this.state;
			text = text.trim();
			user = this.props.me._id;
			chat = chatID;
			const data = { chat, user, text };
			dispatch(sendMessage(chat, data));
			this.setState({text: ''})
		};

		setAttachment = (attachment) => this.setState({ attachment, showPreview: true });
		clearAttachment = () => this.setState({ attachment: {}})
		closeAttachmentPreview = () => this.setState({ showPreview: false });
		sendAttachment = () => {
			this.onFileDrop(this.state.attachment.result, this.state.attachment.options);
			this.closeAttachmentPreview();
		}
		onFileDrop = (result, options) => {
			const { chatID ,dispatch, onUploadProgress, onUploadEnd } = this.props;
			// console.log("onFileDrop1 ",result);
			if (!result.cancelled) {
				if(result && result.type!=="image"){
					// console.log("DOCUMENT UPLOADED TO CHAT ",result,options);
					let file_name = result.name.split(".")[1];
					// console.log("file_name ",file_name);
					let document = {
						uri: result.uri,
						type: "application/"+file_name,
						name: "" + Math.floor(Math.random() * 1000000)+"."+file_name,
					};
					// console.log("document ",document);
					dispatch(sendFile([document], onUploadProgress, onUploadEnd)).then(data => {
						if (data.status == 200 || data.status == "ok") {
							dispatch(sendMessage(chatID, { attachments: [{ name:result.name, type: "document", src: data.files[0] }] }));
							// console.log("doc link", data);
						}
					});
				}else{
					let photo = {
						uri: result.uri,
						type: "image/jpeg",
						name: "" + Math.floor(Math.random() * 1000000),
					};

					// console.log("DIALOGS PHOTO", photo);
					dispatch(sendFile([photo], onUploadProgress, onUploadEnd)).then(data => {
						if (data.status == 200 || data.status == "ok") {
							dispatch(sendMessage(chatID, { attachments: [{ type: "image", src: data.files[0] }] }));
							console.log("Image link", data);
						}
					});
				}
			}
		};

		onChangeText = text => {
			this.setState({ text });
		};

		render() {
			return (
				<WrappedComponent
					state={this.state}
					onChangeText={this.onChangeText}
					setAttachment={this.setAttachment}
					clearAttachment = {this.clearAttachment}
					closeAttachmentPreview={this.closeAttachmentPreview}
					sendAttachment={this.sendAttachment}
					_onPressButton={this._onPressButton}
					onFileDrop={this.onFileDrop}
					{...this.props}
				/>
			);
		}
	}

	return compose(
		withNamespaces(["app_chats", "app_basic"], { wait: true }),
		connect(({ me }) => ({ me }))
	)(Logic);
};
