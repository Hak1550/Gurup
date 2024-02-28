import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"

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
    )(Logic)
};
