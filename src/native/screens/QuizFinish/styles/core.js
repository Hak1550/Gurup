import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"test-finish": {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: 13
		// justifyContent: "center"
	},
	"test-finish__title": {
		alignSelf: "flex-start"
	},
	"test-finish__icon": {
		flex: 1,
		justifyContent: "center"
	},
	"test-finish__icon_success": {
		height: 1,
		flex: 1
	},
	"test-finish__icon_fail":{
		height: 250,
	},
	"test-finish__answers": {
		color: "$additionalTextColor",
		fontSize: 12,
		marginBottom: 5
	},
	"test-finish__result": {
		fontSize: 16,
		marginBottom: 16
	},
	"test-finish__button": {
		maxWidth: 210,
		width: "100%"
	}
});
