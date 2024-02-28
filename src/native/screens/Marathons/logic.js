import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getMarathons } from "../../../actions/courses";
import isLoading from "../../../hocs/isLoading";
import { withNamespaces } from "react-i18next";

export default WrapperComponent => {
	class Logic extends Component {
		componentDidMount() {
			const { dispatch } = this.props;
			dispatch(getMarathons());
		}

		getProgress = course => {
			const { purchasedCourses } = this.props;
			const purchasedCourse = purchasedCourses.find(purchasedCourse => purchasedCourse.course === course._id);
			if(purchasedCourse && purchasedCourse.activeExercises) {
				return (
					purchasedCourse.activeExercises.filter(({ complete }) => complete).length /
					course.exercises.length
				);
			} else {
				return 0;
			}
		};

		_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

		render() {
			return (
				<WrapperComponent
					getProgress={ this.getProgress }
					_toggleModal={ this._toggleModal }
					state={ this.state }
					{ ...this.props }
				/>
			);
		}
	}

	return compose(
		isLoading({
			status_path: ({status}) => ({status: status.marathons}),
		}),
		withNamespaces(["courses", "app_courses", "app_marathon"], { wait: true }),
		connect(({ courses, purchasedCourses, tags, marathons, influencer }) => ({ courses, purchasedCourses, tags, marathons, influencer })),
	)(Logic);
};
