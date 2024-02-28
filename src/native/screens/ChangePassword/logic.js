import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
export default WrappedComponent => {
    class Logic extends Component {
        render() {
            return (
                <WrappedComponent
                    {...this.props}
                />
            )
        }
    }
    return compose(
        withNamespaces(["app_basic"])
    )(Logic)
}
