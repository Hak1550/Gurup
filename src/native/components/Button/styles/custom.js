import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"button": {
		borderRadius: 30,
		overflow: "hidden",
		alignItems:"center",
		flexDirection:"row",
		justifyContent: 'center',
		paddingHorizontal: Screen320() ? 18 : 29,
		paddingTop: Screen320() ? 9 : 18,
		paddingBottom: Screen320() ? 12 : 20
	},
	"button__inner": {
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: "center",
	},
	'round-button': {
		overflow: "hidden",
		alignItems: "center",
		flexDirection: "row",
		justifyContent: 'center',
		paddingVertical: 19,
		paddingHorizontal: 20,
	},
	'round-button__progress': {
		position: 'absolute'
	},
	'round-button_small': {
		height: 55,
		width: 55,
		borderRadius: 27.5
	},
	"button__text":{
		fontSize: 14,
		color:"#fff",
	},
	"button_theme_white":{
		backgroundColor: '#fff'
	},
	"button__text_theme_white": {
		// marginRight: 8,
		color: "$accent",
		fontFamily: 'Main-Regular'
	},
	"button_theme_accent": {
		backgroundColor: '$accent'
	},
	"button__text_theme_accent": {
		// marginRight: 8,
		color: "#fff",
		fontFamily: 'Main-Regular'
	},
	"button__icon_theme_accent": {
		color: "#fff",
	},
	"button__text_theme_pink-gradient": {
		color: "#fff"
	},
	"button__text_theme_facebook":{
		color: "#fff",
		fontSize: 20
	},
	"button_theme_facebook": {
		backgroundColor: "#3d5998",
	},

	"button_size_large": {
		paddingHorizontal: 29,
		paddingTop: 18,
		paddingBottom: 20
	},

	"button_size_medium": {
		//...
	},
	"button_size_small": {
		//...
		paddingHorizontal: 29,
		paddingTop: 10,
		paddingBottom: 10
	},
	"button_status_disabled": {
		backgroundColor: '#9f9f9f'
	},
	"button__preloader": {
		position: "absolute"
	}
});
