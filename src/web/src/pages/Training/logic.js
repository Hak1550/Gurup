import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"
import exerciseHoc from "hocs/exerciseHoc/exerciseHoc"
import { CircularProgressbarWithChildren } from "react-circular-progressbar"
import { TimerText, RepeatContainer, RepeatQuantity, RepeatMeasur, RepeatInstruction } from "./styles"
export default WrapperComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props);
			this.timer = React.createRef();
			this.state = {
				playing: false,
				trainingsFinish: false,
				timerProgress: 100,
			}
		};
		onTick= ({total})  => {
			const trainingIndex = this.trainingIndex();
			const { loading, exercise } = this.props;
			const training = !loading.exercise && exercise.blocks[trainingIndex];
			const timerProgress = (parseInt(total) / (parseInt(training.meta_data.time) * 1000)) * 100;
			this.setState({timerProgress});
		};

		onTimerComplete = () => {
			this.setState({timerProgress: 0});
			this.pause();
		};

		trainingIndex = () => {
			const { loading, exercise, match } = this.props;
			const { training_id } = match.params;
			if (!loading.exercise) {
				return exercise.blocks.findIndex(tr => tr._id === training_id)
			}
		};

		play = () => {
			this.setState({ playing: true, startDate: Date.now() })
		};

		pause = () => {
			this.setState({ playing: false })
		};

		resetTrainingState = () => {
			if(this.timer.current) {
				// console.log("TIMER STATE", this.timer);
				// this.timer.current.reset();
			}
			this.setState({
				playing: false,
				timerProgress: 100,
			});
		};
		// timer = () => {
		// 	return (
		// 		<div style={{ width: "147px", height: "auto", margin: "45px auto 0" }}>
		// 			<CircularProgressbarWithChildren value={60} strokeWidth={14}>
		// 				<TimerText>15:00</TimerText>
		// 			</CircularProgressbarWithChildren>
		// 		</div>
		// 	)
		// }

		goToNextTraining = () => {
			const { exercise, history, course, loading } = this.props;
			const currentTrainIndex = this.trainingIndex();
			if (!loading.exercise && !loading.course) {
				const nextTrain = exercise.blocks[currentTrainIndex + 1];
				if (nextTrain) {
					this.resetTrainingState();
					history.replace(`/courses/${course._id}/exercises/training/${exercise._id}/${nextTrain._id}`)
				} else {
					this.setState({trainingsFinish: true})
				}
			}
		};


		render() {
			const trainingIndex = this.trainingIndex();
			return (
				<WrapperComponent
					createRef={el => (this.props.scrollTopRef = el)}
					nextLesson={this.props.nextLesson}
					play={this.play}
					timer={this.timer}
					pause={this.pause}
					goToNextTraining={this.goToNextTraining}
					trainingIndex={trainingIndex}
					exerciseIndex={this.props.exerciseIndex}
					state={this.state}
					onTick = {this.onTick}
					onTimerComplete = {this.onTimerComplete}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["web_trainings, app_courses", "basic"]),
		multipleLoading({
			branches: ["course", "exercise"],
		}),
		connect(({ course, exercise }) => ({ course, exercise }))
	)(exerciseHoc(Logic))
}
