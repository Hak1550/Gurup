import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320, isTall} from "../../../utils";

export default EStyleSheet.create({
	"button": {
		borderRadius: 50,
		overflow: "hidden",
		alignItems:"center",
		flexDirection:"row",
		justifyContent: 'center',
		paddingHorizontal: Screen320() ? 18 : 29,
		height: 52,
		// paddingTop: Screen320() ? 9 : 18,
		// paddingBottom: Screen320() ? 12 : 20
	},
	"button__inner":{
		flexDirection: "row",
		justifyContent: 'center',
		alignItems: "center",
	},
	"button__preloader":{
		position: "absolute"
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
		fontSize: 18,
		color:"#fff",
	},
	"button_theme_white":{
		backgroundColor: '#fff'
	},
	"button__text_theme_white": {
		// marginRight: 8,
		color: "$accent",
		fontFamily: 'Main-Bold'
	},
	"button_theme_accent": {
		backgroundColor: '$accent'
	},
	"button__text_theme_accent": {
		// marginRight: 8,
		color: "$screenBackgroundColor",
		fontFamily: 'Main-Regular',
		fontSize: 16,
		textAlign: "center"
	},
	"button__icon_theme_accent": {
		color: "$screenBackgroundColor",
	},
	
	"button__text_theme_pink-gradient": {
		color: "#fff"
	},
	"button__text_theme_facebook":{
		color: "#fff",
		fontSize: 20
	},
	"button__icon": {
		marginRight: 10
	},
	"button_theme_facebook": {
		backgroundColor: "#3d5998",
	},
	"button_theme_ghost-accent": {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: "$additionalTextColor"
	},
	"button__text_theme_ghost-accent": {
		color: "$accent",
		fontFamily: 'Main-Regular',
		fontSize: 16,
		textAlign: "center",
	},
	"button__icon_theme_ghost-accent": {
		color: "$accent",
	},
	"button_theme_ghost": {
		backgroundColor: 'transparent',
		borderWidth: 2,
		borderColor: "$additionalTextColor"
	},
	"button__text_theme_ghost": {
		color: "$additionalTextColor",
		fontFamily: 'Main-Regular',
		fontSize: 16,
		textAlign: "center",
	},
	"button__icon_theme_ghost": {
		color: "$additionalTextColor",
	},
	"button_size_medium": {
		//...
	},
	"button_size_small": {
		//...
		height: 43
	},
	"button_status_disabled": {
		opacity: 0.5
	}
});
