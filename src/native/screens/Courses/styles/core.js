import EStyleSheet from 'react-native-extended-stylesheet';
import { Screen320 } from '../../../utils';

export default EStyleSheet.create({
	"courses": {
		paddingHorizontal: Screen320() ? 14 :14,
		backgroundColor: "$screenBackgroundColor",
		flex: 1
	},
	'courses__filter': {
		width: 55,
		height: 55,
		position: 'absolute',
		bottom: 26,
		right: 15,
		backgroundColor: '$accent',
		// shadowColor: "$shadowColor",
		shadowOpacity: 0.2,
		shadowRadius: 15,
		elevation: 1,
		borderRadius: 40,
	},
	'courses__filter-button': {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1
	},
	'courses__filter-button-icon': {
		color: '$screenBackgroundColor',
		fontSize: 24
	},
	'courses__filter__number':{
		position:'absolute',
		top:0,
		right:0,
		backgroundColor:'#EB5757',
		width:17,
		height:17,
		justifyContent: "center",
		alignItems: "center",
		// lineHeight:17,
		borderRadius:10,
	},
	'courses__filter__number__text':{
		color:"#fff",
		textAlign:"center",
		fontSize:13,
	},
	"courses__empty-text": {
		width: "100%",
		textAlign: "center",
		fontSize: 20,
		color: "$textColor"
	}
});
