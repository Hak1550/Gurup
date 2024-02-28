import React from "react"
import { View, Text, ImageBackground, TouchableWithoutFeedback, StatusBar } from "react-native"
import styles from "../styles"
import TopLine from "../../TopLine"
import ScreenTitle from "../../ScreenTitle"
import { Screen320 } from "../../../utils"
import { config } from "../../../styles/variables"
import LinearGradientOverlay from "../../LinearGradientOverlay"
import EStyleSheet from "react-native-extended-stylesheet"
import Logic from "../logic"
import Button from "../../Button"
import NStatusBar from "../../Statusbar"
import testMode from '../../../utils/debug';
import ScreenPlaceholder from "../../ScreenPlaceholder";
import EmailValidation from "../../../assets/core/svg-icon/email_validation";
import Preloader from "../../Preloader";


const MainLayout = ({
	screenTitle = "", // Название экрана в шапке
	screenSubtitle = false,
	children,
	getAvatar = false,
	avatarUri,
	accountButton = true, // Кнопка с именем и аватаром в шапке
	filterButton = false, // Иконка фильтров
	backButton = true,
	calendar = null,
	onBackButtonClick, // Кнопка назад
	customBackgroundColor,
	influencer,
	confirmEmail,
	t,
	me,
	progress,
	withProgress = false,
	statusBarColor="#fff",
	statusBarStyle="light-content",
	hideProfile = false,
	skipEmailConfirmation = false,
	loading
}) => {
	
	let bloggersName;
	if (influencer && influencer.appName) {
		bloggersName = config.appName
	}
	
	const renderScreenContent = () => {
		return influencer.useEmailValidation && me.status == "not_validated" && !skipEmailConfirmation ? (
			<ScreenPlaceholder
				text={t('app_basic:validate_email')}
				imageComponent={<EmailValidation/>}
				buttonAction={() => confirmEmail()}
			/>
		) : ( 
			<>
					{withProgress ? <NStatusBar style={styles["mainlayout__progress"]} to={progress} /> : null}
				{children}
			</>             
		)
	}
	return (
		<View style={styles["mainlayout"]}>
			<StatusBar 
				backgroundColor={statusBarColor} 
				barStyle={config.theme === "light" ? "dark-content" : "light-content"} 
			/>
			<MainLayoutHeader>
				<ScreenTitle
					title={screenTitle ? screenTitle : bloggersName }
					subtitle={screenSubtitle}
					getAvatar={Screen320() ? true : getAvatar}
					backButton={backButton}
					filterButton={filterButton}
					onBackButtonClick={onBackButtonClick}
					avatarUri={avatarUri}
					hideProfile={hideProfile}
				/>
				{calendar && calendar}
				{/* {Screen320() && !calendar && (
					<View style={styles["mainlayout_header-sub"]}>
						<Text style={styles["mainlayout_header-sub__title"]}>{screenTitle}</Text>
					</View>
				)} */}
			</MainLayoutHeader>
			<View style={[
				styles["mainlayout__content"],
				customBackgroundColor ? { backgroundColor: customBackgroundColor } : null,
			]}>
				{loading ? <Preloader/> : renderScreenContent()}
			</View>
		</View>
	)}

const MainLayoutHeader = ({
	headerGradient = "MainGradient",
	headerBackgroundStyle = config.headerBackgroundStyle,
	marathonHeader,
	children,
}) => {
	if (marathonHeader) {
		
		return (
			<View
				style={[styles["mainlayout__header"], { backgroundColor: EStyleSheet.value("$marathonHeaderColor") }]}>
				{children}
			</View>
		)
	} else {
		switch (headerBackgroundStyle) {
			case "image":
				return (
					<ImageBackground
						style={styles["mainlayout__header"]}
						source={
							config.appDomain
								? require("../../../assets/custom/layout-bg.jpg")
								: require("../../../assets/core/layout-bg.jpg")
						}>
						{children}
					</ImageBackground>
				)
			case "gradient":
				return (
					<View style={styles["mainlayout__header"]}>
						<LinearGradientOverlay gradient={headerGradient} height='130%' />
						{children}
					</View>
				)
			case "color":
				return (
					<View
						style={[styles["mainlayout__header"], { backgroundColor: EStyleSheet.value("$screenBackgroundColor") }]}>
						{children}
					</View>
				)
			default:
				return <View style={styles["mainlayout__header"]}>{children}</View>
		}
	}
}

export default Logic(MainLayout)
