import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"welcome__auth": {
		flex: 1,
		paddingBottom: 60,
		justifyContent: "center",
		// alignItems: "flex-start"
	},
	"welcome__signin": {
		flexDirection: "row",
		justifyContent: "center",
		marginBottom: Screen320() ? 12 : 20
	},
	"welcome__signup":{
		flexDirection: "row",
		justifyContent:"space-around",
		marginBottom: "auto",
		marginTop: 15
	},
	"welcome__signin-button": {
		// marginRight: 16
	},
	"welcome__signup-text": {
		color: "$additionalTextColor",
		marginRight: 5
	},
	"welcome__signup-link": {
		color: "$additionalTextColor",
		fontSize: 14
	},
	"layout-welcome": {
		flexDirection: 'column',
		height: "100%",
		width: "100%",
		backgroundColor: "$screenBackgroundColor",
		position: 'relative'
	},
	"layout-welcome__head": {
		flex: Screen320() ? 0.7 : 1,
		justifyContent: 'center',
		backgroundColor: "$screenBackgroundColor",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10
	},
	"layout-welcome__head-img": {

	},
	"layout-welcome__head-text": {
		fontSize: 40,
		textAlign: "center"
	},
	"layout-welcome__head-img_vertical":{
		height: '100%'
	},
	"layout-welcome__head-img_horizontal": {
		width: '100%'
	},
	"layout-welcome__body": {
		backgroundColor: "$screenBackgroundColor",
		paddingTop: 15,
		paddingLeft: 15,
		paddingRight: 15,
		flex: 2
	},
});
