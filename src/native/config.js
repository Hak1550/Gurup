import { NativeModules } from "react-native";
import customConfig from "./config.json";


export class AppConfig {
	constructor(){
		this.setWhiteLableConfig();
	}

	setWhiteLableConfig = async () => {
		let additinalConfig = {...customConfig};
		const WhiteLabelConfig = await NativeModules.WhiteLabel.getConfig();
		if(WhiteLabelConfig && Object.keys(WhiteLabelConfig).length !== 0){
			additinalConfig = {
				...WhiteLabelConfig,
				...additinalConfig
			};
		}
		if(additinalConfig && Object.keys(additinalConfig).length !== 0) {
			for (const option in additinalConfig) {
				if (Object.hasOwnProperty.call(additinalConfig, option)) {
					this[option] = additinalConfig[option];
				}
			}
		}
	}

	appName = "Gurucan"
	description = "Gurucan"
	logo = false
	colors = {
		$accent: "#000000",
		$additionLight: "#E1DEEC",
		$mainGradientColorOne: "#FF03A6",
		$mainGradientColorSecond: "#FF7144",
		$additionColor: "#DAE3EE",
		$mainContent: "#462163",
		$textColor: "#3D3737",
		$shadowColor: "#8F3184",
		$additionalTextColor: "#E9E7EE",
		$screenBackgroundColor: "#F2F7FA",
		$successColor: "#65C691",
		$headerColor: "#FF4C65",
		$lessonItemActiveColor: "#FF4C65",
		$marathonHeaderColor: "#4B4B4B",
	}
	theme = "light"
	fontsCore = {
		"Main-Light": require("./assets/core/fonts/Main-Light.ttf"),
		"Main-Thin": require("./assets/core/fonts/Main-Thin.ttf"),
		"Main-Regular": require("./assets/core/fonts/Main-Regular.ttf"),
		"Main-Italic": require("./assets/core/fonts/Main-Italic.ttf"),
		"Main-Medium": require("./assets/core/fonts/Main-Medium.ttf"),
		"Main-Bold": require("./assets/core/fonts/Main-Bold.ttf"),
		"Main-BoldItalic": require("./assets/core/fonts/Main-BoldItalic.ttf"),
	}
	fontsCustom = {
		"Main-Light": require("./assets/custom/fonts/Main-Light.ttf"),
		"Main-Regular": require("./assets/custom/fonts/Main-Regular.ttf"),
		"Main-Italic": require("./assets/custom/fonts/Main-Italic.ttf"),
		"Main-Medium": require("./assets/custom/fonts/Main-Medium.ttf"),
		"Main-Bold": require("./assets/custom/fonts/Main-Bold.ttf"),
		"Main-BoldItalic": require("./assets/custom/fonts/Main-BoldItalic.ttf"),
	}
	tabBarTitles = {
		// Кастомные названия табов
	}
	amplitudeApiKey = "c246a89b237284e8bd4490e071b91beb";
	slug="gurucan";

	changeProperty = props => {
		props.forEach(objProp => {
			this[objProp.name] = objProp.value
		})
	}
}

function AppConfigOld() {
	this.appName = "Gurucan"
	this.description = "Gurucan"
	this.logo = false
	this.colors = {
		$accent: "#000000",
		$additionLight: "#E1DEEC",
		$mainGradientColorOne: "#FF03A6",
		$mainGradientColorSecond: "#FF7144",
		$additionColor: "#DAE3EE",
		$mainContent: "#462163",
		$textColor: "#3D3737",
		$shadowColor: "#8F3184",
		$additionalTextColor: "#E9E7EE",
		$screenBackgroundColor: "#F2F7FA",
		$successColor: "#65C691",
		$headerColor: "#FF4C65",
		$lessonItemActiveColor: "#FF4C65",
		$marathonHeaderColor: "#4B4B4B",
	}
	this.theme = "light"
	// this.headerBackgroundStyle = "image" // Варианты: image, color, gradient
	// this.lessonItemBackgroundStyle = "gradient" // Варианты: image, color, gradient

	/**
	 |--------------------------------------------------
	 | Если в приложение у блогера другой шрифт, то заменяем шрифты в папке assets/fonts/custom.
	 |
	 | Если необходимо добавить новое начертание, то добавляем шрифт в папку assets/fonts/custom
	 | и добавляем в this.fontsCustom новое начертание
	 |--------------------------------------------------
	 */
	this.fontsCore = {
		"Main-Light": require("./assets/core/fonts/Main-Light.ttf"),
		"Main-Thin": require("./assets/core/fonts/Main-Thin.ttf"),
		"Main-Regular": require("./assets/core/fonts/Main-Regular.ttf"),
		"Main-Italic": require("./assets/core/fonts/Main-Italic.ttf"),
		"Main-Medium": require("./assets/core/fonts/Main-Medium.ttf"),
		"Main-Bold": require("./assets/core/fonts/Main-Bold.ttf"),
		"Main-BoldItalic": require("./assets/core/fonts/Main-BoldItalic.ttf"),
	}
	this.fontsCustom = {
		"Main-Light": require("./assets/custom/fonts/Main-Light.ttf"),
		"Main-Regular": require("./assets/custom/fonts/Main-Regular.ttf"),
		"Main-Italic": require("./assets/custom/fonts/Main-Italic.ttf"),
		"Main-Medium": require("./assets/custom/fonts/Main-Medium.ttf"),
		"Main-Bold": require("./assets/custom/fonts/Main-Bold.ttf"),
		"Main-BoldItalic": require("./assets/custom/fonts/Main-BoldItalic.ttf"),
	}

	/**
	 |--------------------------------------------------
	 | Кастомные названия табов
	 | в формате 'chats': 'Телеграммы'
	 |--------------------------------------------------
	 */
	this.tabBarTitles = {
		// Кастомные названия табов
	}

	/**
	 |--------------------------------------------------
	 | Функция для изменения значений ключей конфига, принимает массив обьектов
	 | changeProperty([
	 | 	{ name: "Ключ", value: "Значение"}
	 | ])
	 |--------------------------------------------------
	 */
	this.changeProperty = props => {
		props.forEach(objProp => {
			this[objProp.name] = objProp.value
		})
	}
	// let additinalConfig = {...customConfig};
	// const WhiteLabelConfig = await NativeModules.WhiteLabel.getConfig();
	// if(WhiteLabelConfig && Object.keys(WhiteLabelConfig).length !== 0){
	// 	additinalConfig = {
	// 		...WhiteLabelConfig,
	// 		...additinalConfig
	// 	};
	// }
	//Analytics
	this.amplitudeApiKey = "c246a89b237284e8bd4490e071b91beb";
	this.slug="gurucan";

	if(customConfig && Object.keys(customConfig).length !== 0) {
		for (const option in customConfig) {
			if (Object.hasOwnProperty.call(customConfig, option)) {
				this[option] = customConfig[option];
			}
		}
	}
}
