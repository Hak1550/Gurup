// import { LoginManager, AccessToken } from "react-native-fbsdk-next";
import React from "react";
import { TouchableWithoutFeedback, Text, View } from "react-native";
import Button from "../Button"
import styles from "./styles"
import { withNamespaces } from "react-i18next";
import FontAwesome from "react-native-vector-icons/FontAwesome"

const FacebookAuth = ({
    onSignIn = (credentials) => { console.log("NO onSignIn handler, credentials ", credentials) },
    style,
    t,
    textStyle = {}
}) => {
    const logIn = async () => {
        try {
            // console.log("LoginManager", LoginManager)
            if (AccessToken.getCurrentAccessToken() != null) {
                LoginManager.logOut()
            }
            const result = await LoginManager.logInWithPermissions(['public_profile', "email"]);
            // console.log("FACEBOOK RESULT", result);
            if (result.isCancelled) {
                console.log("Login cancelled");
            } else {
                // console.log(
                //     "Login success with permissions: " +
                //     result.grantedPermissions.toString()
                // );
                const { accessToken: token } = await AccessToken.getCurrentAccessToken()
                if (onSignIn && token) {
                    onSignIn({ token })
                }
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    // icon = "facebook"
    const buttonStyles = style ? [styles["facebook-button"], style] : styles["facebook-button"];
    // console.log("BUTTON STYLES", buttonStyles)
    return (
        <TouchableWithoutFeedback 
        // onPress={logIn} 
        >  
            <View style={buttonStyles}>
                <FontAwesome style={styles["facebook-button__icon"]} name="facebook"/>
                <Text style={[styles["facebook-button__text"], textStyle]}>{t("app_login:sign_in_with_facebook")}</Text>
            </View>   
        </TouchableWithoutFeedback>
    )
}


export default withNamespaces(['app_login'])(FacebookAuth)

