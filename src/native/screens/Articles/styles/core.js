import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"articles": {
		paddingHorizontal: Screen320() ? 14 : 14,
		paddingTop: 16,
		paddingBottom: 16,
	},
	'articles__filter': {
		width: 55,
		height: 55,
		position: 'absolute',
		bottom: 26,
		right: 15,
		backgroundColor: '$accent',
		borderRadius: 40,
		// shadowColor: "$shadowColor",
		shadowOpacity: 0.2,
		shadowRadius: 15,
		elevation: 1,
	},
	'articles__filter-button': {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	},
	'articles__filter-button-icon': {
		color: '$screenBackgroundColor',
		fontSize: 24
	},
});
