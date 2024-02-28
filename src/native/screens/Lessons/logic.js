import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getExercises, getCourse } from "../../../actions/courses"
import {withNamespaces} from "react-i18next";

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props){
			super(props);
			this.state = {
				loading: true
			}
		}
		async componentDidMount() {
			const { navigation, dispatch } = this.props
			this.setState({loading: true});
			await dispatch(getCourse(navigation.state.params._id))
			await dispatch(getExercises(navigation.state.params._id))
			this.setState({loading: false});
		}

		componentWillUnmount() {
			const {dispatch} = this.props
			dispatch({
				type: 'CLEAR_EXERCISES'
			})
		}

		render() {
			return <WrappedComponent loading = {this.state.loading} {...this.props} />
		}
	}

	return compose(
		withNamespaces(["app_basic"], { wait: true }),
		connect(({ course, exercises, purchasedCourses }) => ({ course, exercises, purchasedCourses }))
	)(Logic)
}
