import React, { Component } from 'react';
import { View } from 'react-native';
// import WebView from 'react-native-android-fullscreen-webview-video';
import WebView from 'react-native-webview';
// import WebView from 'react-native-webview-fullscreen';
import styles from './styles';

class YouTubeVideo extends Component {
  orientation = 'PORTRAIT';
  componentDidMount() {
    setTimeout(() => {
      // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    }, 4000);
  }
  render() {
    const { host = 'youtube', videoID = '' } = this.props;
    let uri = '';
    if (host === 'youtube')
      uri = `https://www.youtube.com/embed/${videoID}?rel=0&amp;showinfo=0;allowfullscreen`;
    if (host === 'vimeo') uri = `https://player.vimeo.com/video/${videoID}`;
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
          allowsFullscreenVideo={true}
          source={{
            uri,
          }}
        />
      </View>
    );
  }
}

export default YouTubeVideo;
