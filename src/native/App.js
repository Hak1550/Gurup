import React from 'react'
import { Provider } from 'react-redux'
// import {
// 	Updates,
// } from 'expo'
import * as Updates from 'expo-updates';
import * as Font from 'expo-font'
import * as FileSystem from 'expo-file-system';
import {Asset} from 'expo-asset';

import { NativeModules, Platform, LogBox } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orientation from 'react-native-orientation-locker';

//Нужно обновить сентри!
// import { Sentry } from 'react-native-sentry'
// import * as Sentry from "@sentry/react-native";
import LottieView from 'lottie-react-native'
import { ThemeProvider } from "styled-components"
import store from '../store/storeNative'

import appConfig from "./app.json";
import Root from './containers/App'
import BuildStyles from './styles'
import { checkInfluencer, init, setDeviceData } from '../actions/sign'
import { updateBaseUrl } from '../requester'
import { chooseTemplate, setTheme, config, paletteNumber } from "./styles/variables"
import { initI18n } from './i18n'
import EStyleSheet from "react-native-extended-stylesheet"
import colorPalette, {legacyTemplates, baseTemplates, gurucanTheme} from "./colorsPalette"
import { initPushToken, identify, addDollarSignToColors, setIsCustomApp } from "./utils"
import { GoogleSignin } from '@react-native-community/google-signin';
// Sentry.init({ dsn: 'https://60588a97e25a47718705296325913e87@sentry.io/1402416'});
// Sentry.captureMessage("Hello Sentry!");
import * as Segment from 'expo-analytics-segment';
import {manifest} from "expo-updates";
const { id, sdkVersion, revisionId, releaseChannel } = manifest;
import * as Device from 'expo-device';
const {manufacturer,brand, modelName,modelId, deviceYearClass, totalMemory,osName,osVersion } = Device;

import i18n from 'i18next';
import moment from "moment";

import momentDurationFormatSetup from "moment-duration-format";
import setCustomLocales from "./utils/durationLocales"
momentDurationFormatSetup(moment);
setCustomLocales(moment)
import 'moment/locale/ru';
import 'moment/locale/pl';
import 'moment/locale/es';
import 'moment/locale/fr';
import 'moment/locale/pt';
import 'moment/locale/it';
import 'moment/locale/de';
import 'moment/locale/fi';
import 'moment/locale/ja';
import 'moment/locale/pt-br';
import 'moment/locale/el';
import 'moment/locale/hi';

// const supported_locales = ['ru','en','pl', 'es', 'fr', 'pt'];
export const supported_locales = ['ru','en','pl', 'es', 'fr', 'pt', 'it', 'de', 'nl', 'fi', 'ja', 'pt-br', 'el'];

// moment.now = function () {
// 	return "2020-04-06T23:30:00";
// }
import { PubSubProvider } from './utils/pubsub';
import influencer from '../reducers/influencer';

// console.log("expo constants")

export default class App extends React.Component {
	constructor(props) {
		super(props)
		// OneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG, OneSignal.LOG_LEVEL.DEBUG);
		this.state = {
			assetsLoaded: false,
			isAuthorized: false,
			shouldRender: true,
			theme: {},
			influencer: {},
			cachedTheme: {},
		}
		Orientation.lockToPortrait();
	}

	componentDidMount = () => {
		// const locale = Platform.select({
		// 	ios: NativeModules.SettingsManager.settings.AppleLocale,
		// 	android: NativeModules.SettingsManager.settings.AppleLocale
		// })
		// console.log("PHONE LOCALE", locale)
		// moment.locale(locale);
		this._cacheResourcesAsync()
	}

	_cacheResourcesAsync = () => {
		new Promise(async (resolve) => {

			const isCustomApp = await setIsCustomApp()
			this.setState({ isCustomApp })

			const dispatch = store.dispatch
			// console.disableYellowBox = true;
			LogBox.ignoreAllLogs();
			try {
				const cachedTheme = await AsyncStorage.getItem("cachedTheme");
				// console.log("Something in storage", cachedTheme);
				if(cachedTheme){
					this.setState({cachedTheme: JSON.parse(cachedTheme)});
				}
			} catch (e) {

			}

			try {
				const update = await Updates.checkForUpdateAsync()
				if (update.isAvailable) {
					// console.log('GOT AN UPDATE')
					await Updates.fetchUpdateAsync()
					// console.log('FETCHED UPDATE')
					await Updates.reloadAsync()
				}
			} catch (e) {
				// handle or log error
				console.log('ERROR FETCHING UPDATE ', e)
			}



			try{
				Segment.initialize({
					androidWriteKey:config.segmentKey?config.segmentKey:"9b9pohFzIrzgPfu6zd2TG6DOVxLzGWAe",
					iosWriteKey:config.segmentKey?config.segmentKey:"9b9pohFzIrzgPfu6zd2TG6DOVxLzGWAe"
				})
				// console.log("segmentKey init")
			}catch(e){
				console.log("error initing segment ",e);
			}
			try {
				GoogleSignin.configure(
					{
						webClientId: '651075387565-s57hrjl14jg7u4k61jr0395ajnb15e8k.apps.googleusercontent.com',
					// 	offlineAccess: true,
					}
				);

				// console.log("GoogleAuth init")
			} catch (e) {
				console.log("error initing GoogleAuth ", e);
			}

			//Initialize base theme
			this.setDefaultTheme();

			try {
				// console.log("APP MOUNT", config.fontsCore)

				await Font.loadAsync(config.appDomain ? config.fontsCustom : config.fontsCore)
			} catch (e) {
				console.error("couldn't load fonts ", e)
			}
			// console.log("go fs");
			await FileSystem.readDirectoryAsync(FileSystem.documentDirectory)
			// console.log("go i18n")
			await initI18n()
			try {
				const currentLocale = i18n.language.split("-")[0].split("_")[0]
				// console.log("went i18n", currentLocale);
				if (supported_locales.includes(currentLocale)){
					moment.locale(currentLocale)
				} else {
					moment.locale("en");
				}
			} catch (error) {
				console.error("Crash with locale select", error)
			}

			try {
				// console.error("_cacheResourcesAsync fl")
				BuildStyles()
				// console.error("_cacheResourcesAsync sb")
				await Asset.fromModule(config.appDomain ? require('./assets/custom/layout-bg.jpg') : require('./assets/core/layout-bg.jpg')).downloadAsync()
				// console.error("_cacheResourcesAsync layout")
				await Asset.fromModule(require('./assets/core/test_video.mp4')).downloadAsync()
			} catch (e) {
				// this.setState({assetsLoaded: true}, resolve);
				console.error("could n't load layout or styles")
			}

			const jwt_token = await AsyncStorage.getItem('jwt_token')

			try {
				let env = await AsyncStorage.getItem("env");
				let subdomain
				if(config.appDomain) {
					// console.log("appDOmain");
					updateBaseUrl({ subdomain , env})
					await dispatch(checkInfluencer({ subdomain, config }))
					.then((influencer) => {
						// console.log("Check influencer call", influencer)
					})
					.catch(() => {
						AsyncStorage.multiRemove(["subdomain", "jwt_token"], async () => {
							dispatch({ type: "CLEAR_ME" })
							// if(pushToken) {
							// 	dispatch(unregisterPushToken(pushToken))
							// }
							Actions.reset("entryOptions");
							// config.appDomain ? Actions.reset("intro") : Actions.reset("influencer")

						})
					})
				} else if (config.influencerId) {
					// console.log("Influncer ID config");
					const {influencerId} = config;
					updateBaseUrl({ influencerId , env})
					await dispatch(checkInfluencer({ influencerId, config })).catch(() => {
						AsyncStorage.multiRemove(["subdomain", "jwt_token"], async () => {
							dispatch({ type: "CLEAR_ME" })
							Actions.reset("entryOptions");
						})
					})
				} else {
					// console.log("no appDOmain ")
					subdomain = await AsyncStorage.getItem('subdomain')
					if (subdomain) {
						// console.log("subdomain ",subdomain,env)
						updateBaseUrl({ subdomain, env })
					}
				}
				// if (!config.appDomain) {
				// 	console.log("no appDOmain ")
				// 	subdomain = await AsyncStorage.getItem('subdomain')
				// 	if (subdomain) {
				// 		console.log("subdomain ",subdomain,env)
				// 		updateBaseUrl({ subdomain, env })
				// 	}
				// } else {
				// 	console.log("appDOmain");
				// 	subdomain = config.appDomain
				// 	updateBaseUrl({ subdomain , env})
				// 	await dispatch(checkInfluencer({ subdomain, config })).catch(() => {
				// 		AsyncStorage.multiRemove(["subdomain", "jwt_token"], async () => {
				// 			dispatch({ type: "CLEAR_ME" })
				// 			// if(pushToken) {
				// 			// 	dispatch(unregisterPushToken(pushToken))
				// 			// }
				// 			Actions.reset("entryOptions");
				// 			// config.appDomain ? Actions.reset("intro") : Actions.reset("influencer")

				// 		})
				// 	})
				// }
			} catch (e) {
				// console.error('fetch infl',e)
				// this.setState({assetsLoaded: true}, resolve);
			}

			if (jwt_token) {
				// console.log("got jwt token", jwt_token)
				await store.dispatch(init({ jwt_token, config })).catch((e) => {

					// console.log("CATCH INIT ERROR", e)
					
					AsyncStorage.multiRemove(["subdomain", "jwt_token"], async () => {
						dispatch({ type: "CLEAR_ME" })
						// if(pushToken) {
						// 	dispatch(unregisterPushToken(pushToken))
						// }
						Actions.reset("entryOptions");
					})
				})
				const { me, influencer } = store.getState()
				if (influencer) {
					this.toggleTheme(influencer);
				}
				if (me && me._id) {
					// try {
					// 	Sentry.setUserContext({
					// 		email: me.email,
					// 		id: me._id,
					// 		username: me.name
					// 	})
					// } catch (error) {
					// 	console.log("SET SENTRY USER ERROR", error)
					// }
					this.setState({ isAuthorized: true, influencer })
					
					try{
						identify(me);
					}catch(e){
						console.log("error with identity ",e);
						console.log("identify ",identify);
					}

					try{
						dispatch(setDeviceData({
							device:JSON.stringify({manufacturer,brand, modelName,modelId, deviceYearClass, totalMemory,osName,osVersion }),
							expoData:JSON.stringify({ id, sdkVersion, revisionId, releaseChannel } )
						}));
					}catch(e){
						console.log("error setting device data ",e);
					}
				} else {
					this.setState({ isAuthorized: false })
				}
			} else {
				const { influencer } = store.getState()
				if (influencer && isCustomApp) {
					this.toggleTheme(influencer);
					// Actions.reset("entryOptions");
				}
				// console.log("no jwt token")
			}
			this.setState({ assetsLoaded: true }, async () => {
				if(config.appDomain) {
					const { influencer } = store.getState();
					const theme = this.getThemeColors(influencer);
					await AsyncStorage.setItem("cachedTheme", JSON.stringify(theme));
				}
				resolve();
			})
		});
	}

	setDefaultTheme = () => {
		setTheme(gurucanTheme.dark);
		this.setState({ theme: gurucanTheme.dark.colors})
	}

	toggleTheme = (school) => new Promise(resolve => {
		// template = "dark";
		// console.log("CHANGING THEME FOR SCHOOL", school)
		config.changeProperty([{ name: "appName", value: school.name }]);
		try {
			chooseTemplate(school);
		} catch (error) {
			console.error("CATCH CHOOSE TEMPLATE ERROR", error)
		}
		this.setThemeForStyledComponents(school);
		this.setState({ shouldRender: false }, () => this.setState({ shouldRender: true }, resolve));
	})

	getThemeColors = ({template, colors: customColors}) => {
		let colorsTemplate;
		if(legacyTemplates[template]){
			colorsTemplate = legacyTemplates[template]
		} else if (baseTemplates[template]) {
			colorsTemplate =  {
				...baseTemplates[template],
				colors: {
					...baseTemplates[template].colors,
					...(customColors && customColors.accent ? {
						accent: customColors.accent
					} : {}),
				}
			}
		} else if(template === "custom") {
			colorsTemplate =  {
				colors: {
					...baseTemplates.light.colors,
					...customColors
				}
			}
		} else {
			colorsTemplate = legacyTemplates.green;
		}

		return colorsTemplate
	}
	setThemeForStyledComponents = ({template, colors: customColors}) => {
		// TODO: Remove code copy-paste and move estylesheet and styled-components theming in one place
		let colorsTemplate;
		if(legacyTemplates[template]){
			colorsTemplate = legacyTemplates[template]
		} else if (baseTemplates[template]) {
			colorsTemplate =  {
				...baseTemplates[template],
				colors: {
					...baseTemplates[template].colors,
					...(customColors && customColors.accent ? {
						accent: customColors.accent
					} : {}),
				}
			}
		} else if(template === "custom") {
			colorsTemplate =  {
				colors: {
					...baseTemplates.light.colors,
					...customColors
				}
			}
		} else {
			colorsTemplate = legacyTemplates.green;
		}

		colorsTemplate = addDollarSignToColors(colorsTemplate);
		this.setState({ theme: colorsTemplate.colors })
	}

	render() {
		const { assetsLoaded, isAuthorized, influencer, cachedTheme, isCustomApp } = this.state
		if (!assetsLoaded) {
			let preloaderProps = {};
			if (cachedTheme.colors && (isCustomApp||config.appDomain)){
				preloaderProps = {
					style: {
						flex: 1,
						backgroundColor: cachedTheme.colors.screenBackgroundColor
					},
					colorFilters: [
						{
							keypath: "Shape Layer 7",
							color: cachedTheme.colors.accent
						},
						{
							keypath: "Shape Layer 8",
							color: cachedTheme.colors.accent
						},
						{
							keypath: "Shape Layer 9",
							color: cachedTheme.colors.accent
						},
						{
							keypath: "Shape Layer 10",
							color: cachedTheme.colors.accent
						}
					]
				}
			}
			if(!config.appDomain && !isCustomApp || ((isCustomApp || config.appDomain) && cachedTheme.colors)) {
				return (
					<LottieView
						autoPlay
						loop={true}
						source={require('./assets/core/animations/loading')}
						{...preloaderProps}
					/>
				);
			} else {
				return null;
			}
		}
		if (this.state.shouldRender) {
			return (
				<Provider store={store}>
					<ThemeProvider theme={this.state.theme}>
						<PubSubProvider>
							<Root 
								isAuthorized={isAuthorized} 
								toggleTheme={this.toggleTheme}
								setDefaultTheme={this.setDefaultTheme}
								influencer={influencer}
							/>
						</PubSubProvider>
					</ThemeProvider>
				</Provider>
			);
		}
		return null;
	}
}
