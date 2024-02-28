import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'training-item__container': {
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center',
		backgroundColor: '$itemBackground',
		height: 90,
		marginBottom: 8,
		paddingVertical: 12,
		paddingHorizontal: 11,
		borderRadius: 10,
		shadowColor: 'rgb(134, 134, 134)',
		shadowOpacity: .25,
		shadowRadius: 8,
		width: '100%'
	},
	'training-item__img': {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		borderRadius: 10,
	},
	'training-item__title': {
		fontSize: 16,
		color: '$darkBgTextColor',
		flexWrap: 'wrap',
	},
	'training-item__overlay': {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		opacity: 0.5,
		backgroundColor: "#000",
		borderRadius: 10,
	},
	'training-item__info': {
		flexDirection: "row",
		marginBottom: 5
	},
	'training-item__info-block':{
		flexDirection: "row",
		marginRight: 13,
		alignItems: "center"
	},
	'training-item__info-icon': {
		marginRight: 5,
		color: "$textColor"
	},
	'training-item__info-unit': {
		marginLeft: 5
	}
});
