import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"signup__wrapper": {
		flex: 1
	},
	"signup__title": {
		// flex: 1,
		fontSize: 24,
		// paddingTop: 20,
		marginBottom: "auto",
		color: "$textColor",
		textAlign:"center"
	},
	"signup__text-wrap":{
		alignItems:"center"
	},
	"signup__text": {
		marginTop: 10,
		textAlign:"center",
		color: "$additionalTextColor",
		width: 234
	}
});
