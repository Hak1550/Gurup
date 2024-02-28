import React, { Component } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import styles from './styles';

class VimeoVideo extends Component {
  render() {
    const { videoID = '' } = this.props;
    // console.log('VIDEO ID', videoID);
    const uri = `https://fast.wistia.net/embed/iframe/${videoID}?videoFoam=true`;
    return (
      <View style={styles['container']}>
        <WebView
          // crutch for ios background play
          contentMode="desktop"
          allowsInlineMediaPlayback="false"
          // crutch for android background play
          userAgent={
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36'
          } // crutch for android background play
          style={styles['container']}
          allowsFullscreenVideo={true}
          source={{ uri }}
        />
      </View>
    );
  }
}

export default VimeoVideo;
