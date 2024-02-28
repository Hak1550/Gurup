import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"lessons": {
		paddingHorizontal: Screen320() ? 14 :14,
		paddingTop: 16
	}, 
	"chapter__title": {
		fontSize: 20,
		textAlign: "center",
		color: "$textColor"
	}
});
