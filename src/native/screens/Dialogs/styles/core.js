import EStyleSheet from "react-native-extended-stylesheet"
import { Screen320 } from "../../../utils"

export default EStyleSheet.create({
	dialogs: {
		// paddingHorizontal: Screen320() ? 14 : 32,
		paddingTop: 16,
		paddingBottom: 76,
	},
	"dialogs__start-chat": {
		position: "absolute",
		left: Screen320() ? 14 : 32,
		right: Screen320() ? 14 : 32,
		bottom: 18,
	},
	"dialogs__start-chat__blogger-info": {
		flexDirection: "row",
		marginBottom: 8,
		alignSelf: "flex-end",
	},
	"dialogs__start-chat__blogger-info__text": {
		marginLeft: 4,
	},
	"dialogs__start-chat__blogger-info__icon": {
		height: 8,
		width: 8,
		borderRadius: 4,
		position: "absolute",
		top: 7,
		left: -8,
		backgroundColor: "$additionalTextColor"
	},
})
