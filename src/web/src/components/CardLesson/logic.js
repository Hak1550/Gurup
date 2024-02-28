import React from 'react'
import { connect } from 'react-redux';
import {compose} from 'redux'
import {withTheme} from 'styled-components'

export default (WrappedComponent) => {
	class Logic extends React.Component {
		render() {
			return <WrappedComponent {...this.props}/>
		}
	}
	return compose(withTheme, connect(null))(Logic)
}
