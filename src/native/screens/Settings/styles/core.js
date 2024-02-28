import EStyleSheet from "react-native-extended-stylesheet";
import { Screen320 } from "../../../utils";

export default EStyleSheet.create({
	settings: {
		// marginTop: 20,
		flex: 1,
		height: "100%",
		zIndex: 5,
		overflow: "visible",
		// borderTopWidth: 1,
		// borderBottomWidth: 1,
		// borderTopColor: "$additionalTextColor",
		// borderBottomColor: "$additionalTextColor",
		marginLeft: 14,
		marginRight: 11,
		maxWidth: 292
	},
	"setting__separator": {
		backgroundColor: "$itemBackground",
		height: 1,
		marginBottom: 34,
	},
	settings__link: {
		marginBottom: 34,
		alignContent: "flex-start",
		flexWrap: "wrap",
	},
	"settings__link-text": {
		color: "$textColor",
		fontSize: 16,
	},
	"settings__choose-language": {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 24
	},
	"switch": {
		backgroundColor: "#cac7d4",
		flexDirection: "row",
		paddingHorizontal: 4,
		paddingVertical: 3,
		borderRadius: 20,
	},
	"switch_circle": {
		paddingTop: 4,
		paddingBottom: 6,
		paddingLeft: 14,
		paddingRight: 11,
		borderRadius: 22.5,
	},
	"switch_circle-active": {
		backgroundColor: "#fff",
	},
	"switch_circle-text-active": {
		color: "$accent",
	},
});
