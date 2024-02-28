import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getExercises, getMarathon } from "actions/courses"
import multipleLoading from "hocs/multipleLoading"
import { withTheme } from "styled-components"
import moment from "moment"
import marathonHoc from "hocs/marathonHoc"
import { withNamespaces } from "react-i18next"
import withHelmet from "hocs/withHelmet";
import { findPurchasedCourse } from "utils/gurucan-helpers"

export default WrapperComponent => {
	class Logic extends Component {
		constructor() {
			super()
			this.state = {
				isModalVisible: false,
				charLimit: 400,
			}
		}

		componentDidMount() {
			const { match, dispatch, marathon, loading, history } = this.props
			const { course_id } = match.params
			if (course_id) {
				if(!marathon || !marathon.length) dispatch(getMarathon(course_id))
				dispatch(getExercises(course_id))
			}
			if (!loading.marathon && !marathon.allowed) {
				history.push("/challenges/"+course_id)
			}
		}

		isPurchased = () => {
			const { marathon, purchasedCourses } = this.props
			return purchasedCourses.find(pCur => pCur.course === marathon._id)
		}

		getLessonProgress = id => {
			const isPurchased = this.isPurchased()
			if (isPurchased) {
				const findEx = isPurchased.activeExercises.find(({ exerciseId }) => exerciseId === id)
				if (findEx && findEx.complete) {
					return true
				} else if (findEx && findEx.complete) {
					return "in_progress"
				} else {
					return false
				}
			}
		}

		exercisePermissionErrorToast = (code) => {
			const { dispatch } = this.props;
			console.log("CODE ON COURSE", code);
			dispatch({ type: "ERROR", code })
		}

		exerciseAllowed = exercise_id => {
			const { marathon, purchasedCourses } = this.props
			if (!marathon.exercisesAvailableWithoutProgress) {
				const pc = findPurchasedCourse(marathon._id, purchasedCourses)

				if (pc) {
					console.log("got pc");
					const pcLength = pc.activeExercises.length
					const findExerciseInPurchase = pc.activeExercises.findIndex(aex => aex.exerciseId === exercise_id)
					console.log("exercise_id", exercise_id,"findExerciseInPurchase", findExerciseInPurchase, "findExerciseInPurchase > -1", findExerciseInPurchase > -1);

					return findExerciseInPurchase > -1 || findExerciseInPurchase === null;
				} else {
					console.log("no pc");
				}
			} else {
				return true
			}
		}

		filterExerciseByDate = (exercises, selectedDate) => {
			return exercises.filter(ex => moment(ex.startDate).isSame(selectedDate, 'day'))
		}

		render() {
			return (
				<WrapperComponent
					getLessonProgress={this.getLessonProgress}
					isPurchased={this.isPurchased}
					filterExerciseByDate={this.filterExerciseByDate}
					state={this.state}
					exercisePermissionErrorToast={this.exercisePermissionErrorToast}
					exerciseAllowed={this.exerciseAllowed}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["web_marathons", "web_layout", "basic"]),
		withTheme,
		withHelmet(({marathon}) => ({title: marathon.title})),
		multipleLoading({
			branches: ['marathon', 'exercises']
			// status_path: ({ status }) => ({ status: {course: status.course, exercise: status.exercise} }),
		}),
		connect(({ exercises, tmp }) => ({ exercises, tmp }))
	)(marathonHoc(Logic))
}
