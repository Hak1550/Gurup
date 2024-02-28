import React, {Component} from "react";
import {connect} from "react-redux"
import { checkInfluencer, oauth, registerPushToken } from '../../../actions/sign';
import { Actions } from "react-native-router-flux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import { initPushToken } from "../../../utils"
import { config } from "../../styles/variables";
// import { Sentry } from 'react-native-sentry'
// import * as Sentry from "@sentry/react-native";

export default (WrappedComponent) => {
    class Logic extends Component{
        constructor(props) {
            super();
            this.state = {
            }
        }

        onOauth = async (credentials, platform) => {
            const { dispatch, influencer } = this.props;
            // console.log("ON onOauth SIGN IN ", credentials);
            dispatch(oauth({
                platform,
                credentials
            })).then(async ({jwt_token, user}) => {
                // console.log("OAUTH OK ", user);
                AsyncStorage.setItem("jwt_token", jwt_token)
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
                    console.log("eEEEE ", e);
                }
                // Sentry.setUser({
                //     email: user.email,
                //     id: user._id,
                //     username: user.name
                // })
                // Sentry.captureMessage("Hello Sentry!");
                Actions.reset("tabbar")
                if (influencer.editableModules) {
                    const mainModules = ["courses", "marathons", "nutrition", "articles"];
                    const module = influencer.editableModules.find((module) => mainModules.includes(module));
                    // console.log("First found module", module)
                    if (module) {
                        Actions.jump(`${module}_tab`);
                    }
                }
                dispatch({
                    type: "START_ANIMATION",
                    name: "checked",
                    duration: 1000,
                })
            })
        }

        render() {
            return <WrappedComponent {...this.props} onOauth={this.onOauth} state={this.state}/>
        }
    }

    return compose(
        withNamespaces(['app_login'], { wait: true }),
        connect(({ influencer }) => ({ influencer }))
    )(Logic)
}
