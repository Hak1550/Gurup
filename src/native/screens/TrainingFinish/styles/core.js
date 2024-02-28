import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'marathon-finish__container': {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '$screenBackgroundColor',
		paddingVertical: 20
	},
	'marathon-finish__content': {
		// paddingHorizontal: 74,
		alignItems: 'center'
	},
	'marathon-finish__icon': {
		height: 100,
		flex: 1
		// marginTop: "auto",
		// marginBottom: "auto"
	},
	'marathon-finish__title': {
		color: '$textColor',
		fontFamily: 'Main-Regular',
		fontSize: 16,
		marginBottom: 13
	},
	'marathon-finish__text': {
		color: '$textColor',
		fontFamily: 'Main-Regular',
		fontSize: 16,
		marginBottom: 13,
	}
});
