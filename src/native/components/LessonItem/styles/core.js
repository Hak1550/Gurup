import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"lesson-card__container": {
		// paddingVertical: 11,
		backgroundColor: "$itemBackground",
		borderRadius: 10,
		// marginBottom: 14,
		paddingBottom: 10,
		overflow: "hidden"
	},
	"lesson-card__container_inactive": {
		opacity: 0.5
	},
	"lesson-card__header": {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 9,
		height: 16,
		marginVertical: 5
	},
	"lesson-card__header-text": {
		fontSize: 14,
		color: "$darkBgTextColor",
		lineHeight: 17
	},
	"lesson-card__icon": {
		fontSize: 12,
		color: "$darkBgTextColor",
		lineHeight: 14,
		marginLeft: 5
	},
	"lesson-card__icon_failed": {
		color: "#EB5757"
	},
	"lesson-card__icon_waiting":{
		color: "#EB5757"
	},
	"lesson-card__header-block": {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	"lesson-card__content-title": {
		color: "$darkBgTextColor",
		fontSize: 14,
		paddingHorizontal: 15,
		fontFamily: "Main-Medium",
		marginBottom: 4,
	},
	"lesson-card__content-img": {
		marginBottom: 8,
	},
	"lesson-card__content-text": {
		paddingHorizontal: 15,
		color: "$darkBgTextColor",
	},
	"lesson-card__complete-text": {
		fontFamily: "Main-Bold",
		color: "$darkBgTextColor",
		textAlign: 'right',
		marginTop: 8,
	},
	"lesson-card__complete-icon": {
		color: "#36E49B",
	},
	"lesson-card__overlay": {
		opacity: 0.5,
		backgroundColor: "#000000",
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

	
