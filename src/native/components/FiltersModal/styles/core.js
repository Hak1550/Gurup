import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'filter__modal': {
		backgroundColor: '$itemBackground',
		borderRadius: 20,
		paddingBottom: 20,
		paddingTop: 20,
		paddingLeft: 35,
		paddingRight: 35,
		flex: 0.7
	},
	'filter__modal-title': {
		fontSize: 20,
		color: '$accent',
		marginBottom: 21
	},
	'filter__modal-item': {
		borderTopWidth: 1,
		borderTopColor: '$additionalTextColor',
		paddingTop: 16,
		paddingBottom: 13
	},
	'filter__modal-item-text': {
		fontSize: 16,
		color: '$additionalTextColor'
	},
	'filter__modal-item-text-active': {
		fontSize: 16,
		color: '$accent',
		fontFamily: 'Main-Bold'
	}
});
