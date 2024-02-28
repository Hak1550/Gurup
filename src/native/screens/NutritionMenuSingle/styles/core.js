import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'menu-single': {
		marginHorizontal: 14,
		paddingVertical: 22,
		flex: 1
	},
	'menu-single__title': {
		fontSize: 20,
		fontFamily: 'Main-Bold',
		marginBottom: 14,
		textTransform: 'capitalize'
	},
	'menu-single__tags': {
		flexDirection: 'row'
	}
});
