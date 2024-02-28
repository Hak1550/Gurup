import EStyleSheet from 'react-native-extended-stylesheet';
import {Platform} from "react-native";
import { isTall } from "../../../utils"

export default EStyleSheet.create({
	'video': {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#000',
		overflow: "hidden",
		// flex: 1,
	},
	'video__center-button': {
		position: 'absolute',
		backgroundColor: '$screenBackgroundColor',
		width: 55,
		height: 55,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center"
	},
	'video__play-icon': {
		fontSize: 22,
		color: '$accent',
		marginLeft: 3,
	},
	'video__center-icon':{
		fontSize: 22,
		color: '$accent',
	},
	'full-screen-button': {
		position: 'absolute',
		bottom: 12,
		right: 16,
		zIndex: 10
	},
	'video__controls__overlay': {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: "#000000",
		opacity: 0.6
	},
	'video__bottom-controls': {
		height: 150,
		width: "100%",
		zIndex: 10,
		justifyContent: "flex-end",
		// alignItems: "center",
		position: "absolute",
		bottom: 0,
		paddingBottom: 25,
	},
	'video__bottom-controls-inner': {
		height: 70,
		width: "100%",
		flexDirection: "column",
		paddingHorizontal: 20,
		paddingVertical: 5,
		// justifyContent: "flex-end"
	},
	'video__top-controls': {
		position: "absolute",
		height: 70 ,
		width: "100%",
		top: 0,
		zIndex: 10,
		justifyContent: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: isTall() ? 30 : 0,
	},
	"video__back": {
		flexDirection: "row",
		alignItems: "center",
	},
	"video__back-icon": {
		color: "#fff",
		fontSize: 24
	},
	"video__back-text": {
		fontSize: 18,
		marginLeft: 10,
		color: "#fff"
	},
	"video__fullscreen-icon": {
		color: '#fff',
		fontSize: 24,
		// alignSelf: "flex-end",
		// marginRight: 10,
		marginLeft: 10
	},
	"video__dropdown-control":{
		width: 80,
		borderBottomWidth: 0,
		paddingBottom: 0
	},
	"video__dropdown-label": {
		color: "#fff",
	},
	"video__dropdown-arrow": {
		color: "#fff",
		display: "none"
	},
	"video__dropdown-list": {
		width: 80,
		backgroundColor: "#F2F2F2",
	},
	"video__dropdown-item": {
		color: "#fff",
		backgroundColor: "transparent"
	},
	"video__bottom-controls__time__wrap": {
		flexDirection: "row",
		paddingLeft: Platform.OS === "ios" ? 2 : 16
		// justifyContent: "space-between"
	},
	"video__bottom-controls__time-separator": {
		marginHorizontal: 5,
		color: "#fff",
	},	
	"video__bottom-controls__time": {
		color: "#fff"
	}, 
	"video__bottom-controls__playback-wrap": {
		flexDirection: "row",
		alignItems: "center"
	}, 
	"video__bottom-controls__quality-icon": {
		fontSize: 24,
		color: "#fff",
		marginLeft: 15
	},
	"video__bottom-controls__quality-list": {
		backgroundColor: "#F2F2F2",
		// height: 100,
		width: 80,
		position: "absolute",
		bottom: 30,
		alignSelf: "center",
		borderRadius: 10,
		alignItems: "center",
		paddingHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
		elevation: 2
	},
	"video__bottom-controls__quality-label": {
		fontSize: 14,
		color: "#838383",
		marginBottom: 5,
	},
	"video__bottom-controls__quality-option": {
		flexDirection: "row",
		alignItems: "center",
	},
	"video__bottom-controls__quality-checked": {
		marginRight: 4,
		opacity: 0
	}
})
