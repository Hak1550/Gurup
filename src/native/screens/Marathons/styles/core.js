import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen320 } from '../../../utils';

export default EStyleSheet.create({
	"courses": {
		paddingHorizontal: Screen320() ? 14 :14,
		flex: 1
	},
	'courses__filter': {
		width: 55,
		height: 55,
		position: 'absolute',
		bottom: 26,
		right: 15,
		backgroundColor: '$accent',
		borderRadius: 40,
	},
	'courses__filter-button': {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	'courses__filter-button-icon': {
		color: '#fff',
		fontSize: 24
	},
});
