import EStyleSheet from 'react-native-extended-stylesheet';
import {Screen320} from "../../../utils";

export default EStyleSheet.create({
	"mainlayout": {
		flex: 1,
		backgroundColor: "$screenBackgroundColor",
	},
	"mainlayout__header": {
		justifyContent: "flex-start",
		paddingBottom: Screen320() ? 5 : 10,
		paddingTop: Screen320() ? 5 : 0,
		width: "100%",
	},
	"mainlayout__header-overlay": {
		position: "absolute",
		width: "100%",
		height: "125%",
		opacity: 0.8,
	},
	"mainlayout_header-sub":{
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'transparent',
		paddingHorizontal: 14
	},
	"mainlayout_header-sub__title": {
		color: "#fff",
		fontSize: 16,
		paddingVertical: 5,
		textAlign: 'center'
	},
	"mainlayout__wrapper": {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: 48,
		paddingLeft: 32,
		paddingRight: 32
	},
	"mainlayout__logo": {
		fontFamily: "Main-Regular",
		fontSize: 18,
		color: "#fff",
	},
	"mainlayout__logo-center": {
		fontFamily: "Main-Regular",
		fontSize: 18,
		color: "#fff",
		textAlign: "center"
	},
	"mainlayout__user": {
		flexDirection: "row",
		alignItems: "center"
	},
	"mainlayout__user-name": {
		color: '#fff',
		opacity: 0.7,
		marginRight: 8
	},
	"mainlayout__navigation": {
		flexDirection: "row",
		paddingLeft: 32,
		paddingRight: 32,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 21
	},
	"mainlayout__navigation-arrow": {
		position: 'absolute',
		left: 24
	},
	"mainlayout__navigation-arrow-icon": {
		fontSize: 36,
		color: '#fff',
		paddingLeft: 8,
		paddingRight: 8,
		paddingTop: 8,
		paddingBottom: 8,
	},
	"mainlayout__navigation-title": {
		fontSize: 20,
		color: "#fff",
		textAlign: 'center',
	},
	"mainlayout__navigation-sliders": {
		position: 'absolute',
		right: 32,
	},
	"mainlayout__navigation-sliders-icon": {
		fontSize: 24,
		color: '#fff',
	},
	"mainlayout__content": {
		flex: 1,
		backgroundColor: "$screenBackgroundColor",
	},
	"mainlayout__progress": {
		borderRadius: 0,
	},
	"mainlayout__content__email": {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	"mainlayout__content__email-text": {
		marginBottom: 24,
		textAlign: "center",
		color: "$textColor"
	}
});
