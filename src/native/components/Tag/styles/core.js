import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'tag': {
		backgroundColor: '$accent',
		marginRight: 5,
		marginBottom: 5,
		height: 25,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 15,
		borderRadius: 20,
	},
	'tag-text': {
		color: '$screenBackgroundColor',
		fontSize: 14,
		fontFamily: 'Main-Bold',
	}
});