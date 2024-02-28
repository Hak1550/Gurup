import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../../utils";

export default EStyleSheet.create({
	'change-password': {
		marginLeft: Screen320() ? 22 : 16,
		marginRight: 16,
		borderBottomColor: "$additionalTextColor",
		borderBottomWidth: 1,
		paddingBottom: 8
	},
	'change-password__title': {
		flexDirection: 'row',
		marginLeft: Screen320() ? 16 : 58,
		marginRight: Screen320() ? 16 : 58,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	'change-password__title-text': {
		fontSize: 16,
		color: '$textColor'
	},
	'change-password__title-icon': {
		fontSize: 16,
		color: '$textColor'
	},
	'change-password__body': {
		padding: 15,
		paddingTop: 30,
		flex: 1
	},
	'change-password__body-input': {
		marginTop: 8
	},
	'change-password__body-btn': {
		flex: 1,
		justifyContent: "flex-end",
		paddingHorizontal: 20
	},
	'change-password__error': {
		color: "#EB5757",
		textAlign: "center",
	}
});
