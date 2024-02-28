import React from "react"
import { View, Text, ImageBackground, TouchableOpacity, StatusBar } from "react-native"
import styles from "../styles"
import Logic from "../logic"
import { config } from "../../../styles/variables"
import EStyleSheet from "react-native-extended-stylesheet"
import LinearGradientOverlay from "../../LinearGradientOverlay"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Actions } from "react-native-router-flux"

const RoundedLayout = ({ children, style, topRightButton = null, topLeftButton = null, title = "Blogger's name", statusBarColor="#fff", statusBarStyle="light-content" }) => {
	return (
		<View style={[styles["layout-rounded"], style]}>
			<StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
			<RoundedLayoutHeader>
				{!config.appDomain && <TouchableOpacity onPress={() => Actions.reset('influencer')} style={styles["layout-rounded__back"]}>
					<FontAwesome name={"angle-left"} style={styles["layout-rounded__back-icon"]} size={24}/>
				</TouchableOpacity>}
				{!!title && <Text style={styles["layout-rounded__logo"]}>{title}</Text>}
			</RoundedLayoutHeader>
			<View style={styles["layout-rounded__body"]}>{children}</View>
		</View>
	)
}

const RoundedLayoutHeader = ({
	headerGradient = "MainGradient",
	headerBackgroundStyle = config.headerBackgroundStyle,
	children,
}) => {
	const img = config.appDomain
		? require("../../../assets/custom/layout-bg.jpg")
		: require("../../../assets/core/layout-bg.jpg")

	switch (headerBackgroundStyle) {
		case "image":
			return (
				<View style={styles["layout-rounded__head"]}>
					<ImageBackground style={{ width: "100%", height: "100%", justifyContent: "center" }} source={img}>
						{children}
					</ImageBackground>
				</View>
			)
		case "gradient":
			return (
				<View style={styles["layout-rounded__head"]}>
					<LinearGradientOverlay gradient={headerGradient} height='130%' width='100%' />
					{children}
				</View>
			)
		case "color":
			return (
				<View style={[styles["layout-rounded__head"], { backgroundColor: EStyleSheet.value("$screenBackgroundColor") }]}>
					{children}
				</View>
			)
		default:
			return <View style={styles["mainlayout__header"]}>{children}</View>
	}
}

export default Logic(RoundedLayout)
