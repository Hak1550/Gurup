import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getExercise, getCourse, finishExercise } from "actions/courses"
import isLoading from "hocs/isLoading"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"
import exerciseHoc from "hocs/exerciseHoc/exerciseHoc"

export default WrapperComponent => {
	class Logic extends Component {
		constructor(props) {
			super(props)
		}

		render() {
			return (
				<WrapperComponent
					createRef={el => (this.props.scrollTopRef = el)}
					nextLesson={this.props.nextLesson}
					exerciseIndex={this.props.exerciseIndex}
					state={this.state}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["web_exercises","app_basic","basic"]),
		multipleLoading({
			branches: ["course", "exercise"],
		}),
		exerciseHoc,
		// connect(({ course, exercise }) => ({ course, exercise }))
	)(Logic)
}
