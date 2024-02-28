import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"top-line__wrapper": {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		width: "100%",
		marginTop: 30,
		paddingLeft: 14,
		paddingRight: 14
	},
	"top-line__wrapper-center": {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 30,
		paddingLeft: 14,
		paddingRight: 14
	},
	"top-line__logo": {
		fontFamily: "Main-Regular",
		fontSize: 18,
		color: "#fff",
		flex: 1,
		flexWrap: 'wrap'
	},
	"top-line__logo-center": {
		textAlign: "center",
	},
	"top-line__user": {
		flexDirection: "row",
		alignItems: "center",
		// marginRight: 8
	},
	"top-line__user-name": {
		color: '#fff',
		marginRight: 8
	},
});