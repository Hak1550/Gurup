import React, { Component } from "react";
import { sendReport } from "../../../actions/sign";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import {connect} from 'react-redux';
import {manifest} from 'expo-updates';
const { id, sdkVersion, revisionId, releaseChannel } = manifest;
import * as Device from 'expo-device';
const {manufacturer,brand, modelName,modelId, deviceYearClass, totalMemory,osName,osVersion } = Device;
export default WrappedComponent => {
	class Logic extends Component {
		send = () => {
			const { dispatch } = this.props;
			// console.log("Report text", this.state.text);
			dispatch(sendReport({
				...this.state,
				expoData:{
					id,
					sdkVersion,
					revisionId,
					releaseChannel
				},
				deviceData:{
					manufacturer,
					brand,
					modelName,
					modelId,
					deviceYearClass,
					totalMemory,
					osName,
					osVersion
				}
			})).then(() => {
				this.setState({ text: "" });
			});
		};

		state = {
			text: "",
			files: [],
		};

		onFilePick = file => {
			// console.log("FILE PICK", file);
			this.setState({ files: [...this.state.files, file] });
		};

		onFileRemove = key => {
			// console.log("KEY OF REMOVED ELEMENT", key);
			let files = this.state.files.slice();
			files.splice(key, 1);
			this.setState({ files });
		};

		_onChangeText = text => {
			this.setState({ text });
		};

		render() {
			return (
				<WrappedComponent
					state={this.state}
					send={this.send}
					onFilePick={this.onFilePick}
					onFileRemove={this.onFileRemove}
					_onChangeText={this._onChangeText}
					{...this.props}
				/>
			);
		}
	}

	return compose(
		withNamespaces("app_support", { wait: true }),
		connect(({ me }) => ({ me }))
	)(Logic);
};
