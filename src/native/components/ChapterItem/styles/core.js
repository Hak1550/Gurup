import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"chapteritem": {
		marginBottom: 10,
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "#FFF",
		minHeight: 80,
	},
	"chapteritem__header": {
		flexDirection: "row",
		height: 18,
		justifyContent: "space-between",
		alignItems: "center"
		// width: '100%',
		// aspectRatio: 16/9,
		// position: 'absolute',
	},
	"chapteritem__status": {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	"chapteritem__progress": {
		position: "absolute",
		left: 0,
		bottom: 0,
		right: 0
	},
	"chapteritem__status-text": {
		color: "$darkBgTextColor",
		fontSize: 14,
		marginRight: 5
	},
	"chapteritem__status-icon": {
		color: "$darkBgTextColor",
		fontSize: 14
	},
	"chapteritem__image": {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	"chapteritem__overlay": {
		position: "absolute",
		width: "100%",
		height: "100%",
		backgroundColor: "#000000",
		opacity: 0.5,
	},
	"chapteritem__wrapper": {
		padding: 10
	},
	"chapteritem__title": {
		color: "$darkBgTextColor",
		fontSize: 16
	},
	"chapteritem_inactive": {
		opacity: 0.5
	},	
	"chapteritem__update": {
		color: "$darkBgTextColor",	
		fontSize: 12,
		marginBottom: 5
	},
	"chapteritem__complete": {
		backgroundColor: "transparent",
		height: "100%",
		flexDirection: "row",
		alignItems: 'flex-end',
		justifyContent: "flex-end",
		position: "absolute",
		right: 0
	},
	"chapteritem__complete-icon": {
		fontSize: 20,
		color: "$successColor",
		marginRight: 21,
		marginLeft: 21,
		marginTop: 23,
		marginBottom: 23,
		elevation: 1
	}
});
