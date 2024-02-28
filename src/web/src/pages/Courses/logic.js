import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withRouter } from "react-router-dom"
import { getCourses, getMarathons } from "actions/courses"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {

		state = { loading: true }

		componentDidMount = async () => {
			const { dispatch, coursesType } = this.props
			if(coursesType === "courses") {
				await dispatch(getCourses())
			} else if(coursesType === "challenges") {
				await dispatch(getMarathons())
			}
			this.setState({
				loading: false,
			})
		}

		openModal = (e) => {
			e.preventDefault()
			let { dispatch } = this.props
			dispatch({
				type: "TOGGLE_MODAL",
				data: {
					name: "not_allowed",
				},
			})
		}

		getCourses = (params) => this.props.dispatch(getCourses(params));

		render() {
			let filter
			let { loading } = this.state
			let { coursesType, tags, courses, ...rest } = this.props
			if(coursesType === "courses") {
				filter = {
					fetchData: this.getCourses,
					tags,
				}
			}
			return (
				<WrapperComponent
					getProgress={ this.getProgress }
					_toggleModal={ this._toggleModal }
					coursesType={ coursesType }
					state={ this.state }
					filter={ filter }
					courses={ loading ? [] : courses }
					openModal={ this.openModal }
					{ ...rest }
				/>
			)
		}
	}

	return compose(
		withNamespaces(["web_courses", "web_layout", "web_basic", "basic"]),
		withRouter,
		withHelmet(() => ({ title: 'courses_title' }), ['web_layout']),
		multipleLoading({
			branches: ["courses", "marathons"],
		}),
		connect(({ courses, purchasedCourses, tags, marathons }) => ({ courses, purchasedCourses, tags, marathons })),
	)(Logic)
}
