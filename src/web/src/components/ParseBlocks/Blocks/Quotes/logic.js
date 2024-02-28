import React from "react"

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			quoteIndex: 0,
		};

		buttonClick = side => {
			const { data } = this.props;
			this.setState(prevState => {
				if (side === "next") {
					if (data.length > (prevState.quoteIndex + 1)) {
						return {
							quoteIndex: prevState.quoteIndex + 1,
						}
					}
				} else if (side === "prev") {
					if ((prevState.quoteIndex - 1) >= 0) {
						return {
							quoteIndex: prevState.quoteIndex - 1,
						}
					}
				}
			})
		};

		render() {
			return <WrappedComponent buttonClick={this.buttonClick} state={this.state} {...this.props} />
		}
	}
	return Logic
}
