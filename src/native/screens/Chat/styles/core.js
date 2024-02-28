import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	'chat__message-wrapper': {
		// paddingTop: 16,
		// paddingBottom: 16,
		paddingHorizontal: Screen320() ? 14 :14,
	},
	'chat__send-input': {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0
	},
	'chat__upload-progress' : {
		position: "absolute",
		top: 0,
		width: "100%"
	},
	'chat__day':{
		alignSelf: "center", 
		fontSize: 12,
		color: "$additionalTextColor"
	},
	'no-messages': {
		overflow:'hidden',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	'no-messages__title': {
		fontSize: 20,
		// color: '$mainContent',
		fontFamily: 'Main-Bold',
		marginBottom: 10,
	},
	'no-messages__text': {
		fontSize: 16,
		color: '$textColor',
	},
	'chat__load-more': {
		marginVertical: 10
	}
});
