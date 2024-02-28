import React, { Component } from "react"
import {getExercise, finishExercise, getCourse, getExercises} from "../../../actions/courses"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import moment from "moment"
import isLoading from "../../../hocs/isLoading"
import { compose } from "redux"
import { withNamespaces } from "react-i18next";
import {getNextLessonPath} from "../../utils";
import {setPlansModalOptions} from "../../../actions/plans";
import {getMe} from "../../../actions/sign";

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			finishingExercise: false
		}
		
		async componentDidMount () {
			const { navigation, dispatch } = this.props
			const exercise_id = navigation.state.params._id;
			let exerciseData = await  dispatch(getExercise(exercise_id))
			if (exerciseData && exerciseData.status && exerciseData.status == "error"){
				Actions.pop()
			}
		}

		async componentDidUpdate(prevProps, prevState, snapshot) {
			const { navigation, dispatch } = this.props;
			const { navigation: prevNavigation } = prevProps;
			if(navigation.state.params._id !== prevNavigation.state.params._id){
				const exercise_id = navigation.state.params._id;
				let exerciseData = await dispatch(getExercise(exercise_id))
				if (exerciseData && exerciseData.status && exerciseData.status == "error"){
					Actions.pop()
				}
			}
		}

		componentWillUnmount() {
			const { dispatch } = this.props
			dispatch({
				type: "CLEAR_EXERCISE",
			})
		}

		isComplete(){
			const { exercise, navigation, purchasedCourses } = this.props;
			const course_id = navigation.state.params.course_id;
			const currentCourse = purchasedCourses.find(({course}) => course === course_id);
			if (exercise && currentCourse){
				const activeEx = currentCourse?.activeExercises?.find(({ exerciseId }) => exercise._id === exerciseId);
				return activeEx && activeEx.complete
			} else {
				return false
			}
		}

		isLastLesson = () => {
			const { exercise, exercises, navigation} = this.props;
			let exercisesQueue = exercises.slice().sort((a,b) => a.sort - b.sort);
			if(navigation?.state?.params?.chapter){
				exercisesQueue = navigation.state.params.chapter.exercises;
			}
			// console.log("Exercises queue in last lesson check", exercisesQueue);
			if (exercise && exercisesQueue && exercisesQueue.length){
				const currentLessonIndex = exercisesQueue.findIndex(item => item._id === exercise._id)
				const nextLesson = exercisesQueue[currentLessonIndex + 1]
				// console.log("last lesson???",nextLesson);
				return !nextLesson;
			} else {
				return false;
			}
		}

		
		goToNextLesson = async () => {
			const { dispatch, exercise, exercises, course, navigation } = this.props;
			const chapter = navigation?.state?.params?.chapter;
			const course_id = navigation.state.params.course_id;
			const nextScreenPath = getNextLessonPath({exercise, exercises, chapter, course_id})
			if(nextScreenPath){
				const {nextLesson, screen, stay} = nextScreenPath;
				if(stay){
					Actions.refresh(nextLesson);
					// await dispatch(getExercise(nextScreenPath?.nextLesson._id))
				} else if (nextLesson.allowed) {
					Actions.replace(screen, nextLesson);
				}
			}
		}

		finishExercise = async () => {
			const { dispatch, navigation, exercise } = this.props
			const {course_id, chapter} = navigation.state.params;
			this.setState({finishingExercise: true})
			await dispatch(finishExercise(course_id, exercise._id))
			this.setState({ finishingExercise: false })
			if(chapter && !this.isLastLesson()){
				this.goToNextLesson();
			} else {
				Actions.pop()
			}
		}

		goToChat = chat_id => {
			Actions.chat({
				_id: chat_id,
			})
		}

		render() {
			return (
				<WrappedComponent
					finishExercise={this.finishExercise}
					state={this.state}
					isLastLesson={this.isLastLesson()}
					isComplete={this.props.navigation.state.params.complete}
					isComplete={this.isComplete()}
					goToChat={this.goToChat}
					goToNextLesson={this.goToNextLesson}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(['app_marathon', 'app_basic'],{wait:true}),
		isLoading({
			status_path: ({ status }) => ({ status: status.exercise }),
		}),
		connect(({ marathon, exercise, exercises, purchasedCourses, me }) => ({ marathon, exercise, exercises, purchasedCourses, me }))
	)(Logic)
}
