import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root')

export default WrapperComponent => {
	class Logic extends Component {

		render() {
			const {dispatch} = this.props
			return (
				<WrapperComponent
					{...this.props}
					toggleModal={(data={}) => {
						dispatch({
							type: "TOGGLE_MODAL",
							data,
						})
					}}
				/>
			);
		}
	}
	return compose(
		connect(({modal})=>({modal}))
	)(Logic);
};
