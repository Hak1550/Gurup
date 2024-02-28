import React, { Fragment } from "react";
import {TouchableOpacity, View, StatusBar} from "react-native";
import * as Styled from "./../styles/styles";
import {useTheme} from "styled-components";
import {Actions} from "react-native-router-flux";
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useCustomAppInfo} from "../../../utils/hooks";

import GoogleAuth from "../../../components/GoogleAuth";
import { checkInfluencer, oauth } from "../../../../actions/sign";
import { initPushToken } from "../../../utils";
import { config } from "../../../styles/variables";
import Logic from './../logic';

const EntryOptions = ({t,...rest}) => {

    const theme = useTheme();
    const goToScanner = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        if(status === "granted"){
            Actions.entryQR()
        }
    }
    const {isCustomApp, influencer} = useCustomAppInfo();

    const dispatch = useDispatch();

    const onOauth = async (credentials, platform) => {
        // console.log("ON onOauth SIGN IN ", credentials);
        dispatch(oauth({
            platform,
            credentials
        })).then(async ({jwt_token, user}) => {
            console.log("OAUTH OK ", user);
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

    return (
        <Styled.Screen>
            <StatusBar 
                translucent
                backgroundColor = "transparent"
                barStyle={config.theme === "light" ? "dark-content" : "light-content"} 
            />
            <Styled.LogoWrap>
                <Styled.Logo resizeMode="contain"/>
            </Styled.LogoWrap>
            <Styled.Content>
                <Styled.Title>{influencer.app__welcomeText || t("app_login:fast_login_welcome")}</Styled.Title>
                <Styled.SubTitle>{influencer.app__welcomeDescription || t("app_login:fast_login_descr")}</Styled.SubTitle>
                <Styled.ButtonWrap>
                    <Styled.Button onPress = {Actions.entryCode} title={t("app_login:fast_login_use_code")} icon="lock"/>
                    {/* <Styled.Button onPress = {goToScanner} title = {t("app_login:fast_login_use_qr")} icon="qrcode"/> */}
                    <View>
                      <GoogleAuth style={{ borderRadius: 50 }}
                        onSignIn={(credentials) => onOauth(credentials, "google")}
                      />
                    </View>
        </Styled.ButtonWrap>
                {!isCustomApp?(
                    <TouchableOpacity onPress = {Actions.influencer}>
                        <Styled.Link>{t("app_login:fast_login_to_school_selection")}</Styled.Link>
                    </TouchableOpacity>
                ):(
                    <Fragment>
                        {influencer.signupDisabled?null:(
                            <TouchableOpacity onPress = {Actions.intro}>
                                <Styled.Link>{t("app_login:create_account")}</Styled.Link>
                            </TouchableOpacity>
                        )}
                    </Fragment>
                )}  
            </Styled.Content>
        </Styled.Screen>    
    )

}

export default Logic(EntryOptions);