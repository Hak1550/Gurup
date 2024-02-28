import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"buy-marathon": {
		paddingHorizontal: Screen320() ? 14 :14,
		paddingTop: 16,
		paddingBottom: 18
	},
	"buy-marathon__image": {
		width: "100%",
		height: 186
	},
	"buy-marathon__text": {
		fontSize: 14,
		marginTop: 16,
		marginBottom: 16,
		color: "$textColor",
		opacity: 0.5
	},
	"buy-marathon__price": {
		color: "#65c691",
		fontSize: 24
	},
	"buy-marathon__button": {
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: 24
	}
});
