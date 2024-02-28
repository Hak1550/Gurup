import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'notification': {
		paddingTop: 32,
		paddingLeft: 32,
		paddingRight:  32,
		flex: 1,
	},
	'notification__title': {
		color: '$additionalTextColor',
		fontSize: 20,
		marginBottom: 41,
		textAlign: 'center'
	},
	'notification__item': {
		borderBottomColor: 'rgba(38,30,75, 0.1)',
		borderBottomWidth: 1,
		marginBottom: 15,
		paddingBottom: 15,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	'notification__item-text': {
		color: '$additionalTextColor',
		fontSize: 16
	},
	'notification__btn-wrapper': {
		marginTop: 'auto',
		alignSelf: 'center',
		marginBottom: 59
	}
});
