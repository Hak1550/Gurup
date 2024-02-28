import React, { Component, Fragment } from "react"
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native"
import styles from "../styles"
import VideoTraining from "../../../components/VideoTraining"
import StepForwardIcon from "../../../assets/core/svg-icon/step-forward"
import PauseIcon from "../../../assets/core/svg-icon/pause"
import { formatSecondsAsTimer } from "../../../utils";
import { getPath, checkFile } from "../../../utils/downloads"
import Logic from "../logic"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EStyleSheet from "react-native-extended-stylesheet"
import moment from "moment";
import Preloader from  "../../../components/Preloader";
import Button from "../../../components/Button";
// import { Appearance, useColorScheme } from 'react-native-appearance';

const SingleVideoTraining = ({
	nextWorkout,
	nextWorkoutData,
	exercise,
	workout,
	timer,
	timerRef,
	videoTrainingRef,
	_play,
	_pause,
	_rewind,
	state,
	updateTimer,
	t,
	videoUrl
}) => {
	// console.log("SingleVideoTraining videoUrl", videoUrl);

	return (
		<SafeAreaView style={styles["s-video-training"]}>
			<View>
				<VideoTraining
					ref={videoTrainingRef}
					key={"workout-" + workout._id}
					shouldPlay
					isLooping
					// url={getPath(exercise._id, workout._id)}
					url={videoUrl}
					controls = {false}
					toggleResizeModeOnFullscreen={false}
					onVideoStatusUpdate={updateTimer}
				/>
				<View style={styles["s-video-training__control"]}>
					<TouchableOpacity
						style={styles["s-video-training__control-icon"]}
						onPress={() => {
							state.paused ? _play() : _pause()
						}}>
						{state.paused ? (
							<FontAwesome
								name={'play'}
								style={styles["play-icon"]}
							/>
						) : (
							// <PauseIcon color={EStyleSheet.value("$textColor")}/>
							<FontAwesome
								name={'pause'}
								style={styles["pause-icon"]}
							/>
						)}
						
					</TouchableOpacity>
					<TouchableOpacity
						style={styles["s-video-training__control-icon"]}
						onPress={_rewind}>
							<FontAwesome
								name={'history'}
								style={styles["rewind-icon"]}
							/>						
					</TouchableOpacity>
					{workout.meta_data && workout.meta_data.title ? (
						<Text style={styles["s-video-training__control-title"]}>{workout.meta_data.title}</Text>
					) : null}
					<TouchableOpacity style={styles["s-video-training__control-icon"]} onPress={nextWorkout}>
						{/* <StepForwardIcon color={EStyleSheet.value("$textColor")}/> */}
						<FontAwesome
							name={'forward'}
							style={styles["step-forward-icon"]}
						/>
					</TouchableOpacity>
				</View>
			</View>
			{workout.meta_data && workout.meta_data.description ? (
				<View style={styles["s-video-training__instructions"]}>
					<Text style={styles["s-video-training__instructions-text"]}>
						{workout.meta_data.description}
					</Text>
				</View>
			) : null}
			{workout && workout.meta_data ? (
				<View style={styles["s-video-training__info"]}>
					{workout.type == "bench" ? (
						<Text style={styles["s-video-training__repeats"]}>
							{workout.meta_data.repetitions} {t("app_courses:training_repetitions")}
						</Text>
					) : (
						<TrainingTime
							ref={timerRef}
							nextWorkout={nextWorkout}
							time={workout.meta_data.time}
							workout={workout}
							t={t}
						/>
					)}
				</View>
			) : null}

			<View style={styles["s-video-training__button"]}>
				<Button
					title={t("app_courses:training_next_button")}
					theme="accent"
					// icon="next"
					onPress={nextWorkout}
				/> 
			</View>
			{nextWorkoutData && nextWorkoutData.meta_data && nextWorkoutData.meta_data.title ? (
				<TouchableOpacity style={styles["s-video-training__next"]} onPress={nextWorkout}>
					<Text style={styles["s-video-training__next-text"]}>
						{t("app_courses:training_next")} {("" + nextWorkoutData.meta_data.title).toLowerCase()}
					</Text>
				</TouchableOpacity>
			) : null}
		</SafeAreaView>
	)
}
export default Logic(SingleVideoTraining)

class TrainingTime extends Component {
	state = {
		time: 0,
		pause: false,
		workout_id: null
	}
	
	componentWillUnmount = () => {
		try {
			clearInterval(this.timer)
		} catch (e) {
			console.error("ERROR IN CLEAR INTERVAL", e);
			
		}
	}
	onPause = () => {
		// console.log("timer on pause", this.state.pause)
		this.setState({ pause: true })
	}
	onPlay = () => {
		// console.log("timer on play", this.state.pause)
		this.setState({ pause: false })
	}
	clearTimer = () => {
		try {
			clearInterval(this.timer)
		} catch (e) {
			console.error("ERROR IN CLEAR INTERVAL", e);
			
		}
	}

	initTimer = () => {
		// console.log("init timer")
		try {
			// console.log("clear interval init")
			clearInterval(this.timer)
		} catch (e) {
			console.error("error in cler interval", e);
		}
		// TODO: Timer is garbage, not clearing interval
		this.timer = setInterval(() => {
			// console.log("timer timeout ", this.state.pause);
			if (this.state.pause) {
				return
			}
			if (this.state.time > 0) {
				try {
					this.setState({
						time: --this.state.time,
					})
				} catch (e) {}
			} else {
				try {
					clearInterval(this.timer)
				} catch (e) {
					console.error("error in clear interval", e);
					
				}
				this.props.nextWorkout()
			}
		}, 1000)
		// console.log("new timer set")
	}

	componentDidUpdate = prevProps => {
		if (!this.state.workout_id || this.state.workout_id !== this.props.workout._id) {
			this.setState({
				time: this.props.time,
				workout_id: this.props.workout._id
			})
			setTimeout(() => {
				this.initTimer()
			}, 100)
		}
	}
	
	componentDidMount = () => {
		// console.log("TIMER CDM")
		this.setState({
			time: this.props.time,
		})
	}

	formattedTime = () => {
		const {time} = this.state;
		return formatSecondsAsTimer(time)
	}
	
	render = () => {
		if (this.state.time){
			return (
				<Text style={styles["s-video-training__timer"]}>
					{this.formattedTime()}
				</Text>
			)
		} else {
			return <Preloader/>
		}

	}
}
