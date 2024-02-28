import React, { useState } from "react";

import * as Styled from "./styles";
import {Actions} from "react-native-router-flux";
import WelcomeLayout from "../../components/WelcomeLayout";
import { config } from "../../styles/variables"
import {useTheme} from "styled-components";
import {useKeyboardStatus, useCustomAppInfo} from "../../utils/hooks";
import {HiddenBlock} from "../../components/AnimatedContainers";
import {signInWithCode, setDeviceData} from "../../../actions/sign";
import AsyncStorage from "@react-native-async-storage/async-storage"
import {connect} from "react-redux";
import {withNamespaces} from "react-i18next";
import {compose} from "redux";
import { initPushToken } from "../../utils"
import {getDeviceData} from "../../utils";

const EntryCode = ({t, toggleTheme, pushToken, dispatch, ...rest}) => {
    const [codeState, setCodeState] = useState({
        email: "",
        code: "",
        loading: false
    })
    const {isCustomApp} = useCustomAppInfo();
    const handleInput = ({name, value}) => setCodeState({...codeState, [name]: value});
    const isKeyboardOpen = useKeyboardStatus();
    const enterWithCode = async () => {
        const {email, code} = codeState;
        setCodeState({...codeState, loading: true});
        const {influencer, jwt_token, multi_credentials = []} = await dispatch(signInWithCode({
            email, 
            code,
            customApp: isCustomApp,
        }));
        if(multi_credentials && multi_credentials.length){
            Actions.replace('influencerSelect', {credentials: multi_credentials});
        } else {
            // store.dispatch(registerPushToken(pushToken));
            setCodeState({...codeState, loading: false});
            await AsyncStorage.setItem("subdomain", influencer.name);
            await AsyncStorage.setItem("jwt_token", jwt_token);
            initPushToken(influencer, dispatch);
            toggleTheme(influencer);
            const {device, expoData} = getDeviceData();
            dispatch(setDeviceData({
                device:JSON.stringify(device),
                expoData:JSON.stringify(expoData)
            }));
            Actions.reset("tabbar");
        }
    }
    return (
        <Styled.Screen>
            <Styled.LogoWrap>
                <Styled.Logo resizeMode="contain"/>
            </Styled.LogoWrap>
            <Styled.ContentKeyboardAvoid>
                <Styled.Content>
                    <Styled.HiddenContainer hidden={isKeyboardOpen}>
                        <Styled.Title>{t("app_login:fast_login_welcome")}</Styled.Title>
                        <Styled.SubTitle>{t("app_login:fast_login_descr")}</Styled.SubTitle>
                    </Styled.HiddenContainer>
                    <Styled.InputWrap>
                        <Styled.Input
                            autoCapitalize='none'
                            name="email"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                            value={codeState.email}
                            onChangeText={handleInput}
                            placeholder={t("app_login:enter_email")}
                            icon='envelope-o'
                        />
                        <Styled.Input
                            name="code"
                            textContentType="oneTimeCode"
                            value={codeState.code}
                            onChangeText={handleInput}
                            placeholder={t("app_login:enter_code")}
                            secureTextEntry
                            icon='key'
                        />
                        <Styled.NavWrapper>
                            <Styled.BackButton
                                icon="chevron-left" 
                                theme="ghost-accent"
                                onPress={Actions.pop}
                            />
                            <Styled.EntryButton title={t("app_login:sign_in")} onPress = {enterWithCode}/>
                        </Styled.NavWrapper>
                    </Styled.InputWrap>
                </Styled.Content>
            </Styled.ContentKeyboardAvoid>
        </Styled.Screen>    
    )

}

export default compose(
    withNamespaces(["app_login"]),
    connect(({pushToken})=>({pushToken}))
)(EntryCode);