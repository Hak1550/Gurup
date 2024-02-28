import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'training-modal': {
		backgroundColor: "$itemBackground",
		width: '100%',
		bottom: 0,
		height: '70%',
		position: "absolute",
		borderTopLeftRadius: 25,
		borderTopRightRadius: 25
	},
	'training-modal__close-button': {
		width: 46,
		height: 6,
		backgroundColor: '#C1C1C1',
		alignSelf: 'center',
		borderRadius: 3,
		marginTop: 9,
		marginBottom: 14
	},
	'training-modal__content': {
		marginTop: 12,
		marginBottom: 12,
		paddingHorizontal: 14,
	},
	'training-modal__content-title': {
		marginBottom: 9,
		fontSize: 20,
		color: '$textColor',
	},
	'training-modal__content-text': {
		color: '$textColor'
	}
});
