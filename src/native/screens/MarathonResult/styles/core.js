import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'marathon-finish__container': {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '$screenBackgroundColor'
	},
	'marathon-finish__content': {
		paddingHorizontal: 74,
		alignItems: 'center'
	},
	'marathon-finish__image': {
		width: 173,
		height: 177
	},
	'marathon-finish__title': {
		color: '$accent',
		fontFamily: 'Main-Bold',
		fontSize: 20,
		marginBottom: 13
	},
	'marathon-finish__text': {
		marginBottom: 45,
		textAlign: 'center'
	}
});
