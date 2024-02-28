import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
	"marathon-card__container": {
		paddingVertical: 11,
		backgroundColor: "$itemBackground",
		borderRadius: 10,
		marginBottom: 14,
		paddingBottom: 15
	},
	"marathon-card__disabled": {
		opacity: 0.5
	},	
	"marathon-card__header": {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
		height: 16,
		// marginBottom: 7,
	},
	"marathon-card__header-text": {
		fontSize: 14,
		color: "$darkBgTextColor",
	},
	"marathon-card__icon": {
		fontSize: 12,
		color: "$additionalTextColor",
		marginLeft: 5
	},
	"marathon-card__header-block": {
		flexDirection: "row",
		alignItems: "center"	
	},
	"marathon-card__content-title": {
		color: "$darkBgTextColor",
		fontSize: 14,
		paddingHorizontal: 15,
		fontFamily: "Main-Medium",
		marginBottom: 4,
	},
	"marathon-card__content-img": {
		marginBottom: 8,
	},
	"marathon-card__content-text": {
		paddingHorizontal: 15,
		color: "$darkBgTextColor",
	},
	"marathon-card__complete-text": {
		fontFamily: "Main-Bold",
		color: "$darkBgTextColor",
		textAlign: 'right',
		marginTop: 8,
	},
	"marathon-card__complete-icon": {
		color: "#36E49B",
	},
	"marathon-card__img": {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 10,
	},
	"marathon-card__overlay": {
		opacity: 0.5,
		backgroundColor: "#000000",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: 10,

	}
})
