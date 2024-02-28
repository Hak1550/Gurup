import EStyleSheet from "react-native-extended-stylesheet"
import { Screen320 } from "../../../utils"

export default EStyleSheet.create({
	"layout-rounded": {
		flexDirection: 'column',
		height: "100%",
		width: "100%",
		backgroundColor: "$screenBackgroundColor",
		position: 'relative'
	},
	"layout-rounded__back":{
		position: "absolute", 
		top: 0,
		bottom:0,
		justifyContent: "center", 
		left: 30, 
	},
	"layout-rounded__back-icon": {
		color: "#fff",
		fontSize: 30
	},
	"layout-rounded__head": {
		flex: Screen320() ? 0.7 : 1,
		justifyContent: 'center',
		backgroundColor: "$screenBackgroundColor"
	},
	"layout-rounded__head__button": {
		color: "#fff",
	},
	"layout-rounded__logo": {
		fontFamily: "Main-Regular",
		fontSize: 36,
		color: "$textColor",
		textAlign: "center",
		paddingHorizontal: 18,
	},
	"layout-rounded__head-overlay": {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0.8,
	},
	"layout-rounded__head-overlay_solid": {
		opacity: 1,
	},
	"layout-rounded__body": {
		backgroundColor: "$screenBackgroundColor",
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		flex: 2.5
	},
	
})
