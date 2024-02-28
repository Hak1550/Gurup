import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as DocumentPicker from 'expo-document-picker';
import { launchCamera } from 'react-native-image-picker';

import { withNamespaces } from 'react-i18next';

class PickImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onImagePick: props.onImagePick,
    };
  }

  pickImage = async () => {
    var self = this;
    const status_camera = await Permissions.getAsync(Permissions.CAMERA)
      .then((result) => console.log(result))
      .catch((e) => console.log(e.message));
    const status_camera_roll = await Permissions.getAsync(
      Permissions.CAMERA_ROLL
    )
      .then((result) => console.log(result))
      .catch((e) => console.log(e.message));

    if (status_camera && status_camera.status !== 'granted') {
      await Permissions.askAsync(Permissions.CAMERA);
    }
    if (status_camera_roll && status_camera_roll.status != 'granted') {
      await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    let pickOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: Platform.select({
        ios: false,
        android: true,
      }),
    };
    if (this.props.video) {
      pickOptions.mediaTypes = ImagePicker.MediaTypeOptions.All;
    }

    var result = await ImagePicker.launchImageLibraryAsync(pickOptions)
      .then((result) => {
        if (result.type === 'video') {
          self.imagePickerResult(result, { type: 'video' });
        } else {
          self.imagePickerResult(result);
        }
      })
      .catch((e) => console.log(e.message));
  };

  pickDocument = async () => {
    const self = this;
    // console.log('getDocumentAsync Permissions ', Permissions);

    var result = await DocumentPicker.getDocumentAsync({})
      .then((result) => {
        // console.log('result', result);
        self.imagePickerResult(result, { type: 'document' });
      })
      .catch((e) => console.log('Document pick error', e.message));
  };

  pickCameraImage = async () => {
    var self = this;

    // crutch for starting camera
    const status_camera = await ImagePicker.requestCameraPermissionsAsync()
      .then((result) => console.log(result))
      .catch((e) => console.log(e.message));
    //
    launchCamera(
      {
        quality: 0.2,
        maxHeight: 4000,
        maxWidth: 4000,
        mediaType: 'photo',
      },
      (result) => {
        if (!!result.assets) {
          this.imagePickerResult({
            cancelled: false,
            height: result.assets[0].height,
            width: result.assets[0].width,
            uri: result.assets[0].uri,
            type: 'image',
          });
        }
      }
    );

    //   const status_camera = await Permissions.getAsync(Permissions.CAMERA)
    //       .then((result) => console.log(result))
    //       .catch((e) => console.log(e.message));
    //     const status_camera_roll = await Permissions.getAsync(
    //       Permissions.CAMERA_ROLL
    //     )
    //       .then((result) => console.log(result))
    //       .catch((e) => console.log('Permissions.CAMERA_ROLL----', e.message));

    //     if (status_camera && status_camera.status !== 'granted') {
    //       await Permissions.askAsync(Permissions.CAMERA);
    //     }
    //     if (status_camera_roll && status_camera_roll.status != 'granted') {
    //       await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //     }

    //   const status_camera1 = await ImagePicker.requestCameraPermissionsAsync()
    //     .then((result) => console.log(result))
    //     .catch((e) => console.log(e.message));

    //     let allowsEditing = false;
    //     if (this.props.allowsEditing) {
    //       allowsEditing = true;
    //     }

    //     let result = await ImagePicker.launchCameraAsync({
    //       quality: 0.5,
    //       allowsEditing,
    //     })
    //       .then((result) => {
    //         console.log('PICKER RESULT!', result);
    //         this.imagePickerResult(result);
    //       })
    //       .catch((e) => console.log(e.message));
  };

  pickSomething = async () => {
    const { t } = this.props;
    var self = this;

    let buttons = [
      ...(this.props.document
        ? [
            {
              text: t('app_basic:file_button'),
              onPress: () => {
                self.pickDocument();
              },
            },
          ]
        : []),
      {
        text: t('app_basic:camera_button'),
        onPress: () => {
          self.pickCameraImage();
        },
      },
      {
        text: t('app_basic:gallery_button'),
        onPress: () => {
          self.pickImage();
        },
      },
      // ...(this.props.video ? [
      // 	{
      // 		text: t('app_basic:video_button'),
      // 		onPress: () => {
      // 			self.pickVideo();
      // 		},
      // 	}
      // ] : []),
    ];

    // if(this.props.document){
    // 	buttons = [
    // 		{
    // 			text:t("app_basic:file_button"),
    // 			onPress: ()=>{
    // 				self.pickDocument();
    // 			}
    // 		},
    // 		{
    // 			text: t('app_basic:camera_button'),
    // 			onPress: () => {
    // 				self.pickCameraImage();
    // 			},
    // 		},
    // 		{
    // 			text: t('app_basic:gallery_button'),
    // 			onPress: () => {
    // 				self.pickImage();
    // 			},
    // 		},
    // 		{
    // 			text: t('app_basic:video_button'),
    // 			onPress: () => {
    // 				self.pickVideo();
    // 			},
    // 		}
    // 	];
    // }else{
    // 	buttons = [

    // 		{
    // 			text: t('app_basic:camera_button'),
    // 			onPress: () => {
    // 				self.pickCameraImage();
    // 			},
    // 		},
    // 		{
    // 			text: t('app_basic:gallery_button'),
    // 			onPress: () => {
    // 				self.pickImage();
    // 			},
    // 		}
    // 	];
    // }
    let closeButton = {
      text: t('app_basic:cancel_button'),
      style: 'cancel',
    };

    if (Platform.OS == 'ios') {
      buttons.push(closeButton);
    } else {
      // buttons.unshift(closeButton);
    }

    await Alert.alert(t('app_basic:file_picker_title'), '', buttons, {
      cancelable: true,
    });
  };

  imagePickerResult = (result, options) => {
    let { onImagePick } = this.state;
    // console.log('Picker RESULT ', result, '  onImagePick ', onImagePick);
    onImagePick(result, options);
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.pickSomething}
        style={this.props.style ? this.props.style : {}}
      >
        <View style={this.props.innerStyle ? this.props.innerStyle : {}}>
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}

export default withNamespaces('app_basic', { wait: true })(PickImage);
