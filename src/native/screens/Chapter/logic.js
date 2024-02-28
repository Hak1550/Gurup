import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getExercises, getCourse } from "../../../actions/courses"
import isLoading from "../../../hocs/isLoading"
import {withNamespaces} from "react-i18next";

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props){
			super(props);
			this.state = {
				loading: true,
				course: {},
				exercises: []
			}
		}
		async componentDidMount() {
			const { navigation, dispatch } = this.props;
			this.setState({loading: true});
			const {course} =  await dispatch(getCourse(navigation.state.params.course_id, {populate: true}))
			const {exercises} = await dispatch(getExercises(navigation.state.params.course_id))
			this.setState({loading: false, course, exercises});
		}

		render() {
			const { navigation } = this.props;
			return <WrappedComponent
						course = {this.state.course}
						exercises = {this.state.exercises}
						course_id = {navigation.state.params.course_id}
						chapter_id = {navigation.state.params.chapter_id}
						loading = {this.state.loading} 
						{...this.props} 
					/>
		}
	}

	return compose(
		withNamespaces(["app_basic"], { wait: true }),
		connect(({ purchasedCourses }) => ({ purchasedCourses }))
	)(Logic)
}
