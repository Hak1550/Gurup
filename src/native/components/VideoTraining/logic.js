import React, { Component, Fragment } from 'react'
// import Expo from 'expo'
import { Video, Audio } from 'expo-av';
import { Platform } from "react-native";
// import { ScreenOrientation } from 'expo';
// Нужно залинковать в следующей версии обязательно и убрать зависисость expo
import * as ScreenOrientation from 'expo-screen-orientation';

export default (WrappedComponent) => {
    let innerVideoRef;
    class Logic extends Component {
        constructor(props){
            super(props);
            this.state = {
                isFullScreen: false,
                isLooping: false,
                posterClicked: false,
                status: {},
                thumbPosition: null,
                qualityOpenned: false,
                videoSrc: props.url,
                currentQuality: null,
                loading: false,
                resizeMode: Video.RESIZE_MODE_CONTAIN
            }
            this.videoRef = innerVideoRef;
            if (props.qualities && props.qualities.length) {
                // console.log("QUALITIES", props.qualities);
                const defaultQuality = props.qualities.find(({res}) => res === "1080p");
                if (defaultQuality){
                    this.state.videoSrc = defaultQuality.src;
                    this.state.currentQuality = defaultQuality.res;
                }
                // const defaultQuality = props.qualities[props.qualities.length - 1];
            }
            Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: false,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                playThroughEarpieceAndroid: false,
                shouldDuckAndroid: true,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
                playsInSilentModeIOS: true,
            }).catch((error) => {
                console.log("error setting audio mode", error)
            })
        }

        onFullscreenUpdate = async ({fullscreenUpdate}) => {
            const lock = await ScreenOrientation.getOrientationAsync();
            // console.log("ScreenOrientation", lock)
            try {
                if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_DISMISS){
                    await ScreenOrientation.lockAsync(ScreenOrientation.Orientation.PORTRAIT_UP);
                } else if (fullscreenUpdate === Video.FULLSCREEN_UPDATE_PLAYER_WILL_PRESENT) {
                    await ScreenOrientation.unlockAsync();
                }
            } catch (error) {
                console.log("ScreenOrientation.unlockAsync()", error)
            }
        }

        _fullScreenToggle = async () => {
            this.videoRef.presentFullscreenPlayer()
        }

        _playVideo = () => {
            if (this.videoRef){
                this.videoRef.playAsync()
            }
        }
        
        _pauseVideo = () => {
            if (this.videoRef) {
                return this.videoRef.pauseAsync()
            }
        }

        _seekVideo = (thumbPosition) => {
            this.setState({ thumbPosition });
        }
        
        // Platform.select({
        //     ios: async (position) => {
        //         if (this.videoRef) {
        //             await this.videoRef.setPositionAsync(position, {
        //                 toleranceMillisBefore: 0,
        //                 toleranceMillisAfter: 0
        //             })
        //         }
        //     },
        //     android: (thumbPosition) => {
        //         this.setState({ thumbPosition }); 
        //     }
        // })
        
        _replayVideo = async () => {
            await this.videoRef.setStatusAsync({
                shouldPlay: true,
                positionMillis: 0
            });
            // await this.videoRef.setPositionAsync(0, {
            //     toleranceMillisBefore: 0,
            //     toleranceMillisAfter: 0
            // });
            // this._playVideo();
        }

        _offsetSeek = async (offset) => {
            const {positionMillis} = this.state.status;
            await this.videoRef.setPositionAsync(positionMillis + offset, {
                toleranceMillisBefore: 0,
                toleranceMillisAfter: 0
            });
            this._playVideo();
        }

        _onSeekEnd = async (position) => {
            await this.videoRef.setPositionAsync(position, {
                toleranceMillisBefore: 0,
                toleranceMillisAfter: 0
            });
            this.setState({ thumbPosition: null });
            this._playVideo();
        }
        
        // Platform.select({
        //     ios: this._playVideo,
        //     android: async (position) => {
        //         await this.videoRef.setPositionAsync(position);
        //         this.setState({ thumbPosition: null });
        //         this._playVideo();
        //     }
        // });


        _onVideoStatusUpdate = status => {
            // console.log("VIDEO STATUS", status) 
            this.setState({status});
            if (this.props.onVideoStatusUpdate) {
                this.props.onVideoStatusUpdate(status);
            }
        }

        _changeVideoSRC = async ({res, src}) => {
            // console.log("CHANGE VIDEO SRC", uri)
            if (this.videoRef) {
                this.setState({ currentQuality: res, loading: true, qualityOpenned: false});
                await this._pauseVideo()
                const currentStatus = await this.videoRef.getStatusAsync();
                // console.log("BEFORE STATUS", currentStatus);
                try {
                    const statusToSet = {
                        ...currentStatus,
                        positionMillis: currentStatus.positionMillis - 1,
                        shouldPlay: true
                    }
                    // await this.videoRef.unloadAsync();
                    await this.videoRef.loadAsync({ uri: src }, statusToSet, true)
                    this.setState({loading: false});
                } catch (error) {
                    console.log("STATUS ERROR", error)
                }
            }
        }
        
        toggleQualityControl = () => this.setState({ qualityOpenned: !this.state.qualityOpenned });
        closeQualityControl = () => this.setState({ qualityOpenned: false });
        toggleResizeMode = async () => {
            if (this.state.resizeMode === Video.RESIZE_MODE_CONTAIN){
                // console.log("SET RESIZE MODE COVER!")
                this.setState({ 
                    resizeMode: Video.RESIZE_MODE_COVER,
                    // rate: 1
                })
                this.videoRef.setStatusAsync({
                    resizeMode: Video.RESIZE_MODE_COVER
                });
            } else {
                // console.log("SET RESIZE MODE CONTAIN!")
                this.setState({ 
                    resizeMode: Video.RESIZE_MODE_CONTAIN,
                    // rate: 0.5 
                })
                this.videoRef.setStatusAsync({
                    resizeMode: Video.RESIZE_MODE_CONTAIN
                });
            }
        }
        videoView = (props = {}) => {
            const { videoSrc, resizeMode} = this.state;
            if(!videoSrc) return null
            const defaultStyle = {
                width: "100%",
                aspectRatio: 16 / 9
            };
            let videoStyle = this.props.style ? this.props.style : defaultStyle;
            let { poster = null, useNativeControls = false, isLooping = false, shouldPlay } = this.props;
            let source = {
                uri: videoSrc,
            };
            if(videoSrc.includes("m3u8") && Platform.OS === "android"){
                source.overrideFileExtensionAndroid = "m3u8";
            }
            const videoProps = {
                ref: (ref) => { this.videoRef = ref },
                source,
                shouldPlay,
                useNativeControls,
                isLooping,
                resizeMode,
                style: videoStyle,
                onFullscreenUpdate: this.onFullscreenUpdate,
                onPlaybackStatusUpdate: this._onVideoStatusUpdate,
                progressUpdateIntervalMillis: 100,
                ...(poster ? {
                    usePoster: true,
                    posterSource: { uri: poster }
                } : {}), 
                ...props
            }
            return (
                <Video
                    {...videoProps}
                />
            )
        }

        render() {
            return <WrappedComponent
                state={this.state}
                _closeQualityControl={this.closeQualityControl}
                _onSeekEnd={this._onSeekEnd}
                _fullScreenToggle={this._fullScreenToggle}
                _playVideo={this._playVideo}
                _pauseVideo={this._pauseVideo}
                _seekVideo={this._seekVideo}
                _onVideoStatusUpdate={this._onVideoStatusUpdate}
                _fullScreenUpdate={this._fullScreenUpdate}
                _changeVideoSRC={this._changeVideoSRC}
                _replayVideo={this._replayVideo}
                _toggleQualityControl={this.toggleQualityControl}
                _toggleResizeMode = {this.toggleResizeMode}
                status={this.state.status}
                url={this.props.url}
                videoView={this.videoView}
                {...this.props} />
        }
    }

    return Logic
}


