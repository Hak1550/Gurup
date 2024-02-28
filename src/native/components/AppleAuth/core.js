import * as AppleAuthentication from 'expo-apple-authentication';
import React from "react";
import {connect} from "react-redux"
const AppleAuth = ({
    style = { width: 280, height: 44 },
    borderRadius = 5,
    onSignIn = (credentials) => { console.log("NO onSignIn handler, credentials ", credentials) },
    influencer
}) => {
    // console.log("influencer in BTN", influencer)
    const buttonStyle = influencer && influencer.template === "dark" 
        ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE 
        : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK ;
    
    return (
        <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.CONTINUE}
            buttonStyle={buttonStyle}
            cornerRadius={borderRadius}
            style={style}
            onPress={async () => {
                try {
                    const credentials = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                    });
                    // console.log("CREDENITALS", credentials);
                    // signed in
                    onSignIn(credentials);
                } catch (e) {
                    // console.log("apple AUTH ERROR", e)
                    if (e.code === 'ERR_CANCELED') {
                        // handle that the user canceled the sign-in flow
                    } else {
                        // handle other errors
                    }
                }
            }}
        />
    );
}

export default connect(({ influencer }) => ({ influencer }))(AppleAuth)