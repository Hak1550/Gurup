import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getCourse, getExercises, startCourse } from "actions/courses"
import multipleLoading from "hocs/multipleLoading"
import exerciseHoc from "hocs/exerciseHoc/exerciseHoc"
import { withTheme } from "styled-components"
import { withNamespaces } from "react-i18next"

export default WrapperComponent => {
	class Logic extends Component {
		constructor() {
			super()
			this.state = {
				isModalVisible: false,
				charLimit: 400,
			}
		}

		render() {
			return (
				<WrapperComponent
					getReadMoreContent={this.getReadMoreContent}
					getLessonProgress={this.getLessonProgress}
					isPurchased={this.isPurchased}
					startCourse={this.startCourse}
					state={this.state}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withTheme,
		withNamespaces(["courses", "app_courses", "basic"]),
		multipleLoading({
			branches: ['course', 'exercise', 'marathon']
		}),
		connect(({ course, exercise }) => ({ course, exercise }))
	)(exerciseHoc(Logic))
}
