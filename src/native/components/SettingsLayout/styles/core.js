import EStyleSheet from 'react-native-extended-stylesheet';
import {isTall, Screen320, isIphoneX} from "../../../utils";

export default EStyleSheet.create({
	"layout-settings": {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '$screenBackgroundColor',
	},
	"layout-settings__head": {
		justifyContent: Screen320() ? 'center' : null,
		backgroundColor: "$screenBackgroundColor",
		maxWidth: 500
	},
	"layout-settings__head-avatar": {
		paddingBottom: 9
	},
	"layout-settings__topline-wrapper": {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		paddingLeft: 32,
		paddingRight: 32,
	},
	"layout-settings__topline-logo": {
		fontFamily: "Main-Regular",
		fontSize: 18,
		color: "$textColor",
	},
	"layout-settings__topline-user": {
		flexDirection: "row",
		alignItems: "center"
	},
	"layout-settings__topline-user-name": {
		color: '$textColor',
		opacity: 0.7,
		marginRight: 8
	},
	"layout-settings__head-content-userbtn": {
		marginLeft: 21,
		marginBottom: 9,
		flex: 1
	},
	"layout-settings__head-content-username": {
		fontFamily: "Main-Regular",
		fontSize: 16,
		color: '$textColor',
		paddingBottom: 9,
	},
	"layout-settings__head-content-email": {
		fontFamily: "Main-Regular",
		fontSize: 14,
		color: '$textColor',
		marginTop: 0,
		paddingBottom: 9
	},
	"layout-settings__head-content-coins": {
		flexDirection: 'row',
		alignItems: 'center',
	},
	"layout-settings__head-content-coins__count": {
		fontFamily: "Main-Bold",
		color: '$textColor',
		fontSize: 14,
		marginRight: 18
	},
	'layout-settings__head-content-coins__button': {
		width: 28,
		height: 28,
		shadowColor: "rgb(0,0,0)",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderRadius: 14,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	'layout-settings__head-content-coins__button-icon': {
		fontFamily: 'Main-Bold',
		fontSize: 18,
		color: '$accent'
	},
	"layout-settings__head-content-btn": {
		backgroundColor: "#fff",
		width: 39,
		height: 39,
		borderRadius: 20,
		marginTop: 9
	},
	"layout-settings__head-content-icon": {
		color: "#fe3490",
		fontSize: 16,
		paddingTop: 10,
		paddingBottom: 10,
		paddingVertical: 10
	},
	'layout-settings__head-content-label':{
		color: "$additionalTextColor",
		fontSize: 12
	},
	'layout-settings__head-content-input-name': {
		color: '$textColor',
		fontSize: 16,
		// borderBottomColor: Screen320() ? '$additionLight' : 'rgba(255, 255, 255, .4)'
		borderBottomColor: "$additionalColor",
		borderBottomWidth: 1,
		paddingBottom: 8,
		// fontFamily: 'Main-Regular'
		fontFamily: 'Main-Regular',
	},
	'layout-settings__head-content-input-email': {
		color: '$textColor',
		fontSize: 14,
		// borderBottomColor: Screen320() ? '$additionLight' : 'rgba(255, 255, 255, .4)',
		borderBottomColor: "$additionalColor",
		borderBottomWidth: 1,
		paddingBottom: 8,
		fontFamily: 'Main-Regular'
	},
	"layout-settings__head-overlay": {
		position: "absolute",
		width: "100%",
		height: "100%",
		opacity: 0.8,
	},
	"layout-settings__head-content": {
		flexDirection: "row",
		paddingLeft: 14,
		marginTop: 15,
		right: 0,
		left: 0,
		// paddingBottom: '5%',
		alignItems: 'center'
	},
	"layout-settings__head-overlay_solid":{
		opacity: 1,
	},
	"layout-settings__body": {
		backgroundColor: "$screenBackgroundColor",
		// bottom: 0,
		// height: isTall() ? "64%" : "70%",
		marginTop: 26,
		width: "100%",
		overflow: 'hidden',
		flex: 2
	},
	'layout-settings__edit-profile-btn': {
		position: 'absolute',
		// bottom: Screen320() ? 21 : isTall() ? "5%" : "5%",
		bottom: 16,
		right: 16,
		borderRadius: 40,
		// shadowColor: '$shadowColor',
		shadowRadius: 16,
		shadowOpacity: 0.6,
		shadowOffset: {width: 0, height: 4},
		elevation: 1,
	},
	'layout-settings__edit-profile-content': {
		overflow: 'hidden',
		borderRadius: 40,
		paddingVertical: Screen320() ? 18 : 24,
		paddingLeft: Screen320() ? 18 : 27,
		paddingRight: Screen320() ? 18 : 24,
		backgroundColor: "$accent"
	},
	"layout-settings__edit-profile__gradient-overlay": {
		position: "absolute",
		width: Screen320() ? 55 : 73,
		height: Screen320() ? 55 : 73,
	},
	'edit-profile-btn__icon': {
		fontSize: Screen320 ? 18 : 24,
		color: '$screenBackgroundColor'
	}
});
