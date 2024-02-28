import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"report-send": {
		backgroundColor: "$itemBackground",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		paddingRight: 18,
		paddingLeft: 18,
		// paddingTop: 4,
		// paddingBottom: 4,
		borderBottomColor: "rgba(151, 151, 151, .3)",
		borderBottomWidth: 0.1,
		// height: 54
	},
	"report-send__progress": {
		width: "100%",
		position: "absolute",
		top: 0,
	},	
	"report-send__attachment": {
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 14,
		paddingBottom: 14,
	},
	"report-send__attachment-icon": {
		fontSize: 24,
		color: "$textColor"
	},
	"report-send__input-wrapper": {
		width: "100%",
		height: "100%",
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	"report-send__input": {
		backgroundColor: "$itemBackground",
		width: "100%",
		paddingLeft: 19,
		paddingRight: 30,
		color: "$textColor",
		paddingTop: 14,
		paddingBottom: 14,
	},
	"report-send__send-button": {
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 14,
		paddingBottom: 14,
	},
	"report-send__send-button-icon": {
		fontSize: 20,
		color: "$textColor"
	},
	"report-send__preview": {
		backgroundColor: "$screenBackgroundColor",
		width: "100%",
		borderRadius: 10,
		overflow: "hidden",
		padding: 10
	},
	"report-send__preview-img": {
		width: "100%",
		marginBottom: 10
	},
	"report-send__preview-buttons": {
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "center",
		flexWrap: "wrap"
	},
	"report-send__preview-button": {
		width: 140,
		marginBottom: 10
	}
});
