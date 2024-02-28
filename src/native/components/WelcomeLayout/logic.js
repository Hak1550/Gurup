import React from "react";
import { connect } from 'react-redux'
import {compose} from "redux";
import {withNamespaces} from "react-i18next";
import { initPushToken } from "../../utils"

export default (WrappedComponent) => {
    class Logic extends React.Component {
        onSignIn = () => {
            const {onSignIn, dispatch} = this.props;
            dispatch({type: "SET_SCREEN", screen: 2});
            if(onSignIn){
                onSignIn();
            }
        };

        onSignUp = () => {
            const {onSignUp, dispatch} = this.props;
            dispatch({type: "SET_SCREEN", screen: 1});
            if(onSignUp) {
                onSignUp();
            }
        };

        goToIntroduction = () => {
            const { goToIntroduction } = this.props;
            if (goToIntroduction) {
                goToIntroduction();
            }
        }

        onOauth = async (credentials, platform)=>{
            const { dispatch, pushToken, influencer} = this.props;
            // console.log("ON onOauth SIGN IN ",credentials);
            dispatch(oauth({
                platform,
                credentials
            })).then(async (user)=>{
                store.dispatch(registerPushToken(pushToken))
                AsyncStorage.setItem("jwt_token", user.jwt_token)
                try {
                    if (influencer && influencer.name) {
                        initPushToken(influencer, dispatch)
                    } else {
                        console.log("no influencer")
                    }
                } catch (e) {
                    console.log("error => ", e)
                }

                try {
                    let subdomain = null;
                    if (!config || !config.appDomain) {
                        // console.log("no appDOmain ")
                        subdomain = await AsyncStorage.getItem('subdomain');
                    } else {
                        subdomain = config.appDomain;
                    }
                    if (subdomain) {
                        // console.log("subdomain in su ", subdomain);
                        await dispatch(checkInfluencer({ subdomain, config }))
                    }
                } catch (e) {
                    console.log("e ", e);
                }

                Actions.reset("tabbar")

                dispatch({
                    type: "START_ANIMATION",
                    name: "checked",
                    duration: 1000,
                })
            })
        }
        
        render() {
            return <WrappedComponent
                _onSignIn={this.onSignIn}
                _onSignUp={this.onSignUp}
                _onOauth={this.onOauth}
                _goToIntroduction={this.goToIntroduction}
                backToInfluencerPage={this.backToInfluencerPage}
                {...this.props}/>
        }
    }
    return compose(
        withNamespaces(['app_login'], {wait: true}),
        connect(({ welcomeScreen, influencer }) => ({ welcomeScreen, influencer}))
    )(Logic)
}