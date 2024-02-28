import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	'pricing-plan': {
		paddingTop: 32,
		paddingHorizontal: Screen320() ? 14 :14,
		paddingBottom: 75
	},
	'pricing-plan__inner': {
		paddingBottom: 80
	},
	'pricing-plan__title': {
		fontSize: 20,
		color: '$accent',
		fontFamily: 'Main-Bold',
		marginBottom: 20
	},

	'pricing-plan__unfollow': {
		paddingLeft: 18,
		paddingRight: 18,
		paddingTop: 8,
		paddingBottom: 8,
		marginTop: 31,
		alignSelf: 'center'
	},
	'pricing-plan__unfollow-text': {
		fontFamily: 'Main-Bold',
		color: '$textColor',
		textDecorationLine: 'underline'
	},
	'pricing-plan__get-subscription-btn': {
		alignSelf: 'center',
		position: 'absolute',
		bottom: 10,
		// backgroundColor: '$accent',
		// borderRadius:20
	},
});
