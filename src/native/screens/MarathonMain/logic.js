import { connect } from "react-redux"
import { compose } from "redux"
import React, { Component } from "react"
import { getMarathon, getExercises } from "../../../actions/courses"
import isLoading from "../../../hocs/isLoading"
import Preloader from "../../components/Preloader"
import moment from "moment"
import { withNamespaces } from "react-i18next"
import { Actions } from "react-native-router-flux"

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			selectedDate: moment()
				.utc()
				.startOf("day")
				.toDate(),
		}

		async componentDidMount() {
			const { dispatch, navigation } = this.props;
			// const response = await dispatch(getMarathon(navigation.state.params._id));
			const response = await dispatch(getMarathon(navigation.state.params._id));
			dispatch(getExercises(navigation.state.params._id));
			if(response.status === "error" && response.code === "USER_EXPELLED"){
				dispatch({
					type: "ERROR",
					code: response.code
				})
				Actions.pop();
			}
		}

		_onSelectDate = date => {
			// console.log("ON DATE SELECT", date)
			this.setState({
				selectedDate: date.toDate(),
				// selectedDate: date,

			})
		}

		getProgress = course => {
			const { purchasedCourses } = this.props
			const purchasedCourse = purchasedCourses.find(purchasedCourse => purchasedCourse.course === course._id)
			if (purchasedCourse && purchasedCourse.activeExercises) {
				return (
					purchasedCourse.activeExercises.filter(({ complete }) => complete).length / course.exercises.length
				)
			} else {
				return 0
			}
		}

		goToLesson = ex => {
			const { marathon, dispatch } = this.props
			const isAccessed = moment(ex.startDate).isSameOrBefore(moment(), "day")

			if (!isAccessed) dispatch({ type: "ALERT", text: this.props.t("app_marathon:too_early") })
			if (isAccessed) {
				if (ex.type === "quiz") {
					Actions.quiz({
						_id: ex._id,
						course_id: marathon._id,
					})
				} else if (ex.type === "training") {
					Actions.trainings({
						_id: ex._id,
						course_id: marathon._id,
					})
				} else {
					Actions.marathonSingle({
						_id: ex._id,
						course_id: marathon._id,
						marathon: true,
						complete: this.isCompleteExercise(ex._id),
					})
				}
			}
		}

		findMarathonAmongPurchased = () => {
			const { purchasedCourses, marathon } = this.props
			return purchasedCourses.findIndex(purCourse => purCourse.course === marathon._id)
		}

		isCompleteExercise = ex_id => {
			const { purchasedCourses, marathon } = this.props
			const purchCourse = this.findMarathonAmongPurchased()
			if (purchCourse !== -1 && purchasedCourses[purchCourse]) {
				const findEx = purchasedCourses[purchCourse].activeExercises.find(ae => ae.exerciseId === ex_id)
				if (findEx && findEx.hasOwnProperty("complete")) {
					return findEx.complete
				} else {
					return false
				}
			}
		}

		isCompleteMarathon = () => {
			const { purchasedCourses, marathon } = this.props
			const purchCourse = this.findMarathonAmongPurchased()
			// console.log("purchCourse", purchCourse, purchasedCourses)
			if (purchCourse !== -1 && purchasedCourses[purchCourse]) {
				const completeExercise = purchasedCourses[purchCourse].activeExercises.filter(ae => ae.complete)
				const allExercise = purchasedCourses[purchCourse].activeExercises
				if (moment().isSameOrBefore(moment(marathon.finishDate), "day")) {

					return "marathon_not_finish"
				} else if (
					completeExercise.length !== allExercise.length &&
					moment().isSameOrAfter(moment(marathon.finishDate), "day")
				) {

					return "fail"
				} else if (
					completeExercise.length === allExercise.length &&
					moment().isSameOrAfter(moment(marathon.finishDate), "day")
				) {

					return "complete"
				}
			}
		}

		render() {
			const { loading, marathon, exercises, purchasedCourses } = this.props
			const { selectedDate } = this.state
			let dailyExercises = exercises.length
				? exercises.filter(ex => {
						return !!(
							moment(ex.startDate).isSame(selectedDate,"day")
							// && moment(ex.startDate).isAfter(moment(selectedDate))
							// && moment(ex.startDate).isBefore(moment(selectedDate).add(1, "days"))
						)
				  })
				: null
			let days = []
			if (exercises.length) {
				exercises.forEach(ex => {
					let dayFound = false
					days.forEach(d => {
						if (moment(ex.startDate).isSame(moment(d.date), "day")) {
							d.exercises.push(ex)
							dayFound = true
						}
					})
					if (!dayFound) {
						days.push({
							date: moment(ex.startDate)
								.utc()
								.startOf("day"),
							exercises: [ex],
						})
					}
				})

				days.forEach(d => {
					let complete = false
					d.exercises.forEach(ex => {
						purchasedCourses.forEach(pc => {
							if (pc.course === marathon._id) {
								pc.activeExercises.forEach(aex => {
									if (aex.exerciseId === ex._id) {
										complete = !!aex.complete
									}
								})
							}
						})
					})
					if (complete) {
						d.dots = [
							{
								key: Math.random(),
								color: "#36E49B",
								// selectedDotColor: "green",
							},
						]
					} else {
						d.dots = [
							{
								key: Math.random(),
								color: "tomato",
								// selectedDotColor: "green",
							},
						]
					}
				})
			}

			return (
				<WrappedComponent
					dailyExercises={dailyExercises}
					_onSelectDate={this._onSelectDate}
					set={this.set}
					markedDays={days}
					isCompleteExercise={this.isCompleteExercise}
					goToLesson={this.goToLesson}
					state={this.state}
					isCompleteMarathon={this.isCompleteMarathon()}
					progress={this.getProgress(marathon)}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_marathon"]),
		isLoading({
			status_path: ({ status }) => ({ status: status.marathon }),
		}),
		connect(({ courses, marathon, exercise, exercises, purchasedCourses }) => ({
			courses,
			marathon,
			exercise,
			exercises,
			purchasedCourses,
		}))
	)(Logic)
}
