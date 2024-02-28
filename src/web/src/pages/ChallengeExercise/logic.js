import React from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import {withRouter} from 'react-router-dom'
import multipleLoading from "hocs/multipleLoading"
import { getMarathon } from "actions/courses"
import marathonHoc from "hocs/marathonHoc"
import exerciseHoc from "hocs/exerciseHoc/exerciseHoc"
import { withNamespaces } from "react-i18next"

export default WrappedComponent => {
	class Logic extends React.Component {
		componentDidMount() {
			const { marathon, dispatch, match} = this.props
			const { course_id } = match.params
			if (course_id) {
				if (!marathon) dispatch(getMarathon(course_id))
			}
		}

		render() {
			return <WrappedComponent {...this.props} />
		}
	}
	return compose(
		withNamespaces(['app_basic', "web_layout", "web_marathons", "basic"]),
		withRouter,
		marathonHoc,
		exerciseHoc,
	)(Logic)
}
