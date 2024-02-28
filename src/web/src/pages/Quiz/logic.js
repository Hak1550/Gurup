import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"
import exerciseHoc from "hocs/exerciseHoc/exerciseHoc"

import { withTheme } from "styled-components"

export default WrapperComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props)
			this.state = {
				isTrue: null,
				activeAnswer: null,
			}
		}

		setAnswer = (isTrue, activeAnswer) => {
			this.setState({ isTrue, activeAnswer })
		}

		componentWillUnmount() {
			this.props.dispatch({ type: "REST_QUIZ" })
		}

		nextQuestion = (needToSkip) => {
			const { dispatch } = this.props
			dispatch({
				type: "ANSWER_QUESTION",
				score: this.state.isTrue || needToSkip ? 1 : 0,
			})
			this.setState({ isTrue: null, activeAnswer: null })
		}

		restartQuiz = () => {
			this.props.dispatch({ type: "REST_QUIZ" })
		}

		render() {
			return (
				<WrapperComponent
					createRef={el => (this.props.scrollTopRef = el)}
					nextLesson={this.props.nextLesson}
					exerciseIndex={this.props.exerciseIndex}
					setAnswer={this.setAnswer}
					restartQuiz={this.restartQuiz}
					nextQuestion={this.nextQuestion}
					state={this.state}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["app_basic", "web_quiz", "app_quiz", "courses", "basic"]),
		withTheme,
		multipleLoading({
			branches: ["course", "exercise"],
		}),
		connect(({ course, exercise, quiz }) => ({ course, exercise, quiz }))
	)(exerciseHoc(Logic))
}
