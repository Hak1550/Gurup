import i18n from "i18next"
import { reactI18nextModule } from "react-i18next"
import LngDetector from "i18next-browser-languagedetector"
import Backend from "i18next-xhr-backend"
import tldDetector from './tldDetector';
let languageDetector = new LngDetector();
languageDetector.addDetector(tldDetector);

i18n.use(languageDetector)
	.use(Backend)
	.use(reactI18nextModule)
	.init({
		detection:{
            order: ['querystring', 'cookie', 'localStorage', 'tldDetector','navigator', 'htmlTag', 'path', 'subdomain']
        },
		ns: [
			"app_basic",
			"web_quiz",
			"app_quiz",
			"web_exercises",
			"web_trainings",
			"web_chats",
			"web_layout",
			"chats",
			"basic",
			"web_courses",
			"web_basic",
			"web_articles",
			"web_settings",
			"web_nutrition",
			"web_welcome",
			"web",
			"web_sign",
			"dashboard",
			"alerts",
			"errors"
		],
		// defaultNS: "translation",
		backend: {
			loadPath: "/translations/{{lng}}/{{ns}}.json",
		},
		fallbackLng: "en",
		react:{
			wait: true
		}
	})

export default i18n
