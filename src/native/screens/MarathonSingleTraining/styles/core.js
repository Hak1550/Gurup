import EStyleSheet from "react-native-extended-stylesheet";

export default EStyleSheet.create({
	"marathon-single": {
		flex: 1,
		flexShrink: 0,
	},
	"marathon-single__scrollview": {
		flexGrow: 1
	},
	"marathon-single__content-container": {
		flex: 1,
		paddingTop: 16
	},
	"marathon-single__buttons": {
		marginTop: 7,
		marginHorizontal: 15,
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: 'center'
	},
	'marathon-single__complete-text': {
		fontFamily: 'Main-Bold',
		color: '$textColor',
		marginBottom: 16,
	},
	'marathon-single__complete-icon': {
		color: '#36E49B'
	}
});
