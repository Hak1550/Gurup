import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen320 } from "../../../utils";

export default EStyleSheet.create({
	"lessons": {
		paddingHorizontal: Screen320() ? 14 : 32,
		paddingTop: 16
	},
	"layout-articles__button": {
		justifyContent: 'center',
		flexDirection: 'row',
		marginTop: Screen320() ? 18 : 38,
		marginBottom: 18
	},
	'marathon__upload-progress' : {
		position: "absolute",
		top: 0,
		width: "100%"
	},
});
