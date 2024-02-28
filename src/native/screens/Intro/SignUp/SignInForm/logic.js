import React from "react";
import ValidationComponent from 'react-native-form-validator';
import {connect} from "react-redux"
import {registerPushToken, signIn, checkInfluencer} from "../../../../../actions/sign"
import {Actions} from "react-native-router-flux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {compose} from "redux";
import {withNamespaces} from "react-i18next";
import {initPushToken} from '../../../../utils/index';
import {config} from '../../../../styles/variables';
// import { Sentry } from 'react-native-sentry'
// import * as Sentry from "@sentry/react-native";

export default (WrappedComponent) => {
    class FormLogic extends ValidationComponent {
        constructor(props) {
            super(props);
            this.state = {
                email: ".",
                password: "",
                forgotModalOpened:false
            }
        }

        componentDidMount() {
            this.setState({
                email: ""
            });
        }

        handleFieldChange = ({name, value}) => {
            this.setState({[name]: value});
        };
        toggleForgotModal=()=>{
            this.setState({
                forgotModalOpened: !this.state.forgotModalOpened
            })
        }
        _onPressButton = () => {
            const {dispatch, pushToken, influencer} = this.props;
            this.validate({
                email: {email: true, required: true},
                password: {required: true},
            });
            const {email, password} = this.state;
            const user = {email: email.trim().toLowerCase(), password};
            dispatch(signIn({user}))
                .then(async ({me, jwt_token}) => {

                    try {
                        if (influencer && influencer.name) {
                            initPushToken(influencer, dispatch)
                        } else {
                            console.log("no influencer");
                        }
                    } catch (e) {
                        console.log('error => ', e)
                    }

                    // Записать о регистрации пользователя в школе, в Local Storage

                    const {appName, name, logo} = influencer
                    const dataForStorage = {appName, name, logo}

                    let schoolInStorage = await AsyncStorage.getItem('schools');
                    // console.log('school in storage', schoolInStorage)

                    if(schoolInStorage !== null) {
                        schoolInStorage = JSON.parse(schoolInStorage)
                        if(schoolInStorage.myschools) {
                            const {myschools} = schoolInStorage;
                            // console.log('schoolInStorage.myschools', schoolInStorage.myschools)
                            const findSchool = myschools.find(school => school.name === influencer.name)
                            if(!findSchool) {
                                let newSchool = {...schoolInStorage}
                                newSchool.myschools = [...newSchool.myschools, {...dataForStorage}]
                                newSchool = JSON.stringify(newSchool)
                                await AsyncStorage.setItem('schools', newSchool)
                            }
                        }
                    } else {
                        let schools = {myschools: [{...dataForStorage}]}
                        schools = JSON.stringify(schools)
                        await AsyncStorage.setItem('schools', schools)
                    }

                    // Записать о регистрации пользователя в школе, в Local Storage

                    dispatch(registerPushToken(pushToken));
                    // console.log('jwt user', user)

                    try{
                        let subdomain = null;
                        if (!config || !config.appDomain) {
                            console.log("no appDOmain in login")
                            subdomain = await AsyncStorage.getItem('subdomain');
                        }else{
                            subdomain = config.appDomain;
                        }
                        // console.log("subdomain in login => ",subdomain);
                        if(subdomain){
                            await dispatch(checkInfluencer({subdomain, config}))
                        }
                    }catch(e){
                        console.log("error checking influencer ",e);
                    }
                    // Sentry.setUser({
                    //     email: me.email,
                    //     id: me._id,
                    //     username: me.name
                    // })
                    // Sentry.captureMessage("Hello SignIn!");
                    return AsyncStorage.setItem("jwt_token", jwt_token)
                })
                .then(() => {
                    // Sentry.setUserContext({
                    //     email: user.email,
                    //     id: user._id,
                    //     username: user.name
                    // })

                    Actions.reset('tabbar')
                    if (influencer.editableModules) {
                        const mainModules = ["courses", "marathons", "nutrition", "articles"];
                        const module = influencer.editableModules.find((module) => mainModules.includes(module));
                        // console.log("First found module", module)
                        if (module) {
                            Actions.jump(`${module}_tab`);
                        }
                    }
                })
                // .catch((err) => console.log("error in SignIN", err));
        };
        render() {
            const methods = {
                handleFieldChange: this.handleFieldChange,
                _onPressButton: this._onPressButton,
                toggleForgotModal: this.toggleForgotModal
            }
            return <WrappedComponent {...this.props} state = {this.state} methods = {methods}/>
        }
    }

    return compose(
        withNamespaces(['app_login', 'log_in_page'], {wait: true}),
        connect(({pushToken, influencer}) => ({pushToken, influencer}))
    )(FormLogic)
}