import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import {withRouter} from 'react-router';
import { getArticle } from "actions/articles"
import multipleLoading from "hocs/multipleLoading"
import { withNamespaces } from "react-i18next"
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {

		componentDidMount() {
			const {dispatch,match} = this.props
			dispatch(getArticle(match.params.article_id));
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
		withNamespaces(["basic"]),
		withRouter,
		withHelmet(({article}) => ({title: article.title})),
		multipleLoading({
			branches: ["article"],
		}),
		connect(({article}) => ({article}))
	)(Logic)
}
