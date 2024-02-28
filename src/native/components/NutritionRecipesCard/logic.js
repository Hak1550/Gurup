import React from "react";
import { connect } from "react-redux";
import {compose} from 'redux'
import {withNamespaces} from 'react-i18next'

export default WrappedComponent => {
	class Logic extends React.Component {
		render() {
			return <WrappedComponent {...this.props} />;
		}
	}
	return withNamespaces("app_nutrition", { wait: true })(Logic);
};
