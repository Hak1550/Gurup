import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getArticles } from "actions/articles"
import { withNamespaces } from 'react-i18next';
import multipleLoading from "hocs/multipleLoading";
import withHelmet from "hocs/withHelmet"

export default WrapperComponent => {
	class Logic extends Component {
		state = {}
		componentDidMount = async() => {
			const { dispatch } = this.props;
			// dispatch(getArticles());
		}

		getArticles = async (params) => {
			const {dispatch} = this.props;
			const response = await dispatch(getArticles(params));
			console.log("GET ARTICLES PARAMS", params);
			console.log("PAGES IN GET", response);
			this.setState({pages: Math.floor(response.count/10)});
			return response
		};

		openModal = (e) => {
			e.preventDefault()
			let {dispatch} = this.props
			dispatch({
				type: "TOGGLE_MODAL",
				data: {
					name: "not_allowed"
				}
			})
		};

		render() {
			let {dispatch, articles, tags} = this.props;
			const {pages} = this.state;

			return (
				<WrapperComponent
					{...this.props}
					filter={{
						fetchData: this.getArticles,
						tags
					}}
					pages = {pages}
					fetchArticles = {this.getArticles}
					openModal={this.openModal}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["web_articles", "web_layout", "web_basic", "basic"]),
		withHelmet(({}) => ({title: 'web_layout:articles_title'}), 'web_layout'),
		multipleLoading({
			branches: ['articles', 'tags'],
		}),
		connect(({articles, tags})=>({articles, tags}))
	)(Logic);
};
