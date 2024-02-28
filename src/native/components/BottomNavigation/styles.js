import EStyleSheet from 'react-native-extended-stylesheet';
import {isTall, Screen320} from "../../utils";

export default EStyleSheet.create({
	"bottom-navigation-rectangle": {
		backgroundColor: "$screenBackgroundColor",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingLeft: isTall() ? 16 : 8,
		paddingRight: isTall() ? 16 : 8,
		alignContent: "center",
		paddingBottom: isTall() ? 16 : 0,
		height: 'auto',
		paddingTop: isTall() ? 12 : 0,
		borderTopWidth: 0
	},
	"bottom-navigation__tab-icon": {
		color: "#000",
		fontSize: 26,
		textAlign: "center"
	},
	"bottom-navigation__tab":{
		height: 42,
	},
	"bottom-navigation__tab-text": {
		textAlign: "center",
		color: "#958FAA",
		fontSize: 14
	},
	"bottom-navigation__tab-icon-active": {
		color: "#000",
		fontSize: 26,
		textAlign: "center"
	},
	"bottom-navigation__tab-text-active": {
		textAlign: "center",
		color: "#000",
		fontSize: 14
	}
});
