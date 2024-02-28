import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { finishExercise, getCourse, getExercise, getExercises } from "actions/courses"
import multipleLoading from "hocs/multipleLoading"
import { withRouter } from "react-router-dom"
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {
		async componentDidMount() {
			const { dispatch, match, course, exercises, history } = this.props

			let exercise
			const { exercise_id, course_id, training_id } = match.params
			if(exercise_id || training_id) {
				let data = await dispatch(getExercise(exercise_id))
				if (!data || data.status === "error") {
					history.push("/courses/" + course_id)
				} else {
					exercise = data.exercise
				}
			}
			if(!course || !course.length) {
				let data = await dispatch(getCourse(course_id))
				if (!data ||data.status === "error") {
					history.push("/courses/"+course_id)
				} else {
					if ((exercise_id || training_id) && exercise && exercise.startDate && data.course.type === "marathon") {
						dispatch({
							type: "SET_MARATHON_DATE",
							marathonActiveDate: exercise.startDate,
							init: true
						})
					}
				}
			}
			if(!exercises || !exercises.length) {
				let data = await dispatch(getExercises(course_id))
				if (!data ||data.status === "error") {
					history.push("/courses/" + course_id)
				}
			}
		}

		componentDidUpdate(prevProps) {
			if(
				prevProps.match.params.exercise_id !==
				this.props.match.params.exercise_id
			) {

				this.props.dispatch(getExercise(this.props.match.params.exercise_id))
				this.scrollToTop()
			}
		}

		scrollToTop = () => {
			if (this.scrollTopRef) {
				this.scrollTopRef.scrollIntoView()
			}
		}

		exerciseIndex = () => {
			const { course, exercise, exercises, loading } = this.props
			if(!loading.course && !loading.exercise) {
				return exercises.findIndex(ex => ex._id === exercise._id)
			} else {
				return null
			}
		}

		nextLesson = (trialEnd) => {
			const {
				exercise,
				exercises,
				dispatch,
				course,
				loading,
				history,
			} = this.props
			if(!loading.course && !loading.exercise) {
				const lengthExercisesInCourse = exercises.length
				const exerciseIndex = this.exerciseIndex()
				const courseType = course.type === "course" ? "courses" : "challenges"
				console.log("courseType", courseType)
				if(courseType === 'challenges') {
					return dispatch(finishExercise(course._id, exercise._id)).then(() => {
						let nextTask = exercises[exerciseIndex + 1]
						if (nextTask && nextTask.allowed) {
							dispatch({
								type: "SET_MARATHON_DATE",
								marathonActiveDate: nextTask.startDate
							})
							history.push(`/challenges/${course._id}/exercises/${nextTask.type}/${nextTask._id}`)
							console.log(" nextTask.startDate", nextTask.startDate);
							
							
						} else {
							history.replace(`/challenges/${course._id}/exercises`)
						}
					})
				}
				if(exerciseIndex + 1 < lengthExercisesInCourse && !trialEnd) {
					dispatch(finishExercise(course._id, exercise._id)).then(() => {
						const link = `/${ courseType }/${ course._id }/exercises/${ exercises[exerciseIndex + 1].type }/${ exercises[exerciseIndex + 1]._id }`
						history.replace(link)
					})
				} else {
					dispatch(finishExercise(course._id, exercise._id)).then(() => {
						history.push(`/${ courseType }/${ course._id }/exercises/`)
					})
				}
			}
		}

		render() {
			return (
				<WrapperComponent
					createRef={ el => (this.scrollTopRef = el) }
					nextLesson={ this.nextLesson }
					exerciseIndex={ this.exerciseIndex }
					{ ...this.props }
				/>
			)
		}
	}

	return compose(
		withRouter,
		multipleLoading({
			branches: ["course", "exercise", "marathon", "exercises"],
		}),
		withHelmet(({exercise}) => ({title: exercise.title, description: exercise.description})),
		connect(({ course, purchasedCourses, exercise, exercises }) => ({
			course,
			exercise,
			exercises,
			purchasedCourses,
		})),
	)(Logic)
};
