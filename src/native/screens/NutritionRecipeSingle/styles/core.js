import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
	recipe__content: {
		// paddingBottom: 14,
		// width: "100%",
		flexGrow: 1
	},
	recipe__description:{
		marginBottom:10,
		color: "$textColor",
	},
	recipe__top:{
		paddingHorizontal: 14,
	},
	recipe__image: {
		width: "100%",
		aspectRatio: 16/9,
		marginBottom: 20
	},
	"recipe__image-shadow": {
		position: "absolute",
		bottom: 0,
		width: "100%"
	},
	recipe__title: {
		fontSize: 20,
		color: "$textColor",
		marginBottom: 7,
	},
	recipe__cookTime: {
		fontFamily: "Main-Bold",
		// marginBottom: 18,
	},
	"recipe__image-conent":{
		position: "absolute",
		bottom: 0,
		paddingLeft: 15
	},
	recipe__subtitle: {
		fontSize: 16,
		fontFamily: "Main-Bold",
		marginVertical: 9,
	},
	"recipe__nutrition-value": {
		flexDirection: "row",
		borderBottomColor: "$additionalTextColor",
		borderTopColor: "$additionalTextColor",
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginBottom: 20
	},
	"recipe__nutrition-value__item": {
		alignItems: "center",
		flexGrow: 1,
		// borderRightColor: "$additionalTextColor",
		// borderRightWidth: 1,
	},
	"recipe__nutrition-value__item-title": {
		fontFamily: "Main-Bold",
		color: "$additionalTextColor",
	},
	"recipe__nutrition-value__item-value": {
		fontFamily: "Main-Bold",
		color: "$textColor",
	},

	"recipe__no-border": {
		borderRightWidth: 0,
	},
	"recipe__pale-text": {
		color: "$additionalTextColor",
	},
	recipe__ingredients: {
		width: "60%",
	},
	recipe__ingredient: {
		flexDirection: "row",
		borderBottomColor: "$additionalTextColor",
		borderBottomWidth: 1,
		paddingVertical: 11,
		justifyContent: "space-between",
	},
	"recipe__ingredient-name": {
		fontFamily: "Main-Bold",
		color: "$additionalTextColor",
	},
	"recipe__ingredient-unit": {
		flexDirection: "row",
	},
	"recipe__ingredient-unit__text": {
		fontFamily: "Main-Bold",
	},
})
