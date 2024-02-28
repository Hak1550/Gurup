import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'recipes-card': {
		backgroundColor: '#fff',
		paddingVertical: 9,
		paddingHorizontal: 9,
		marginBottom: 22,
		borderRadius: 20,
		overflow: 'hidden',
		flexDirection: 'row',
		height: 90,
		alignItems: "center"
	},
	'recipes-card__image': {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	"recipes-card__overlay": {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000000",
		opacity: 0.4
	},
	'recipes-card__content': {
		marginLeft: 16,
		marginTop: 4
	},
	'recipes-card__content-top': {
		flexDirection: 'row',
		marginBottom: 4
	},
	'recipes-card__content-info': {
		marginRight: 13,
		fontFamily: 'Main-Bold',
		color: "$darkBgTextColor"
	},
	'recipes-card__content-info-unit': {
		color: '$darkBgTextColor',
		fontFamily: 'Main-Bold'
	},
	'recipes-card__content-title':{
		color: "$darkBgTextColor"
	}
});