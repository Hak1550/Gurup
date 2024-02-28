import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"about": {
		height: "65%",
		justifyContent: "center",
		alignItems: "center"
	},
	"about__steps":{
		flexDirection:"row",
		justifyContent:"center",
		width: "100%",
		marginBottom: 120
	},
	"about__step": {
		position:"absolute",
		// shadowColor: "$mainGradientColorSecond",
		// shadowOffset: { width: 10, height: 10 },
		shadowOpacity: 0.6,
		shadowRadius: 40,
		elevation: 1,
	},
	"about__step-img":{
		"width": "100%"
	},
	"about__step_1": {
		top: -200,
		left: 0,
		width: 142
	},
	"about__step_2": {
		top: -300,
		left: 90,
		width: 174
	},
	"about__step_3": {
		top: -300,
		left: 200,
		width: 142
	},
	"about__text": {
		fontSize: 16,
		color:"$additionalTextColor",
		width: 214,
		textAlign:"center"
	}
});
