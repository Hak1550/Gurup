import React from 'react'
import { connect } from 'react-redux';

export default (WrappedComponent) => {
	class Logic extends React.Component {

		state = {
			charLimit: 250
		}

		render() {
			return <WrappedComponent {...this.props}/>
		}
	}
	return connect(null)(Logic)
}
