import React, {Component} from "react";
import {withNamespaces} from 'react-i18next'
export default (WrappedComponent) => {
	class Logic extends Component {
		render() {
			return <WrappedComponent {...this.props}/>
		}
	}
	return withNamespaces(['app_notification', 'app_basic'], {wait: true})(Logic)
}