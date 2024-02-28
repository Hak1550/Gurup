import React, { Component } from "react"
import { connect } from "react-redux"
import { Actions } from "react-native-router-flux"
import { compose } from "redux"
import { getExercise, finishExercise } from "../../../actions/courses"
import { withNamespaces } from "react-i18next"
import Button from "../../components/Button"
import {getNextLessonPath} from "../../utils";

export default WrappedComponent => {
	class Logic extends Component {
		restartTest = ({ back = false }) => {
			const { exercise, dispatch, onReset } = this.props
			dispatch({
				type: "REST_QUIZ",
			})
			if (onReset) onReset()
			// if (back) Actions.pop()
			// else Actions.replace("quiz", { _id: exercise._id })
		}


		goToNextLesson = async () => {
			const { dispatch, exercise, exercises, courseId, chapter, onReset } = this.props;
			const {nextAllowed} = await dispatch(finishExercise(courseId, exercise._id));
			const nextScreenPath = getNextLessonPath({exercise, exercises, chapter, course_id: courseId});
			if(nextScreenPath){
				const {nextLesson, screen} = nextScreenPath;
				if (nextAllowed && chapter) {
					Actions.replace(screen, nextLesson);
				} else {
					Actions.pop()
				}
			} else {
				Actions.pop()
			}

			if (exercise.type == "question" || exercise.type == "quiz") {
				dispatch({
					type: "REST_QUIZ",
				})
			}

			if (onReset) onReset()
		}

		buttons = (isSuccess) => {
			const { exercise, exercises, module, t} = this.props
			const currentLessonIndex = exercises.findIndex(item => item._id === exercise._id)
			const nextLesson = exercises[currentLessonIndex + 1]
			if (isSuccess) {
				if (nextLesson) {
					return <Button onPress={this.goToNextLesson} title={t("app_quiz:continue_button")} />
				} else {
					return <Button onPress={this.goToNextLesson} title={t("app_quiz:finish_button")} />
				}
				// if (module === 'marathon')  return <Button onPress={this.goToNextLesson} title={t("app_quiz:continue_button")}/>
			} else {
				return <Button onPress={this.restartTest} title={t("app_quiz:try_again")} />
			}
		}

		render() {
			const { quiz, exercise } = this.props;
			let isSuccess = false
			if (exercise.minPercent!==undefined) {
				isSuccess = exercise.minPercent <= (quiz.score / exercise.blocks.length) * 100
			} else {
				isSuccess = exercise.blocks.length === quiz.score
			}
			return (
				<WrappedComponent
					isSuccess={isSuccess}
					restartTest={this.restartTest}
					buttons={this.buttons}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces("app_quiz", { wait: true }),
		connect(({ exercise, exercises, course, quiz, marathon }) => ({ exercise, exercises, course, quiz, marathon }))
	)(Logic)
}
