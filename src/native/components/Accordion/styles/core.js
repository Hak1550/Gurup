import EStyleSheet from "react-native-extended-stylesheet"

export default EStyleSheet.create({
	accordion: {
		paddingVertical: 19,
		borderBottomColor: "#c4c4c4",
		borderBottomWidth: 1,
	},
	accordion__head: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	"accordion__head__arrow-icon": {
		fontSize: 14,
		color: "$textColor",
	},
	"accordion__head__arrow": {
		width: 25,
		height: 25,
		borderRadius: 13,
		borderWidth: 1,
		borderColor: "$textColor",
		alignItems: "center",
		justifyContent: "center"
	},
	"active-icon": {
		color: "$textColor",
		borderColor: "$textColor",
	},

	accordion__body: {
		marginTop: 24,
		// marginBottom: 24
	},
	"accordion__head-title": {
		fontFamily: "Main-Medium",
		fontSize: 18,
		flex: 1,
		color: "$textColor",
		flexWrap: 'wrap'
	},
	"accordion__head-text": {
		fontSize: 14,
		color: "$additionalTextColor",
		flex: 1,
		flexWrap: 'wrap'
	},
})
