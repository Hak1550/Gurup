import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"buy-course": {
		flex: 1
	},
	"buy-course__head": {
		marginBottom: 30,
	},
	"buy-course__head-thumbnail": {
		width: "100%",
		aspectRatio: 16/9
	},
	"buy-course__head-title": {
		position: "absolute",
		bottom: 0,
		fontSize: 20,
		color: "$textColor",
		paddingLeft: 15
	},
	"buy-course__head-shadow": {
		position: "absolute",
		bottom: 0,
		width: "100%"
	},
	"buy-course__text": {
		fontSize: 14,
		marginTop: 16,
		marginBottom: 16,
		color: "$textColor",
		opacity: 0.5
	},
	"buy-course__price": {
		color: "#65c691",
		fontSize: 24
	},
	"buy-course__button": {
		justifyContent: 'center',
		flexDirection: 'row',
		marginBottom: 10
	},
	"buy-course__chapters": {
		paddingHorizontal: 14,
	}
});
