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
        connect(({ influencer }) => ({ influencer })),
        withNamespaces(["app_basic", "basic"], { wait: true })
    )(Logic)
}
