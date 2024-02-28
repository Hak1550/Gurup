import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"

import {withNamespaces} from "react-i18next";
import {email} from "utils/validator";
import {withRouter} from "react-router-dom";
import qs from "qs";

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
        withRouter,
        withNamespaces(["web_sign"]),
        connect(({ me }) => ({ me }))
    )(Logic)
};
