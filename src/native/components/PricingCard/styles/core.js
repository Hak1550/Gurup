import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

	// START ---- Pricing-card card style
	'pricing-card' : {
		backgroundColor: '#fff',
		paddingTop: 12,
		paddingBottom: 15,
		paddingLeft: 17,
		paddingRight: 15,
		borderRadius: 10,
		shadowColor: '$additionalTextColor',
		shadowRadius: 8,
		shadowOpacity: 0.2,
		shadowOffset: {x: 0, y: 2},
		marginBottom: 20,
		elevation: 6,
	},
	'pricing-card-active' : {
		backgroundColor: '$accent',
		paddingTop: 12,
		paddingBottom: 15,
		paddingLeft: 17,
		paddingRight: 15,
		borderRadius: 10,
		shadowColor: '$additionalTextColor',
		shadowRadius: 8,
		shadowOpacity: 0.2,
		shadowOffset: {x: 0, y: 2},
		marginBottom: 20,
		elevation: 6,
	},
	'pricing-card__top': {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10
	},
	'pricing-card__title': {
		fontSize: 20,
		color: '$accent',
		fontFamily: 'Main-Bold'
	},
	'pricing-card__title-active': {
		fontSize: 20,
		color: '#fff',
		fontFamily: 'Main-Bold'
	},
	'pricing-card__badge': {
		backgroundColor: '#4FAB7F',
		color: '#fff',
		borderRadius: 14,
		overflow: 'hidden',
		fontSize: 16,
		paddingLeft: 8,
		paddingRight: 8,
	},
	'pricing-card__bottom': {
		flexDirection: 'row',
		alignItems: 'flex-end'
	},
	'pricing-card__old-price': {
		color: '$additionalTextColor',
		fontSize: 12,
		marginRight: 4,
		textDecorationLine: 'line-through'
	},
	'pricing-card__old-price-active': {
		color: '#fff',
		fontSize: 12,
		marginRight: 4,
		textDecorationLine: 'line-through'
	},
	'pricing-card__price': {
		fontSize: 16,
		color: '$textColor',
		fontFamily: 'Main-Bold'
	},
	'pricing-card__price-active': {
		fontSize: 16,
		color: '#fff',
		fontFamily: 'Main-Bold'
	},
	'pricing-card__price-per': {
		fontSize: 12,
		color: '$additionalTextColor',
	},
	'pricing-card__price-per-active': {
		fontSize: 12,
		color: '#fff',
	},
	// END ---- Pricing-card card style


	// START ---- Current-rate card style
	'current-rate-card__wrapper': {
		borderRadius: 10,
		overflow: 'hidden',
	},
	'current-rate-card__bg': {
		position: 'absolute',
		width: '100%',
	},
	'current-rate-card': {
		paddingTop: 21,
		paddingLeft: 17,
		paddingRight: 17,
		paddingBottom: 29
	},
	'current-rate-card__top': {
		marginBottom: 10
	},
	'current-rate-card__title': {
		fontSize: 20,
		fontFamily: 'Main-Bold',
		color: '#fff'
	},
	'current-rate-card__price': {
		fontSize: 16,
		color: '#fff'
	},
	'current-rate-card__price-per': {
		fontSize: 14,
		color: '#fff'
	},
	'pricing-card__info': {
		marginTop: 21
	},
	'pricing-card__info-text': {
		fontSize: 14,
		color: 'rgba(255, 255, 255, .5)',
		marginBottom: 14,
	},
	// END ---- Current-rate card style

	'pricing-card__coins': {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	'pricing-card__coins__name': {
		flexDirection: 'row',
		alignItems: 'center'
	}
});
