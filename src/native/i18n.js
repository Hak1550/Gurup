import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import * as Localization from "expo-localization";
import Backend from "i18next-xhr-backend";

export const languageDetector = {
	type: "languageDetector",
	async: true, // flags below detection to be async
	detect: callback => {
		// console.log("Localization ",Localization);
		return /*'en'; */ Localization.getLocalizationAsync().then(({ locale }) => {
			callback(locale);
		});
	},
	init: () => {},
	cacheUserLanguage: () => {},
};


export const initI18n = () => new Promise((resolve, reject)=>{
	i18n.use(Backend)
		.use(languageDetector)
		.use(reactI18nextModule) // passes i18n down to react-i18next
		.init({
			react: {
				wait: true,
				// bindStore: true,
				// bindI18n: 'languageChanged'
			},
			ns: [
				"app_articles",
				"app_courses",
				"app_nutrition",
				"app_marathon",
				"app_basic",
				"app_tariff",
				"app_chats",
				"app_login",
				"app_notification",
				"app_quiz",
				"app_support",

				
				"chats",
				"courses",
				//TODO: Ilya zdelaet
				"articles",
				"basic",
				"broadcast",
				
				"lessons",
				"log_in_page",
				"main_menu",
				"payments",
				"statistics_analytics",
				"errors",
				"alerts"
				
			],
			fallbackLng: "en",
			backend: {
				loadPath: "https://app.gurucan.ru/translations/{{lng}}/{{ns}}.json",
				// loadPath: "https://app.egor.bk.gurucan.ru/translations/{{lng}}/{{ns}}.json",
			},

			// keySeparator: false, // we do not use keys in form messages.welcome

			interpolation: {
				escapeValue: false, // react already safes from xss
			},
		}).then(()=>{
			resolve();
		});
});

export default i18n;
