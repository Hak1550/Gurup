import React, { Component } from "react"
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			text: "",
			attachments: [],
			uploading: false,
			progress: 0,
		};
		onChange = (e) => {
			const {onChange} = this.props;
			const text = e.target.value;
			this.setState({text});
			if(onChange) {
				onChange(e);
			}
		};
		onUploadStart = () => {
			const {onUploadStart} = this.props
			this.setState({
				uploading: true
			}, ()=>{
				if (onUploadStart) {
					onUploadStart()
				}
			})

		}
		uploadOnChange=(data)=>{
			let {attachments} = this.state
			const {uploadOnChange} = this.props
			this.setState({
				attachments: [...attachments, ...data.value],
				uploading: false,
				progress: 0,
			})
			if (uploadOnChange) {
				uploadOnChange(data)
			}
		}
		attachmentDelete=(attachment)=>{
			let {attachments} = this.state
			attachments.splice(attachments.indexOf(attachment), 1)
			this.setState({
				attachments
			})
		}
		onKeyDown = (e)=>{
			if(e.keyCode == 13 && e.shiftKey == false) {
				e.preventDefault();
				this.onSubmit()
			} else if (e.keyCode == 13 && e.shiftKey == true) {
				//вставить <br/> в конец текста
			}
		}
		onSubmit=()=>{
			let {attachments, text} = this.state
			let {onSubmit} = this.props
			if (text.length || attachments.length) {
				onSubmit({attachments, text})
				this.setState({
					attachments: [],
					text: ""
				})
			}
		}
		onUploadProgress=(progress)=>{
			this.setState({
				progress
			})
		}
		render() {
			return (
				<WrapperComponent
					{...this.props}
					state={this.state}
					onKeyDown={this.onKeyDown}
					onSubmit={this.onSubmit}
					onChange = {this.onChange}
					onUploadProgress= {this.onUploadProgress}
					onUploadStart={this.onUploadStart}
					uploadOnChange={this.uploadOnChange}
					attachmentDelete={this.attachmentDelete}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["basic", "chats"]),
	)(Logic);
};
