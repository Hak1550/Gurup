import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"dialog": {
		// marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 24,
		paddingRight: 24,
		paddingTop: 15,
		paddingBottom: 17,
		width: "100%",
		borderBottomColor: "$itemBackground",
		borderBottomWidth: 1
	},
	"dialog__avatar-image": {
		width: 35,
		height: 35,
		borderRadius: 18,
		overflow: "hidden",
		marginRight: 11,
	},
	"dialog__unread": {
		// position: "absolute",
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: '#EB5757',
		justifyContent: "center",
		alignItems: "center"
	},
	"dialog__unread-text": {
		color: "#fff",
		textAlign: "center"
	},
	'dialog__content': {
		justifyContent: "center",
		flex: 1
	},
	"dialog__content-username": {
		fontSize: 14,
		color: "$textColor"
	},
	"dialog__content-message": {
		opacity: 0.5,
		color: "#000",
		marginTop: 2
	},
	"dialog_content-message--active": {
		marginLeft: 45,
		backgroundColor: "#1b87fb",
		color: "#fff",
		paddingTop: 13,
		paddingBottom: 17,
		paddingLeft: 23,
		paddingRight: 23,
		borderRadius: 20,
		overflow: "hidden"
	}
});
