import React from "react"
import { View, Text, TouchableOpacity, Linking, Platform } from "react-native"
import SettingsLayout from "../../../components/SettingsLayout"
import Dropdown from "../../../components/Dropdown"

import styles from "../styles"
import { Actions } from "react-native-router-flux"
import Logic from "../logic"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Screen320 } from "../../../utils"
import { config } from "../../../styles/variables";
import {supported_locales} from "../../../App";


const Settings = ({ me, logout, t, state, changeLanguage, influencer }) => {
	const languageActiveClass = (lang, elem) => {
		if (state.currentLanguage === lang) {
			if (elem === "text") return styles["switch_circle-text-active"]
			if (elem === "circle") return styles["switch_circle-active"]
		}
	}

	let languages = [];
	if(influencer && influencer.tld == "ru"){
		languages = [{
			label: "RU",
			value: "ru",
		}];
	}
	languages = [
		...languages,
		{
			label: "EN",
			value: "en"
		}
		,{
			label:"ES",
			value:"es"
		}
	];

	return (
		<SettingsLayout username={me.name}>
			<View style={styles["settings"]}>
				{/* { (me.plan || (config.appDomain && !influencer.coinsEnabled) )?(
					<TouchableOpacity style={styles["settings__link"]} onPress={Actions.pricingPlan}>
						<Text style={styles["settings__link-text"]}>
							{me.plan ? `${t("app_tariff:your_plan")} — ${me.plan.name}` : t("app_tariff:choose_plan")}
						</Text>
					</TouchableOpacity>
				) : null} */}
				<View style={styles["setting__separator"]}/>
				<TouchableOpacity style={styles["settings__link"]} onPress={Actions.changePassword}>
					<Text style={styles["settings__link-text"]}>{t('app_basic:change_password')}</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity style={styles["settings__link"]}>
					<Text style={styles["settings__link-text"]}>Delete Account</Text>
				</TouchableOpacity> */}
				<View style={[styles["settings__link"], styles["settings__choose-language"]]}>
					<Dropdown 
						options = {
							supported_locales.map((locale) => (
								{
									label: locale.toUpperCase(),
									value: locale,
								}
							))
						}
						label={t("app_basic:choose_language")}
						onSelect={({ value }) => {
							// console.log("value ",value);
							changeLanguage(value)
						}}
					/>
				</View>

				<TouchableOpacity style={styles["settings__link"]} onPress={Actions.report}>
					<Text style={styles["settings__link-text"]}>{t("app_basic:have_problems")}</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles["settings__link"]} onPress={Actions.about}>
					<Text style={styles["settings__link-text"]}>{t('app_basic:about_page')}</Text>
				</TouchableOpacity>

				{(state.purchaseHistory && state.purchaseHistory.length)?(
					<TouchableOpacity style={styles["settings__link"]} onPress={()=>{
						if (Platform.OS === 'ios') {
							Linking.openURL('https://apps.apple.com/account/subscriptions')
						}else{
							Linking.openURL('https://play.google.com/store/account/subscriptions');
							//?package=com.awa.awa
							//&sku=YOUR_PRODUCT_ID
						}
					}}>
						<Text style={styles["settings__link-text"]}>{t('app_basic:Manage subscription')}</Text>
					</TouchableOpacity>
				):null}
				
				<View style={styles["setting__separator"]} />

				<TouchableOpacity
					style={styles["settings__link"]}
					onPress={() => {
						logout()
					}}>
					<Text style={styles["settings__link-text"]}>{t("app_basic:logout")}</Text>
				</TouchableOpacity>
			</View>
		</SettingsLayout>
	)
}

export default Logic(Settings)
