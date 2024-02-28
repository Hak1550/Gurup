import React, { Component } from "react"
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			value: "",
		};
		onChange = (e) => {
			const {name, onChange} = this.props;
			const value = e.target.value;
			this.setState({value});
			if(onChange) {
				onChange({value, name});
			}
		};

		render() {
			return (
				<WrapperComponent
					{...this.props}
					state={this.state}
					onChange = {this.onChange}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["basic"]),
	)(Logic);
};
