import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../../../utils";

export default EStyleSheet.create({
	"form": {
		// flex: 1,
		// justifyContent: "center",
		paddingHorizontal: Screen320() ? 10 : 30
	},
	"form__signin": {
		flexDirection: "row",
		// justifyContent: "space-between",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: Screen320() ? 0 : 20
	},
	"form__signin-button":{
		width: "100%"
	},	
	"form__text-wrap":{
		marginBottom: Screen320() ? 16 : 22,
		marginTop:  Screen320() ? 0 : 22,
		alignItems:"center"
	},
	"form__text": {
		marginTop: 10,
		textAlign:"center",
		color: "$additionalTextColor",
		width: 234
	},
	"form__link-text": {
		textAlign: "center",
		color: "$additionalTextColor",
		textDecorationLine: "underline" 
	}
});
