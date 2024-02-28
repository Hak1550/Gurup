import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getArticles } from "../../../actions/articles"
import isLoading from "../../../hocs/isLoading"
import { withNamespaces } from "react-i18next"
import { Actions } from "react-native-router-flux"
import { togglePlansModal, setPlansModalOptions } from "../../../actions/plans"
import _ from "underscore"

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			isModalVisible: false,
			page: 0,
			stopAddArticle: false
		}

		componentDidMount() {
			const { dispatch } = this.props
			const { page } = this.state
			dispatch(getArticles({ page }))
			dispatch(
				setPlansModalOptions({
					afterPurchase: async () => {
						dispatch(getArticles())
					},
				})
			)
		}

		goToArticle = article => {
			const { dispatch } = this.props
			const { _id, allowed } = article
			if (!allowed) {
				dispatch(togglePlansModal(true))
			} else {
				Actions.article({ _id })
			}
		}

		addArticles = async () => {
			const { dispatch } = this.props
			const { page } = this.state
			this.setState({ page: page + 1 })
			dispatch(getArticles({ page }))
		}

		_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible })

		render() {
			return (
				<WrapperComponent
					goToArticle={this.goToArticle}
					_toggleModal={this._toggleModal}
					addArticles={this.addArticles}
					state={this.state}
					_scrolled={this._scrolled}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_articles"]),
		isLoading({
			status_path: ({ status }) => ({ status: status.articles }),
		}),
		connect(({ articles }) => ({ articles }))
	)(Logic)
}
