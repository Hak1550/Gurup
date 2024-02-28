import React, { Component } from "react"
import { connect } from "react-redux"
import { getCourses } from "../../../actions/courses"
import { withNamespaces } from "react-i18next"
import { compose } from "redux"
import { getTags } from "../../../actions/tags"

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			activeTag: "",
		}

		componentDidMount = () => {
			const { dispatch } = this.props
			dispatch(getTags())
		}

		filterData = tagId => {
			const { dispatch, fetchData, callback } = this.props
			// console.log("tagId :", tagId)
			tagId ? dispatch(fetchData({ tags: [tagId] })) : dispatch(fetchData())
			this.props.toggleModal()
			this.setState({ activeTag: tagId })


			if(callback){
				callback({tagId})
			}
			// dispatch({
			//   type: 'SET_ACTIVE_TAG',
			//   activeTag: tagId
			// })
		}

		render() {
			const activeClassAll = !this.state.activeTag ? "-active" : ""
			return (
				<WrappedComponent
					state={this.state}
					filterData={this.filterData}
					activeClassAll={activeClassAll}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces("app_courses", { wait: true }),
		connect(({ tags }) => ({ tags }))
	)(Logic)
}
