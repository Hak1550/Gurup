import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import {withNamespaces} from "react-i18next";

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
    return compose(
        withNamespaces(["web_sign"])
    )(Logic)
};
