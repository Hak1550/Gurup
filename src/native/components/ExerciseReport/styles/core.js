import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'report__buttons': {
		flexDirection: 'row',
		marginBottom: 14,
		justifyContent: 'space-between',
		marginHorizontal: 15
	},
	'report__button-send': {
		fontFamily: 'Main-Bold',
		color: '$textColor'
	},
	'report__button-discuss': {
		fontFamily: 'Main-Bold',
		color: '$accent'
	},
	'report__button-send-icon': {
		color: '#36E49B'
	}
});
