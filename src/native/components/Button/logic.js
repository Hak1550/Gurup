import React, { Component } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default (WrappedComponent) => {
    class Logic extends Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    return Logic
}