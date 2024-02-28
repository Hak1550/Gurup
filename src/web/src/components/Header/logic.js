import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withNamespaces } from "react-i18next"
import { withRouter } from "react-router-dom"
import { logout } from "actions/sign"
import { withTheme } from "styled-components"
import qs from "qs";

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			filterDropdown: false,
			userDropdown: false,
			tags: [],
			ranges: {}
		};

		componentDidMount() {
			document.addEventListener("click", this.handleDocumentClick);
			const query = qs.parse(location.search.replace("?",""));
			const tags = query.tags ? query.tags : [];
			const ranges = query.ranges ? query.ranges : {};
			this.setState({tags, ranges});
		}

		componentWillUnmount() {
			document.removeEventListener("click", this.handleDocumentClick)
		}

		handleDocumentClick = () => {
			if (this.state.filterDropdown) {
				this.setState({
					filterDropdown: false,
				})
			}
			if (this.state.userDropdown) {
				this.setState({
					userDropdown: false,
				})
			}
		}

		logout = async () => {
			const { dispatch } = this.props
			await dispatch(logout())
		}

		render() {
			let { filterDropdown, userDropdown, tags, ranges } = this.state;
			let { dispatch, sidebar, filter={} } = this.props;
			let {fetchData} = filter;
			return (
				<WrapperComponent
					{...this.props}
					logout={this.logout}
					state={this.state}
					toggleSidebar={() => {
						dispatch({
							type: "TOGGLE_SIDEBAR",
							data: !sidebar,
						})
					}}
					toggleFilter={e => {
						e.nativeEvent.stopImmediatePropagation();
						this.setState({ filterDropdown: !filterDropdown, userDropdown: false })
					}}
					toggleUser={e => {
						e.nativeEvent.stopImmediatePropagation();
						this.setState({ userDropdown: !userDropdown, filterDropdown: false })
					}}
					tagsOnChange={tag_id => {
						if (!tags.includes(tag_id)) {
							this.setState({tags: [...tags, tag_id] });
						} else {
							this.setState({tags: tags.filter(id => id !== tag_id)});
						}
					}}
					rangeOnChange={(range, value)=>{
						this.setState({
							ranges: {...ranges, [range.field]: value}
						})
					}}
					applyFilter={() => {
						const {location, history} = this.props;
						console.log("APPLY FILTERS", fetchData);
						if (fetchData) {
							fetchData({tags, ranges});
							const newQuery = qs.stringify({tags, ranges});
							console.log("NEW QUERY", tags, newQuery);
							history.push(`${location.pathname}?${newQuery}`);
						} else {
							console.log("no fetchData func provided");
						}
					}}
					clearFilter={() => {
						this.setState({ tags: [], ranges: {} })
					}}
				/>
			)
		}
	}
	return compose(
		withRouter,
		withTheme,
		withNamespaces(["web_layout", "basic"]),
		connect(({ me, sidebar, influencer }) => ({ me, sidebar, influencer }))
	)(Logic)
}
