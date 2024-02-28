import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"chat-send": {
		backgroundColor: "$itemBackground",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		paddingRight: 18,
		paddingLeft: 18,
		borderBottomColor: "rgba(151, 151, 151, .3)",
		borderBottomWidth: 0.1
	},
	"chat-send__attachment": {
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 14,
		paddingBottom: 14,
	},
	"chat-send__attachment-icon": {
		fontSize: 24,
		color: "$textColor"
	},
	"chat-send__input-wrapper": {
		width: "100%",
		flex: 1,
		flexDirection: "row",
		height: "100%",
		justifyContent: "center",
		alignItems: "center"
	},
	"chat-send__input": {
		backgroundColor: "$itemBackground",
		width: "100%",
		paddingTop: 14,
		paddingBottom: 14,
		paddingLeft: 19,
		paddingRight: 30,
		color: "$textColor",
		fontFamily: "Main-Light"
	},
	"chat-send__send-button": {
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 14,
		paddingBottom: 14,
	},
	"chat-send__send-button-icon": {
		fontSize: 20,
		color: "$textColor"
	},
	"chat-send__preview":{
		backgroundColor: "$screenBackgroundColor",
		width: "100%",
		borderRadius: 10,
		overflow: "hidden",
		padding: 10
	},
	"chat-send__preview-img": {
		width: "100%",
		marginBottom: 10
	},
	"chat-send__preview-buttons": {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		flexWrap: "wrap"
	},
	"chat-send__preview-button": {
		width: 140,
		marginBottom: 10
	}
});
