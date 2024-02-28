import EStyleSheet from 'react-native-extended-stylesheet';
import {isTall, Screen320} from "../../../utils";

export default EStyleSheet.create({
	"top-bar-icon":{
		minWidth:70
	},
	// Growing icons
	// "top-bar-icon__tab-icon": {
	// 	color: "$additionalTextColor",
	// 	fontSize: isTall() ? 26 : 18,
	// 	textAlign: "center"
	// },
	// "top-bar-icon__tab-text": {
	// 	textAlign: "center",
	// 	color: "$additionalTextColor",
	// 	fontSize: isTall() ? 10 : 8,
	// },
	"top-bar-icon__tab-icon": {
		color: "$additionalTextColor",
		fontSize: isTall() ? 26 : 22,
		textAlign: "center"
	},
	"top-bar-icon__tab-text": {
		textAlign: "center",
		color: "$additionalTextColor",
		fontSize: 10,
	},
	"top-bar-icon__tab-icon-active": {
		color: "$accent",
		fontSize: isTall() ? 26 : 22,
		textAlign: "center",
	},
	"top-bar-icon__tab-text-active": {
		textAlign: "center",
		color: "$accent",
		fontSize: 10,
	}
});
