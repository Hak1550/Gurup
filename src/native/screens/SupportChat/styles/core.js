import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	'problem-report__message-wrapper': {
		// paddingTop: 16,
		// paddingBottom: 16,
		paddingHorizontal: Screen320() ? 14 :14,
	},
	'problem-report__send-input': {
		position: "absolute",
		bottom: 0,
		right: 0,
		left: 0
	},
	'problem-report__upload-progress' : {
		position: "absolute",
		top: 0,
		width: "100%"
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
	}
});
