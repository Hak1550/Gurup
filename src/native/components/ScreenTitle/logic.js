import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from 'react-redux'

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    return connect(({me, influencer}) => ({me, influencer}))(Logic)

}
