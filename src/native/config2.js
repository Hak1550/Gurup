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

