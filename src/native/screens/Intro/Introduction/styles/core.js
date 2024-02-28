import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"introduction": {
		// minHeight: "80%",
		paddingTop: 20,
		flex: 1
		// justifyContent: "center",
		// alignItems: "center"
	},
	"introduction__title":{
		color: "$textColor",
		fontSize: 24,
		marginBottom: 18,
		textAlign: 'center'
	},
	"introduction__text": {
		color: "$textColor",
		fontSize: 16,
		textAlign:"center"
	},
	'introduction__socials': {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 40
	},
	'introduction__socials-button': {
		height: 44,
		width: 280,
		marginBottom: 18, 
		borderRadius: 50
	},'introduction__back':{
		color: "$additionalTextColor",
		textAlign: 'center',
		fontSize: 16
	}
});
