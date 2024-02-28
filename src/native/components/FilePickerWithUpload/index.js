import React, {Component} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux'
import FilePicker from "../FilePicker"
import {sendFile} from "../../../actions/misc"
import * as Permissions from "expo-permissions";

class PickFileWithUpload extends Component {

    onFileDrop = async (result) => {
        const {dispatch, onUpload, onPick, onUploadProgress} = this.props;
        if (!result.cancelled) {
            let photo = {
                uri: result.uri,
                type: 'image/jpeg',
                name: result.name
            };
            if (onPick){
                onPick(photo)
            }
            const { status_camera } = await Permissions.getAsync(Permissions.CAMERA);
            const { status_camera_roll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
            if (status_camera !== "granted") {
                await Permissions.askAsync(Permissions.CAMERA);
            }
            if (status_camera_roll != "granted") {
                await Permissions.askAsync(Permissions.CAMERA_ROLL);
            }
            dispatch(sendFile([photo],onUploadProgress))
                .then( data => {
                    if (data.status == 200 || data.status == 'ok') {
                        onUpload(data.files[0])
                    }
                })
        }
    };

    render() {
        const {children,...rest} = this.props;
        return (
            <FilePicker onFilePick={this.onFileDrop} {...rest}>
                {children}
            </FilePicker>
        )
    }
}

export default connect(null)(PickFileWithUpload)
