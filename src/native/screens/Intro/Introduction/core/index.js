import React, { Fragment } from "react"
import { View, Text, TouchableOpacity, Platform } from "react-native"
import WelcomeLayout from "../../../../components/WelcomeLayout"
import styles from "../styles"
import Logic from "../logic"
import { config } from "../../../../styles/variables"
import Button from "../../../../components/Button"
import AppleAuth from "../../../../components/AppleAuth"
// import FacebookAuthButton from "../../../../components/FacebookAuth"
import GoogleAuth from "../../../../components/GoogleAuth"
import {Actions} from "react-native-router-flux";
import {useCustomAppInfo} from "../../../../utils/hooks";
	
const Introduction = ({ onSignUp, onSignIn, onOauth, dimensions: { width, height }, methods, influencer, t, ...rest }) => {
	// console.log("INFLUENCER!", influencer)
	const {isCustomApp} = useCustomAppInfo();
	return (
		<WelcomeLayout showBottomLinks = {false} style={{ width, height: height }} {...rest} title={config.appName}>
			<View style={styles["introduction"]}>
				{influencer && (
					<Fragment>
						<Text style={styles["introduction__title"]}>{influencer.app__welcomeText}</Text>
						<Text style={styles["introduction__text"]}>{influencer.app__welcomeDescription}</Text>
						<View style={styles["introduction__socials"]}>
							<Button
								onPress={onSignIn}
								title={t("app_login:continue_with_email")} 
								style={styles["introduction__socials-button"]}
								icon = "envelope-o"
								theme="accent" 
							/>
							{/* <FacebookAuthButton
								style={styles["introduction__socials-button"]}
								onSignIn={(credentials) => onOauth(credentials, "facebook")}
							/> */}
							<GoogleAuth
								style={styles["introduction__socials-button"]}
								onSignIn={(credentials) => onOauth(credentials, "google")}
							/>
							{Platform.OS === 'ios' &&
								<AppleAuth
									borderRadius={50}
									style={styles["introduction__socials-button"]}
									onSignIn={(credentials) => onOauth(credentials, "apple")}
								/>
							}
						</View>

						{isCustomApp?(
							<TouchableOpacity onPress = {Actions.entryOptions}>
								<Text style={styles['introduction__back']}>{t("basic:back")}</Text>
							</TouchableOpacity>
						):null}

					</Fragment>
				)}
			</View>
		</WelcomeLayout>
	)
}
export default Logic(Introduction)
