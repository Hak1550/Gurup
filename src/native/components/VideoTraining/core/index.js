import React from 'react'
import { View, Text, TouchableOpacity, Animated, TouchableWithoutFeedback, Platform} from 'react-native'
import styles from '../styles'
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import FullScreenIcon from '../../../assets/core/svg-icon/full-screen'
import Logic from '../logic'
import Preloader from "../../Preloader";
import { func } from 'prop-types';
import { TouchableOpacityBase } from 'react-native';
import Slider from "@react-native-community/slider";
import Dropdown from '../../Dropdown';
import { Actions } from 'react-native-router-flux';
import { formatSecondsAsTimer } from "../../../utils";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Video } from 'expo-av';
import { withNamespaces } from 'react-i18next'
import {compose} from "redux";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';

class VideoTraining extends React.Component {
    constructor(props){
        super(props);
        this.animations = {
            bottomControls: {
                marginBottom: new Animated.Value(0),
            }, 
            topControls: {
                marginTop: new Animated.Value(0),
            },
            centerButton: {
                opacity: new Animated.Value(1)
            },
            overlay: {
                opacity: new Animated.Value(0.5)
            },
            controlsVisible: false,
            showControls: function ({ animated = true } = {}){
                this.controlsVisible = true;
                if (animated) {
                    if (!this.showControlsinProgress) {
                        this.showControlsinProgress = true;
                        // Animated.sequence([
                        Animated.parallel([
                            Animated.timing(
                                this.overlay.opacity,
                                { toValue: 0.5, duration: 500, useNativeDriver: true },
                            ),
                            Animated.timing(
                                this.centerButton.opacity,
                                {  toValue: 1, duration: 500, useNativeDriver: true }
                            ),
                            Animated.timing(
                                this.bottomControls.marginBottom,
                                { toValue: 0, duration: 500, useNativeDriver: false }
                            ),
                            Animated.timing(
                                this.topControls.marginTop,
                                { toValue: 0, duration: 500, useNativeDriver: false }
                            ),
                        ])
                        // ])
                        .start(() => this.showControlsinProgress = false)
                    }
                } else {
                    Animated.timing(this.overlay.opacity, { toValue: 0.5, duration: 500, useNativeDriver: true }).start();
                    this.topControls.marginTop.setValue(0);
                    this.bottomControls.marginBottom.setValue(0);
                    this.centerButton.opacity.setValue(1);
                    this.overlay.opacity.setValue(0.5);
                }
            },
            hideControls: function({animated = true} = {}){
                this.controlsVisible = false;
                this.showControlsinProgress = false;
                if(animated){
                    if (!this.hideControlsinProgress) {
                        this.hideControlsinProgress = true;
                        props._closeQualityControl();
                        Animated.parallel([
                            Animated.timing(
                                this.overlay.opacity,
                                { toValue: 0, duration: 600, useNativeDriver: true }
                            ),
                            Animated.timing(
                                this.centerButton.opacity,
                                { toValue: 0, duration: 600, useNativeDriver: true }
                            ),
                            Animated.timing(
                                this.bottomControls.marginBottom,
                                { toValue: -95, duration: 600, useNativeDriver: false }
                            ),
                            Animated.timing(
                                this.topControls.marginTop,
                                { toValue: -65, duration: 600, useNativeDriver: false }
                            ),
                        ]).start(() => this.hideControlsinProgress = false)
                    }
                } else {
                    this.topControls.marginTop.setValue(-65);
                    this.bottomControls.marginBottom.setValue(-95);
                    this.centerButton.opacity.setValue(0);
                    this.overlay.opacity.setValue(0);
                    props._closeQualityControl();
                    // Animated.timing(this.overlay.opacity, { toValue: 0, duration: 500 }).start();
                }
            }
        };
    }
    componentDidMount () {
        // console.log("MOUNT VIDEO!")
        activateKeepAwake();
    }
    componentWillUnmount() {
        deactivateKeepAwake();
    }

    componentDidUpdate(prevProps, prevState) {
        //Сначала грузилось, потом перестало
        if (Boolean(prevProps.status.isLoaded) === false && this.props.status.isLoaded === true) {
            this.animations.hideControls();
            // if(Platform.OS === "ios"){
            //     this.playVideo()
            // }
        }
        if (prevProps.status.isBuffering === true && this.props.status.isPlaying === false) {
            this.animations.showControls({ animated: false });
        }
        // if (prevProps.status.isBuffering === false && this.props.status.isBuffering === true) {
        //     this.animations.showControls({animated: false});
        // }
    }
    playVideo = () => {
        const { _playVideo } = this.props;
        if (_playVideo) {
            _playVideo()
            if (!this.animations.hideControlsinProgress){
                this.animations.hideControls();
            } else {
                this.animations.showControls({animated: false});
            }
        }
    }

    pauseVideo = () => {
        const { _pauseVideo } = this.props;
        if (_pauseVideo) {
            _pauseVideo()
            this.animations.showControls({animated: false});
        }
    }

    handlePlayerTouch = () => {
        const { status } = this.props;
        // console.log("TOUCH PLAYER", status, this.animations.controlsVisible)
        if(status.isPlaying || status.durationMillis === status.positionMillis){
            if (!this.animations.controlsVisible){
                this.animations.showControls();
            } else {
                this.animations.hideControls();
            }
        }
    }

    renderCenterControls = () => {
        const { status, state, _replayVideo } = this.props;
        const { loading } =  state;
        // console.log("RENDER CENTER", status, loading)
        let props = {
        };
        if (!status.isLoaded || (status.isBuffering && !status.isPlaying && status.shouldPlay) || loading) {
            props.children = <Preloader />
        } else if (status.positionMillis === status.durationMillis) {
            props.onPress = _replayVideo
            props.children = <FontAwesome name={"repeat"} style={styles['video__center-icon']} />
        } else if (status.isLoaded && !status.isPlaying) {
            props.onPress = this.playVideo
            props.children = <FontAwesome name={"play"} style={styles['video__play-icon']} />
        } else {
            props.onPress = this.pauseVideo
            props.children = <FontAwesome name={"pause"} style={styles['video__center-icon']} />
        }
        const {onPress, ...rest} = props;
        // console.log("CENTER VIDEO OPACITY", this.animations.centerButton.opacity )       
        return (
            <TouchableWithoutFeedback onPress = {onPress}>
                <Animated.View
                    {...rest}
                    style={[
                        styles['video__center-button'],
                        { opacity: this.animations.centerButton.opacity }
                    ]}
                />
            </TouchableWithoutFeedback>
        )
    }

    getPlaybackTimeFromMS = (millis) => {
        return formatSecondsAsTimer(Math.floor(millis / 1000))
    }

    renderBottomControlls = () => {
        const { 
            _fullScreenToggle, 
            fullscreenButton = true, 
            state, 
            _pauseVideo, 
            _seekVideo, 
            _onSeekEnd,
            qualities,
            _toggleQualityControl,
            t,
            _changeVideoSRC,
            screenResize,
            _toggleResizeMode
        } = this.props;
        const { positionMillis = 0, durationMillis = 0 } = state.status;
        const { currentQuality, resizeMode} = state;
        const thumbProps = Platform.select({
            ios: {
                // thumbImage: require("../../../assets/core/slider_thumb.png")
            },
            android: {
                thumbTintColor: "#fff"
            }
        })

        return (
            <Animated.View
                style={[
                    styles['video__bottom-controls'],
                    { marginBottom: this.animations.bottomControls.marginBottom }
                ]}
            >
                <View style={styles['video__bottom-controls-inner']}>
                    {/* <View style={styles['video__controls__overlay']} /> */}
                    <View style={styles["video__bottom-controls__time__wrap"]}>
                        <Text style={styles["video__bottom-controls__time"]}>
                            {state.thumbPosition
                                ? this.getPlaybackTimeFromMS(state.thumbPosition)
                                : this.getPlaybackTimeFromMS(positionMillis)
                            }
                        </Text>
                        <Text style={styles["video__bottom-controls__time-separator"]}>
                            /
                    </Text>
                        <Text style={styles["video__bottom-controls__time"]}>
                            {this.getPlaybackTimeFromMS(durationMillis)}
                        </Text>
                    </View>
                    <View style={styles["video__bottom-controls__playback-wrap"]}>
                        <Slider
                            style={{ flex: 1 }}
                            step={100}
                            value={positionMillis}
                            minimumValue={0}
                            maximumValue={durationMillis}
                            minimumTrackTintColor={EStyleSheet.value("$accent")}
                            maximumTrackTintColor={EStyleSheet.value("$additionalColor")}
                            onSlidingStart={_pauseVideo}
                            onValueChange={_seekVideo}
                            onSlidingComplete={_onSeekEnd}
                            {...thumbProps}
                        />
                        <View style={styles["video__bottom-controls__quality"]}>
                            {qualities.length ? (
                                <>
                                    <TouchableOpacity onPress={_toggleQualityControl}>
                                        <FontAwesome name="cog" style={styles["video__bottom-controls__quality-icon"]} />
                                    </TouchableOpacity>
                                    {state.qualityOpenned && (
                                        <View style={styles["video__bottom-controls__quality-list"]}>
                                            <Text style={styles["video__bottom-controls__quality-label"]}>
                                                {t("app_basic:quality")}
                                            </Text>
                                            {qualities.map(({ res, src }) => (
                                                <TouchableOpacity onPress={() => _changeVideoSRC({ res, src })}>
                                                    <View
                                                        pointerEvents={'box-none'}
                                                        style={styles["video__bottom-controls__quality-option"]}
                                                    >
                                                        <FontAwesome
                                                            name="check"
                                                            style={[
                                                                styles["video__bottom-controls__quality-checked"],
                                                                ...(res === currentQuality ?
                                                                    [{ opacity: 1 }]
                                                                    : [])
                                                            ]}
                                                        />
                                                        <Text style={styles["video__bottom-controls__quality-res"]}>
                                                            {res}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ))}
                                        </View>
                                    )}
                                </>
                            ): null}
                        </View>
                        {fullscreenButton && (
                            <TouchableOpacity onPress={_fullScreenToggle}>
                                <Ionicons name="md-expand" style={styles['video__fullscreen-icon']} />
                            </TouchableOpacity>
                        )}
                        {screenResize && Platform.OS === "ios" ? (
                            <TouchableOpacity onPress={_toggleResizeMode}>
                                {resizeMode === Video.RESIZE_MODE_CONTAIN ? (
                                    <Ionicons name="md-expand" style={styles['video__fullscreen-icon']} />
                                ) : (
                                        <Ionicons name="md-contract" style={styles['video__fullscreen-icon']} />
                                    )}

                            </TouchableOpacity>
                        ): null}
                    </View>
                </View>
            </Animated.View>
        )
    }

    renderTopControls = () => {
        const {t, onClose} = this.props;
        return (
            <Animated.View
                style={[
                    styles['video__top-controls'],
                    { marginTop: this.animations.topControls.marginTop }
                ]}
            >
                {/* <View style={styles['video__controls__overlay']} /> */}
                <TouchableOpacity onPress={async () => {
                    if(onClose){
                        onClose();
                    }
                    Actions.pop()
                }}>
                    <View style={styles["video__back"]}>
                        <FontAwesome style={styles["video__back-icon"]} name="chevron-left" />
                        <Text style={styles["video__back-text"]}>
                            {t("app_basic:back_to_lesson")}
                        </Text>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        )
    }

    render(){
        const { videoView, controls = true, style = {}} = this.props;
        return (
            <View style={[styles['video'], style]}>
                    {videoView()}
                    {controls && (
                        <>
                            <TouchableWithoutFeedback onPress={this.handlePlayerTouch}>
                                <Animated.View style={[
                                    styles['video__controls__overlay'],
                                    { opacity: this.animations.overlay.opacity }
                                ]}/>
                            </TouchableWithoutFeedback>
                            {this.renderTopControls()}
                            {this.renderBottomControlls()}
                            {this.renderCenterControls()}
                        </>
                    )}
                    {/* <TouchableWithoutFeedback onPress={this.handlePlayerTouch}>
                        <Animated.View style={[
                            styles['video__controls__overlay'],
                            { opacity: this.animations.overlay.opacity }
                        ]}/>
                    </TouchableWithoutFeedback>

                    {controls && [
                        this.renderTopControls(),
                        this.renderBottomControlls(),
                        this.renderCenterControls(),
                    ]} */}
                {/* </View> */}
            {/* </TouchableWithoutFeedback> */}
            </View >


        )
    }
}


export default compose(
    Logic,
    withNamespaces(["app_basic"])
)(VideoTraining)
