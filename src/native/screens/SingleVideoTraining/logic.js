import React, { Component } from "react";
import { View, Text, Image} from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
// import { compose } from "../../../../../../Library/Caches/typescript/3.3/node_modules/redux";
import { compose } from "redux"
import { withNamespaces } from "react-i18next";
import {downloadTraining, checkLoaded, removeTraining, checkFile, getPath} from '../../utils/downloads.js';

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props){
			super(props);
			this.state = {
				currentWorkout: 0,
				paused: false,
				left: 0,
				interval: null,

				nextWorkout:null,
				workout:null,
				videoUrl:null
			}
			this.timer = React.createRef();
		}

		nextWorkout = () => {
			const { exercise, navigation } = this.props;
			const course_id = navigation.state.params.course_id;
            const chapter = navigation.state.params.chapter;
			
			let nextWorkout = null;
			if (exercise && exercise.blocks && exercise.blocks.length) {
				if (exercise.blocks[this.state.currentWorkout + 1]) {
					nextWorkout = exercise.blocks[this.state.currentWorkout + 1];
				}
			}

			this.updateTrainingUrl();
			// console.log("NEXT!!!");

			if (nextWorkout) {
				// console.log("NEXT WORKOUT............");

				this.setState({
					currentWorkout: this.state.currentWorkout + 1,
				});
			} else {
				if(this.timer.current){
					this.timer.current.clearTimer();
				}
				Actions.replace("trainingFinish", { _id: exercise._id, course_id: course_id, chapter });
			}
		};

		updateTimer = (status) => {
			if(this.timer.current){
				if (status.isPlaying == false && this.timer.current.onPause) {
					this.timer.current.onPause()
				} else if (status.isPlaying == true && this.timer.current.onPlay) {
					this.timer.current.onPlay()
				}
			}
		}

		_play = () => {
			// console.log("Timer ref", this.timer);
			// this.timer.current.onPlay()
			this.videoTraining._playVideo();
			this.setState({paused: false})
		};

		_pause = () => {
			this.videoTraining._pauseVideo();
			this.setState({ paused: true })
		};

		_rewind = () => {
			this.videoTraining._offsetSeek(-5000);			
		}
		componentDidMount = () => {
			// console.log("svt cdm ", this.state.left);
			this.updateTrainingUrl();			
		};

		updateTrainingUrl = async ()=>{
			// console.log("updateTrainingUrl 1");
			const { exercise, t } = this.props;
			let workout = null;
			let videoUrl = null;
			let nextWorkout = null;
			if (exercise && exercise.blocks && exercise.blocks.length) {
				workout = exercise.blocks[this.state.currentWorkout];
				if (exercise.blocks[this.state.currentWorkout + 1]) {
					nextWorkout = exercise.blocks[this.state.currentWorkout + 1];
				}
			}
			if(workout){
				// console.log("checkFile 1");
				let fileData = await checkFile(getPath(exercise._id, workout._id))
				// console.log("checkFile 2 ",fileData);
				if(fileData){
					videoUrl = getPath(exercise._id, workout._id)
				}else if(workout.data){
					// console.log("USING web url")
					videoUrl = workout.data;
				}
			}
			// console.log("videoUrl => ",videoUrl);
			// console.log("updateTrainingUrl 2");
			this.setState({
				workout,
				nextWorkout,
				videoUrl
			})
		}
		

		render() {
			// console.log("SVT logic")
			// console.log("Timer in logic", this.timer);
			const { exercise, t } = this.props;
			let {workout, nextWorkout, videoUrl} = this.state;

			if(!workout || !videoUrl){
				return(
					<View
						style={{
							flex: 1,
							justifyContent: "center",
							alignItems: "center",
						}}>
						<Image
							resizeMode='contain'
							source={require("../../assets/core/no-messages.png")}
							style={{ width: 180, height: 180 }}
						/>
						<Text
							style={{
								width: "100%",
								textAlign: "center",
								fontSize: 20,
							}}>
							{t("app_courses:no_workout")}
						</Text>
					</View>
				);
			}


			return (
				<WrappedComponent
					updateTimer={this.updateTimer}
					nextWorkoutData={nextWorkout}
					nextWorkout={this.nextWorkout}
					workout={workout}
					timer={this.timer.current}
					videoTrainingRef={ref => {
						this.videoTraining = ref;
					}}
					videoUrl={videoUrl}
					_rewind={this._rewind}
					_play={this._play}
					_pause={this._pause}
					timerRef={this.timer}
					state={this.state}
					{...this.props}
				/>
			);
		}
	}

	// return connect(({ exercise }) => ({ exercise }))(Logic);
	return compose(
		withNamespaces(["app_courses"], { wait: true }),
		connect(({ exercise }) => ({ exercise }))
	)(Logic);
};
