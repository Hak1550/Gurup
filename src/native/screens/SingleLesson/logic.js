import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getExercise, finishExercise, getExercises } from "../../../actions/courses"
import { togglePlansModal, setPlansModalOptions } from "../../../actions/plans"
import isLoading from "../../../hocs/isLoading"
import { Actions } from "react-native-router-flux"
import { withNamespaces } from "react-i18next"

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props)
		}

		state = {
			loaded: false,
		}

		componentDidMount() {
			const { navigation, dispatch, course } = this.props
			dispatch(getExercise(navigation.state.params._id)).then(() => this.setState({ loaded: true }))
			dispatch(setPlansModalOptions({ afterPurchase: () => dispatch(getExercises(course._id)) }))
		}

		goToNextLesson = async () => {
			const { dispatch, exercise, exercises, course, navigation } = this.props
			const currentLessonIndex = exercises.findIndex(item => item._id === exercise._id)
			const nextLesson = exercises[currentLessonIndex + 1]
			const course_id = course._id

			// if (!nextLesson) {
			// 	await dispatch(finishExercise(course_id, exercise._id))
			// 	Actions.pop()
			// 	return
			// }

			if (nextLesson.allowed) {
				await dispatch(finishExercise(course_id, exercise._id))
				await dispatch(getExercise(nextLesson._id))
				//.then(this.scrollView.current.scrollTo({ x: 0, y: 0, animated: false }))
				if (nextLesson.type === "training") {
					Actions.replace("trainings", { _id: nextLesson._id, course_id: course_id })
				} else if (nextLesson.type === "question" || nextLesson.type === "quiz") {
					Actions.replace("quiz", { _id: nextLesson._id, course_id: course_id })
				} else if (nextLesson.type !== exercise.type) {
					Actions.replace("lesson", { course_id: course_id, _id: nextLesson._id })
				}
			} else {
				dispatch(togglePlansModal(true))
			}

			if (exercise.type == "question" || exercise.type == "quiz") {
				dispatch({
					type: "REST_QUIZ",
				})
			}
			/*
            //Backup
            const { dispatch, exercise, exercises, openPlansModal, navigation,course  } = this.props;
            const currentLessonIndex = exercises.findIndex(item => item._id == exercise._id);
            const nextLesson = exercises[currentLessonIndex + 1];


            const course_id = course._id;

            console.log('naviagtion', navigation.state.params);
            console.log("exercises", exercises, "NEWLESSON => ", nextLesson)
            
            
            if (nextLesson && nextLesson.allowed) {
                await dispatch(finishExercise(course_id, exercise._id));
                dispatch(getExercise(nextLesson._id)).then(this.scrollView.current.scrollTo({ x: 0, y: 0, animated: false }))
            } else {
                openPlansModal();
            }
            */
		}

		finishCourses = () => {
			const { dispatch, exercise, navigation, course } = this.props
			// console.error("course_id in fc ",navigation.state.params.course_id);
			const course_id = course && course._id ? course._id : navigation.state.params.course_id;
			
			dispatch(finishExercise(course_id, exercise._id))
			Actions.pop()
			// Actions.replace("lessons", { _id: navigation.state.params.course_id })
		}

		render() {
			const { exercise, exercises, course, purchasedCourses } = this.props
			const currentLessonIndex = exercises.findIndex(item => item._id === exercise._id)
			const nextLesson = exercises[currentLessonIndex + 1]
			let purchasedExercise = null
			if (purchasedCourses && purchasedCourses.length) {
				let purchasedCourse = purchasedCourses.find(c => {
					return "" + c._id == "" + course._id
				})
				if (purchasedCourse && purchasedCourse.activeExercises && purchasedCourse.activeExercises.length) {
					purchasedExercise = purchasedCourse.activeExercises.find(ax => {
						return "" + ax._id == "" + exercise._id
					})
				}
			}

			return (
				<WrappedComponent
					goToNextLesson={this.goToNextLesson}
					finishCourses={this.finishCourses}
					currentLessonIndex={currentLessonIndex}
					nextLesson={nextLesson}
					state={this.state}
					purchasedExercise={purchasedExercise}
					toggleReport={() => {
						this.setState({ reportOpened: !this.state.reportOpened })
					}}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		isLoading({
			status_path: ({ status }) => ({ status: status.exercise }),
		}),
		withNamespaces(["app_courses"], { wait: true }),
		connect(({ exercise, exercises, course, purchasedCourses }) => ({ exercise, exercises, course }))
	)(Logic)
}
