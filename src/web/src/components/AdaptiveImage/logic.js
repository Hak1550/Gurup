import React, { Component } from "react"
import { withTheme } from "styled-components"

export default WrapperComponent => {
	class Logic extends Component {
		render() {
			return (
				<WrapperComponent
					{...this.props}
				/>
			)
		}
	}
	return withTheme(Logic)
};
