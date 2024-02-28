import EStyleSheet from 'react-native-extended-stylesheet';
import { isTall } from "../../../utils";

export default EStyleSheet.create({
	'intro__dot': {
		backgroundColor: "#d8d8d8",
		marginLeft: 6,
		marginRight: 6,
	},
	'intro__dot_active': {
		backgroundColor: "$accent"
	},
	"intro__dots": {
		bottom: isTall() ? 25 : 5
 	}
});
