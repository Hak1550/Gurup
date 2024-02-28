import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'report': {
		paddingLeft: 32,
		paddingRight: 32,
		paddingTop: 34,
	},
	'report__inner':{
		paddingBottom: 50
	},
	'report__header-text': {
		textAlign: 'center',
		color: '$accent',
		fontSize: 20
	},
	'report__body-text': {
		textAlign: 'center',
		color: '$additionalTextColor',
		fontSize: 16,
		marginTop: 10,
	},
	'report__input': {
		borderColor: '$additionalTextColor',
		color: "$textColor",
		borderWidth: 1,
		marginTop: 5,
		marginBottom: 5,
		height: 150,
		paddingTop: 15,
		paddingBottom: 15,
		paddingLeft: 25,
		paddingRight: 25,
		fontSize: 16,
		textAlignVertical: 'top',
	},
	'report__input-wrap':{
		marginBottom: 5
	},
	'report__button-wrapper': {
		// alignItems: 'center'
	}
});
