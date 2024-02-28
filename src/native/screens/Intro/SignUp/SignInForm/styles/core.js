import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../../../utils";

export default EStyleSheet.create({
	"form": {
		// flex: 1,
		justifyContent: "center",
		paddingHorizontal: Screen320() ? 10 : 30
	},
	"form__signin": {
		flexDirection: "row",
		// justifyContent: "space-between",
		justifyContent: "center",
		marginTop: 20,
		// width: "100%"
	},
	"form__signin-button": {
		width: "100%"
	},
	"form__text-wrap":{
		marginBottom: Screen320() ? 16 : 22,
		marginTop:  Screen320() ? 0 : 22,
		alignItems:"center",
		color: "$additionalTextColor",
	},
	"form__text": {
		marginTop: 10,
		textAlign:"center",
		color: "$additionalTextColor",
		width: 234
	}
});
