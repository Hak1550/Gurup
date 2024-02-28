import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';
import { withRouter } from 'react-router-dom';

export default WrapperComponent => {
	class Logic extends Component {

		state = {
	        filterDropdown: false,
	        userDropdown: false,
			filter: [],
	    };

		componentDidMount() {
			document.addEventListener("click", this.handleDocumentClick);
		}

		componentWillUnmount() {
	        document.removeEventListener("click", this.handleDocumentClick);
		}

		handleDocumentClick = () => {
			if (this.state.filterDropdown) {
	            this.setState({
	                filterDropdown: false,
	            })
			}
			if (this.state.userDropdown) {
				this.setState({
					userDropdown: false
				})
			}
		};

		render() {
			let {filterDropdown, userDropdown, filter} = this.state;
			let {dispatch, sidebar} = this.props;
			return (
				<WrapperComponent
					{...this.props}
					state={this.state}
					toggleSidebar={()=>{
						dispatch({
							type: "TOGGLE_SIDEBAR",
							data: !sidebar
						})
					}}
					toggleFilter={(e)=>{
						e.nativeEvent.stopImmediatePropagation();
						this.setState({filterDropdown: !filterDropdown, userDropdown: false})
					}}
					toggleUser={(e)=>{
						e.nativeEvent.stopImmediatePropagation();
						this.setState({userDropdown: !userDropdown, filterDropdown: false})
					}}
					filterOnChange={(value)=>{
						let valueIndex = filter.findIndex(val=>val === value)
						if (valueIndex === -1) {
							filter.push(value)
						} else {
							filter.splice(valueIndex, 1)
						}
						this.setState({filter})
					}}
					applyFilter={()=>{
						// dispatch(getSmthng(filter))
					}}
					clearFilter={()=>{
						this.setState({filter: []})
					   // dispatch(getSmthng())
					}}
				/>
			);
		}
	}
	return compose(
		withRouter,
		withNamespaces(["web_layout"]),
		connect(({ me, sidebar, influencer }) => ({ me, sidebar, influencer }))
	)(Logic);
};
