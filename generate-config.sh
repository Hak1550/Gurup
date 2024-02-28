#!/bin/bash
touch ./src/native/app2.json
cat > ./src/native/app2.json <<- "EOF"
{
  "expo": {
    "name": "gurucancore",
    "description": "This project is really great.",
    "slug": "gurucancore",
    "privacy": "public",
    "sdkVersion": "32.0.0",
    "platforms": [
      "ios",
      "android"
    ],
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/core/icon.png",
    "splash": {
      "image": "./assets/core/splash.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0,
      "enabled": true,
      "checkAutomatically": "ON_LOAD"
    },
    "assetBundlePatterns": [
      "assets/*",
      "assets/fonts/*",
      "**/*"
    ],
    "ios": {
      "bundleIdentifier": "com.gurucan.gurucan",
      "supportsTablet": false,
      "publishBundlePath": "ios/gurucancore/Supporting/shell-app.bundle",
      "publishManifestPath": "ios/gurucancore/Supporting/shell-app-manifest.json"
    },
    "android": {
      "package": "com.gurucan.gurucan",
      "publishBundlePath": "android/app/src/main/assets/shell-app.bundle",
      "publishManifestPath": "android/app/src/main/assets/shell-app-manifest.json"
    },
    "packagerOpts": {
      "projectRoots": "",
      "config": "rn-cli.config.js"
    },
    "scheme": "expefc524f22fc4446bbad299b781f421ed",
    "isDetached": true,
    "detach": {
      "iosExpoViewUrl": "https://s3.amazonaws.com/exp-exponent-view-code/ios-v2.10.6-sdk32.0.0-e50ee83a-41bd-4965-b067-4c815a3b3fcc.tar.gz",
      "androidExpoViewUrl": "https://s3.amazonaws.com/exp-exponent-view-code/android-v2.10.8-sdk32.0.0-bca0f957-de78-44c8-91ed-f3151372d79d.tar.gz"
    }
  }
}
EOF

touch ./src/native/config2.js
cat > ./src/native/config2.js <<- "EOT"
export function AppConfig() {
	this.appName = "Gurucan Core"
	this.description = "Gurucan"
	this.logo = false
	this.colors = {
		$accent: "#27ACF6",
		$contentPale: "#484545",
		$additionLight: "#E1DEEC",
		$mainGradientColorOne: "#FF03A6",
		$mainGradientColorSecond: "#FF7144",
		$additionColor: "#DAE3EE",
		$mainContent: "#462163",
		$textColor: "#484545",
		$shadowColor: "#8F3184",
		$greyColor: "#E9E7EE",
		$screenBackgroundColor: "#F2F7FA",
		$successColor: "#65C691",
		$headerColor: "#FF4C65",
		$lessonItemActiveColor: "#FF4C65",
		$marathonHeaderColor: "#4B4B4B",
		$buttonColor: "#27ACF6",
		$headerTextColor: "#fff",
	}
	this.headerBackgroundStyle = "image" // Варианты: image, color, gradient
	this.lessonItemBackgroundStyle = "gradient" // Варианты: image, color, gradient

	/**
	 |--------------------------------------------------
	 | Если в приложение у блогера другой шрифт, то заменяем шрифты в папке assets/fonts/custom.
	 |
	 | Если необходимо добавить новое начертание, то добавляем шрифт в папку assets/fonts/custom
	 | и добавляем в this.fontsCustom новое начертание
	 |--------------------------------------------------
	 */
	this.fontsCore = {
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
}

EOT

touch ./src/requester/config2.js
cat > ./src/requester/config2.js <<- "EOF"
export const baseURL = 'https://test7.gurucan.ru/api/';
EOF