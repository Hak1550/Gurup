import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../../../utils";

export default EStyleSheet.create({
	"form__signin": {
		flexDirection: "row",
        // justifyContent: "space-between",
        justifyContent: "center",
		marginBottom: Screen320() ? 0 : 20
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
	}
});
