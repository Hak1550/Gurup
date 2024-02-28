import React, { Fragment, useEffect, useState } from "react"
import { Text, TouchableOpacity, View, StatusBar, Image } from "react-native"
import styles from "../styles"
import RoundedLayout from "../../../components/RoundedLayout"
import Button from "../../../components/Button"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import Logic from "../logic"
import CacheImage from "../../CacheImage"
import { useCustomAppInfo } from "../../../utils/hooks"

const WelcomeLayout = ({ state, backToInfluencerPage, t, ...rest }) => {
	const {isCustomApp} = useCustomAppInfo();
	const {
		children,
		withKeyboardAware = false,
		onSignUp,
		_onSignIn,
		_onSignUp,
		_goToIntroduction,
		welcomeScreen,
		showBottomLinks = true,
		influencer = {},
	} = rest
	
	const [logoOrintation, setLogoOrientation] = useState("vertical");

	useEffect(() => {
		if (influencer && influencer.logo){
			Image.getSize(influencer.logo, (width, height) => {
				if (width < height) {
					setLogoOrientation("vertical");
				} else {
					setLogoOrientation("horizontal");
				}
			});
		}

	}, [influencer, influencer.logo])

	const bottomLinks = (
		<View style={styles["welcome__signup"]}>
			<TouchableOpacity onPress={_goToIntroduction}>
				<Text style={styles["welcome__signup-link"]}>
					{t("app_login:sign_in_with_socials")}
				</Text>
			</TouchableOpacity>
			{isCustomApp && welcomeScreen.screen === 2 && (
				<TouchableOpacity onPress={_onSignUp}>
					<Text style={styles["welcome__signup-link"]}>
						{t("app_login:sign_up_with_email")}
					</Text>
				</TouchableOpacity>
			)}
			{welcomeScreen.screen === 1 && (
				<TouchableOpacity onPress={_onSignIn}>
					<Text style={styles["welcome__signup-link"]}>
						{t("app_login:sign_in_with_email")}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	)

	const renderChildren = () => { 
		if (typeof children === "function"){
			return children({ bottomLinks })
		} else {
			return children
		}
	}

	const logoStyles = [styles["layout-welcome__head-img"], styles[`layout-welcome__head-img_${logoOrintation}`]]
	// console.log("INFLUENSER IN LAYOUT", influencer)
	return (
		<View style={[styles["layout-welcome"]]}>
			<StatusBar/>
			<View style={styles["layout-welcome__head"]}>
				{influencer && influencer.logo ? <CacheImage 
					auto
					source={influencer.logo}
					style={logoStyles}
					resizeMode="contain"
				/> : (
					<Text style={styles["layout-welcome__head-text"]}>{influencer.appName}</Text>
				) }
			</View>
			<View style={styles["layout-welcome__body"]}>
				{withKeyboardAware ? (
					<Fragment>
						<KeyboardAwareScrollView contentContainerStyle={styles["welcome__auth"]} behavior='padding' enabled>
							{renderChildren()}
							{showBottomLinks && bottomLinks}
						</KeyboardAwareScrollView>
					</Fragment>
				) : (
						<View style={styles["welcome__auth"]}>
							{renderChildren()}
							{showBottomLinks && bottomLinks}
						</View>
					)}
			</View>
		</View>
	)
}

export default Logic(WelcomeLayout)
