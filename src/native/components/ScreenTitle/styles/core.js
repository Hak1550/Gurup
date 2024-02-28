import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen320, isTall } from "../../../utils"

export default EStyleSheet.create({
	"screen-title__wrapper": {
		flexDirection: "row",
		// justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: isTall() ? 35 : 25,
		paddingLeft: 14,
		paddingRight: 14,
	},
	"screen-title__wrapper-center": {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 30,
		paddingLeft: 32,
		paddingRight: 32
	},
	"screen-title__logo": {
		fontFamily: 'Main-Bold',
		fontSize: 14,
		color: "$additionalTextColor",
		flexWrap: 'wrap',
		...(!isTall() ? {
			marginLeft: "auto",
			marginRight:  "auto",
			textAlign: "center",
			flex: 1
		}: {})
	},
	"screen-title__logo-center": {
		textAlign: "center",
	},
	"screen-title__user": {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 8,
		marginLeft: "auto",
		...(!isTall() ? {
			// flex: 1,
			width: 45,
			justifyContent: "flex-end"
		} : {})
	},
	"screen-title__user-name": {
		color: '$additionalTextColor',
		marginRight: 8
	},
	"screen-title__navigation-left": {
		flexDirection: "row",
		alignItems: "center",
		// maxWidth: 250,
		paddingRight: 80,
		...(!isTall() ? {
			// flex: 1,
			width: 45,
			paddingRight: 0,
		} : {})
	},
	"screen-title__navigation-arrow-icon": {
		fontSize: 30,
		color: "$additionalTextColor",
		marginRight: 10,
		...(!isTall() ? {
			// flex: 1,
			justifyContent: "flex-start"
		} : {})
	}
});