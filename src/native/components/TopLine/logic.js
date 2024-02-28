import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {connect} from "react-redux";
import {config} from "../../styles/variables";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            let bloggersName = '';
            if(config && config.appName){
                bloggersName = config.appName;
            }
            return <WrappedComponent bloggersName={bloggersName} {...this.props}/>
        }
    }
    return connect(({me, influencer})=>({me, influencer}))(Logic)
}
