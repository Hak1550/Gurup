import React, { Component } from "react"
import { connect } from "react-redux"
import { sendFile } from "../../../actions/misc"
import { withNamespaces } from "react-i18next"
import { compose } from "redux"
import { Actions } from "react-native-router-flux"
import { sendReport } from "../../../actions/courses"
import { sendMessage } from "../../../actions/chat"

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props)
			this.state = {
				text: "",
				user: "",
				attachment: {},
				successAnimation: false,
				progress: 0,
				showPreview: false
			}
		}

		_onPressButton = async () => {
			const { dispatch, marathon, exercise, course, courseType } = this.props
			let { text } = this.state
			text = text.trim()
			// console.log('courseType', courseType, 'course', [courseType]._id)
			const courseID = courseType == 'marathon' ? marathon._id : courseType === 'course' && course._id
			let reportResult = await dispatch(
				sendReport(courseID, exercise._id, {
					text,
					// attachments,
				})
			)
			// console.log("reportResult ", reportResult)
			if (reportResult.status && reportResult.status === "error") {
				// console.log("ERROR")
			} else if (reportResult.status && reportResult.status === "ok") {
				// console.log("OKEY")
				Actions.pop()
				dispatch({
					type: "START_ANIMATION",
					name: "checked",
					duration: 1500,
				})
			}

			this.setState({ text: "1" });
		};
		onProgress = ({loaded, total}) => {
			// console.log("UPLOAD PROGRESS", loaded, total);
			this.setState({ progress:  loaded/total});

		};
		onEnd = (event) => {
			// console.log("onUloadEnd", event);
			this.setState({progress: 0});
		};

		setAttachment = (attachment) => this.setState({ attachment, showPreview: true });
		clearAttachment = () => this.setState({ attachment: {} })
		closeAttachmentPreview = () => this.setState({ showPreview: false });
		sendAttachment = () => {
			this.onFileDrop(this.state.attachment.result, this.state.attachment.options);
			this.closeAttachmentPreview();
		}

		onFileDrop = (result,options) => {
			const { dispatch, onUploadProgress, onUploadEnd, marathon, course, exercise } = this.props;
			// console.log("onFileDrop1 ", result);
			if (!result.cancelled) {
				if (result && result.type === "video"){
					// console.log("VIDEO UPLOADED TO REPORT ", result, options);
					let file_name = result.uri.split(".").pop();
					// console.log("file_name ", file_name);
					let document = {
						uri: result.uri,
						type: "application/" + file_name,
						name: "" + Math.floor(Math.random() * 1000000) + "." + file_name,
					};
					// console.log("document ", document);
					dispatch(sendFile([document], this.onProgress, this.onEnd, true)).then(data => {
						let course_id = marathon._id ? marathon._id : course._id;
						if (!course_id) {
							console.error("No course id");
							return;
						}
						if (data.status == 200 || data.status == "ok") {
							dispatch(
								sendReport(course_id, exercise._id, {
									text: " ",
									attachments: [{ name: document.name, type: "video", src: data.files[0].src }],
								})
							)
							// console.log("Image link", data)
						}
					});
				} else if (result && result.type !== "image"){
					// console.log("DOCUMENT UPLOADED TO REPORT ",result,options);
					let file_name =result.uri.split(".").pop();
					// console.log("file_name ",file_name);
					let document = {
						uri: result.uri,
						type: "application/"+file_name,
						name: "" + Math.floor(Math.random() * 1000000)+"."+file_name,
					};
					// console.log("document ",document);
					dispatch(sendFile([document], this.onProgress, this.onEnd, true)).then(data => {
						// console.log("UPLOADED ",data);
						let course_id = marathon._id?marathon._id:course._id;
						if(!course_id){
							console.error("No course id");
							return;
						}
						if (data.status == 200 || data.status == "ok") {
							dispatch(
								sendReport(course_id, exercise._id, {
									text: " ",
									attachments: [{ name: document.name, type: "document" || data.files[0].type, src: data.files[0].src }],
								})
							)
							// console.log("Image link", data)
						}
					});
				} else {
					let photo = {
						uri: result.uri,
						type: "image/jpeg",
						name: "" + Math.floor(Math.random() * 1000000),
					}

					// console.log("DIALOGS PHOTO", photo)
					dispatch(sendFile([photo], this.onProgress, this.onEnd)).then(data => {
						// console.log("sendFile data : ", data)
						// console.log("marathon._id ",marathon._id);
						// console.log("course._id ",course._id);

						let course_id = marathon._id?marathon._id:course._id;
						if(!course_id){
							console.error("No course id");
							return;
						}
						if (data.status == 200 || data.status == "ok") {
							dispatch(
								sendReport(course_id, exercise._id, {
									text: " ",
									attachments: [{ type: "image", src: data.files[0] }],
								})
							)
							// console.log("Image link", data)
						}
					})
				}
			}
		}

		onChangeText = text => {
			this.setState({ text })
		}

		render() {
			return (
				<WrappedComponent
					state={this.state}
					onChangeText={this.onChangeText}
					onFileDrop={this.onFileDrop}
					_onPressButton={this._onPressButton}
					setAttachment={this.setAttachment}
					clearAttachment={this.clearAttachment}
					closeAttachmentPreview={this.closeAttachmentPreview}
					sendAttachment={this.sendAttachment}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_chats", "app_basic"], { wait: true }),
		connect(({ me, marathon, exercise, course }) => ({ me, marathon, exercise, course }))
	)(Logic)
}
