import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getPlan, buyPlan } from "actions/plans"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"

export default WrapperComponent => {
	class Logic extends Component {

		state = {

		}

		componentDidMount() {
		}

		render() {
			return (
				<WrapperComponent
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["basic", "app_courses", "web_basic", "web_layout", "pricing", "website_landing"]),
		multipleLoading({
			branches: ['plan']
		}),
		connect(({ plan, influencer }) => ({ plan, influencer }))
	)(Logic)
}
