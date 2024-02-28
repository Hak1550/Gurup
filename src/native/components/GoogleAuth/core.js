import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

import React from "react";
import { withNamespaces } from "react-i18next";
import Button from "../Button"
import styles from "./styles"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { View, TouchableWithoutFeedback, Text } from "react-native"


const GoogleAuth = ({ 
    onSignIn = (credentials) => { console.log("NO onSignIn handler, credentials ", credentials) },
    style,
    t,
    textStyle = {}
}) => {
    const signIn = async () => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // console.log("USER INFO", userInfo)
            if(onSignIn){
                onSignIn(userInfo)
            }
        } catch (error) {
            // console.log("ERROR!!!", error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
    }}

    const buttonStyles = style ? [styles["google-button"], style] : styles["google-button"];
    return (
        <TouchableWithoutFeedback onPress={signIn} >
            <View style={buttonStyles}>
                <FontAwesome style={styles["google-button__icon"]} name="google" />
                <Text style={[styles["google-button__text"], textStyle]}>{t("app_login:sign_in_with_google")}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default withNamespaces(['app_login'])(GoogleAuth)