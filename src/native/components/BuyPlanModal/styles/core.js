import EStyleSheet from 'react-native-extended-stylesheet';
import {isTall} from "../../../utils";

export default EStyleSheet.create({
	"plans-modal": {
		flex: 1,
		flexDirection: 'column',
		// justifyContent: 'center',
		// alignItems: 'center',
		margin: 0,
		backgroundColor: "$screenBackgroundColor"
	},
	'plans_modal__header-overlay': {
		backgroundColor: '$screenBackgroundColor'
	},
	"plans-modal__header":{
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 36,
		paddingTop: isTall() ? 30 : 0,
		width: "100%",
		height: 100
	},
	"plans-modal__header-title":{
		alignItems: "center",
		justifyContent: "center"
	},
	"plans-modal__header-title-big": {
		color:"#fff",
		fontSize: 16
	},
	"plans-modal__header-title-small": {
		color:"#fff",
		fontSize: 12
	},
	"plans-modal__header-back":{
		position: "absolute",
		left: 18,
		top: isTall() ? 53 : 40
	},
	"plans-modal__header-back-icon": {
		color:"#fff",
		fontSize: 36,
	},
	"plans-modal__footer":{
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 36,
		width: "100%",
		height: 60
	},
	"plans-modal__footer-back":{
		flexDirection:"row",
		alignItems: "center",
		justifyContent: "center",
	},
	"plans-modal__footer-back-text":{
		color:"$textColor",
		fontSize: 14,
		textDecorationLine: 'underline',
	},
	"plans-modal__footer-back-icon":{
		color:"$textColor",
		fontSize: 14,
		marginRight: 5
	}
});
