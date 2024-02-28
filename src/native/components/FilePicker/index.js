import React, { Component } from 'react';
import { View, TouchableOpacity, Alert , Platform} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {withNamespaces} from "react-i18next";

class PickFile extends Component {
    pickImage = async() => {
        const { status_camera } = await Permissions.getAsync(Permissions.CAMERA);
        const { status_camera_roll } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
        if (status_camera !== "granted") {
            await Permissions.askAsync(Permissions.CAMERA);
        }
        if (status_camera_roll != "granted") {
            await Permissions.askAsync(Permissions.CAMERA_ROLL);
        }
        var result = await ImagePicker.launchImageLibraryAsync({
            // aspect: [4, 3],
            allowsEditing: true
        });
        // console.log("RESULT", result);
        result['MIME'] = 'image/jpeg';
        result['type'] =  result.cancelled ? 'cancel' : 'success';
        result['name'] = result.uri.split('/').pop();
        this.filePickerResult(result);
    };

    pickCameraImage = async () => {
        const { allowsEditing } = this.props;
        const { status } = await Permissions.getAsync(Permissions.CAMERA);
        // console.log("CAMERA Permissions", status);
        if (status !== 'granted') await Permissions.askAsync(Permissions.CAMERA);
        let result = await ImagePicker.launchCameraAsync({
            // aspect: [4, 3],
            allowsEditing: true
        });
        result['MIME'] = 'image/jpeg';
        result['type'] = result.cancelled ? 'cancel' : 'success';
        result['name'] = result.uri.split('/').pop();
        this.filePickerResult(result);

    };

    // LanguageFixNeeded Fixed
    pickImageAlert = async() => {
        const {t} = this.props;
        let buttons = [{
            text: t("app_basic:camera_button"),
            onPress: () => {
                this.pickCameraImage()
            }
        },
            {
                text: t("app_basic:gallery_button"),
                onPress: () => {
                    this.pickImage();
                }
            },
        ];
        let closeButton = {
            text: t("app_basic:cancel_button"),
            style: 'cancel'
        };

        if (Platform.OS == 'ios') {
            buttons.push(closeButton);
        } else {
            buttons.unshift(closeButton);
        }


        await Alert.alert(
            t("app_basic:file_picker_title"),
            '', buttons, {
                cancelable: true
            }
        )
    };

    filePickerResult = (result) => {
        let { onFilePick } = this.props;
        // console.log('RESULT', result);
        onFilePick(result);
    };

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={this.pickImageAlert} style={this.props.style ? this.props.style : {}}>
                <View style={this.props.innerStyle ? this.props.innerStyle : {}}>
                    {this.props.children}
                </View>
            </TouchableOpacity>
        )
    }
}

export default withNamespaces(["app_basic"])(PickFile);