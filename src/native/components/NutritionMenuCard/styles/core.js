import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'menu-card': {
		backgroundColor: '$itemBackground',
		paddingBottom: 33,
		marginBottom: 22,
		borderRadius: 20,
		overflow: 'hidden'
	},
	'menu-card__body': {
		marginLeft: 15,
		marginRight: 30
	},
	'menu-card__title': {
		fontSize: 16,
		fontFamily: 'Main-Bold',
		color: '$textColor',
		marginTop: 13,
		marginBottom: 8
	},
	"menu-card__head": {
		height: 175,
		justifyContent: "flex-end"
	},
	'menu-card__image' : {		
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	'menu-card__shadow': {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	"menu-card__summary": {
		paddingHorizontal: 15,
		marginBottom: 10
	},
	'menu-card__description': {
		fontSize: 14,
		color: "$additionalTextColor",
		marginBottom: 10
	},
	'menu-card__tags': {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	'menu-card__tag': {
		backgroundColor: '$accent',
		marginRight: 5,
		marginBottom: 5,
		paddingVertical: 4,
		paddingHorizontal: 15,
		borderRadius: 12,
	},
	'menu-card__tag-text': {
		color: '$screenBackgroundColor',
		fontSize: 14,
		fontFamily: 'Main-Bold',
	}
});