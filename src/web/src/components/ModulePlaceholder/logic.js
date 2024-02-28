import React from 'react'
import { connect } from "react-redux";
import { compose } from "redux"
import multipleLoading from "hocs/multipleLoading"

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    return compose(
        multipleLoading({
            branches: []
        }),
    )(Logic)
}