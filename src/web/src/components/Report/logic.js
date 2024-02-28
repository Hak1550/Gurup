import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next"

import {sendReport} from 'actions/courses'

export default WrapperComponent => {
	class Logic extends Component {

		sendReport = (report) => {
			let {dispatch, course, exercise} = this.props
			console.log("report", report);
			dispatch(sendReport(course._id, exercise._id, report))
		}

		render() {
			return (
				<WrapperComponent
					{...this.props}
					sendReport={this.sendReport}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["web_exercises"]),
		connect(({ course, exercise, purchasedCourses }) => ({ course, exercise, purchasedCourses}))
	)(Logic);
};
