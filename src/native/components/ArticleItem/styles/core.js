import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"articleitem": {
		marginBottom: 10,
		borderRadius: 4,
		overflow: "hidden",
		backgroundColor: "#FFF",
		minHeight: 80,
	},
	"articleitem__header": {
		width: '100%',
		aspectRatio: 16/9,
		position: 'absolute',
	},
	"articleitem__image": {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	"articleitem__overlay": {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "#000000",
		opacity: 0.5,
	},
	"articleitem__wrapper": {
		padding: 10
	},
	"articleitem__title": {
		color: "$darkBgTextColor",
		fontSize: 16
	},
	"articleitem__update": {
		color: "$darkBgTextColor",
		fontSize: 12,
		marginBottom: 5
	},
	"articleitem__complete": {
		backgroundColor: "transparent",
		height: "100%",
		flexDirection: "row",
		alignItems: 'flex-end',
		justifyContent: "flex-end",
		position: "absolute",
		right: 0
	},
	"articleitem__complete-icon": {
		fontSize: 20,
		color: "$successColor",
		marginRight: 21,
		marginLeft: 21,
		marginTop: 23,
		marginBottom: 23,
		elevation: 1
	}
});
