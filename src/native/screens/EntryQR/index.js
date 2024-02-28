import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as Styled from "./styles";
import {connect} from "react-redux";
import WelcomeLayout from "../../components/WelcomeLayout";
import { config } from "../../styles/variables"
import {useTheme} from "styled-components";
import {Actions} from "react-native-router-flux";
import { BarCodeScanner } from 'expo-barcode-scanner';
import {signInWithCode, setDeviceData} from "../../../actions/sign";
import {getSearchParams, initPushToken} from "../../utils";
import {compose} from "redux";
import {withNamespaces} from "react-i18next";
import {useCustomAppInfo} from "../../utils/hooks";
import {getDeviceData} from "../../utils";



const EntryQR = ({t, dispatch, toggleTheme, ...rest}) => {
    const theme = useTheme();
    const [scannerState, setScannerState] = useState({});
    const {isCustomApp} = useCustomAppInfo();
    const handleScan = async ({data}) => {
        try {
            if(data){
                // data = JSON.parse(data);
                data = getSearchParams(data);
                if(data.user && data.code){
                    setScannerState({ scanned: true, loading: true});
                    const {influencer, jwt_token} = await dispatch(signInWithCode({...data, customApp: isCustomApp}));
                    setScannerState({scanned: true , loading: false, success: true});
                    setTimeout(async () => {
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
                    }, 500)
                } else {
                    dispatch({
                        type: "ERROR",
                        code: "WRONG_QR_CODE",
                    })
                }
            }
        } catch (e) {
            console.log("Cannot Login with error", e)
        } finally {
            setTimeout(() => {
                setScannerState({scanned: false, loading: false, success: false});
            }, 1000)
        }
    }

    const renderScannerFrame = () => {
        if(!scannerState.loading && !scannerState.success) {
            return <Styled.CameraFrame/>
        } else if(scannerState.loading){
            return (
                <Styled.CenterFill>
                    <Styled.Overlay/>
                    <Styled.Preloader/>
                </Styled.CenterFill>
            )
        } else if(scannerState.success) {
            return (
                <Styled.CenterFill>
                    <Styled.Overlay/>
                    <Styled.CheckMark/>
                </Styled.CenterFill>
            )
        }
    }
    return (
        <Styled.Screen>
            <Styled.Scanner barCodeTypes = {BarCodeScanner.Constants.qr} onBarCodeScanned={scannerState.scanned || scannerState.loading ? undefined : handleScan}/>
            <Styled.LogoWrap>
                <Styled.Overlay/>
                <Styled.Logo resizeMode="contain"/>
            </Styled.LogoWrap>
            <Styled.Content>
                <Styled.Container>
                    <Styled.Overlay/>
                    <Styled.Title>
                        {t("app_login:fast_login_target_qrcode")}
                    </Styled.Title>
                </Styled.Container>
                <Styled.CameraFrameWrap>
                    <Styled.CameraFrameFill/>
                        {renderScannerFrame()}
                    <Styled.CameraFrameFill/>
                </Styled.CameraFrameWrap>
                <Styled.NavWrapper>
                    <Styled.Overlay/>
                    <Styled.BackButton
                        icon="chevron-left" 
                        theme="ghost-accent"
                        onPress={Actions.pop}
                    />
                </Styled.NavWrapper>
            </Styled.Content>
        </Styled.Screen>    
    )

}

export default compose(
    withNamespaces(["app_login"]),
    connect(null)
)(EntryQR);
