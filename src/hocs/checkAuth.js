import React,{Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from 'redux';
import store from "store";
export const isAuthorized = () => {
    const me = store.getState().me;
    return Boolean(me && me._id);
};

export const checkValidation = (WrappedComponent, props) => {
    class _CheckValidation extends Component {
        render () {
            const {me, influencer} = this.props;
            return influencer.useEmailValidation && me.status === "not_validated" ? <Redirect to="/not-validated"/> :  <WrappedComponent {...this.props} {...props}/>
        }
    }
    if(WrappedComponent) {
        return connect(({me,influencer})=>({me,influencer}))(_CheckValidation);
    }
};

export default (WrappedComponent, props) => {
    class _CheckAuth extends Component {
        render () {
            const {me} = this.props;
            return me && me._id ? <WrappedComponent {...this.props} {...props}/> : <Redirect to="/login"/>
        }
    }
    if(WrappedComponent) {
        return connect(({me})=>({me}))(_CheckAuth);
    }
};
