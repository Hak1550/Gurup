import {Dimensions} from "react-native"
import { isIphoneX } from '../../../utils';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'influencer-featured__list': {
		paddingHorizontal: 12,
		alignContent: "center"
	},
	'discover': {
		backgroundColor: "$screenBackgroundColor",
		// backgroundColor: "#FF0000",
		flex: 1,
		paddingVertical: isIphoneX() ? 60 : 33,
	},
	'discover__title': {
		fontSize: 18,
		fontFamily: 'Main-Bold',
		color: "$textColor"
	},
	"discover__logo-wrap": {
		flex: Dimensions.get('window').height > 568 ? 2 : 1,
		alignItems: "center",
		justifyContent: "center"
	},
	"discover__logo": {
		width: 190
	},
	'discover__description': {
		fontSize: 16,
		color: "$textColor"
	},
	'discover__header': {
		paddingHorizontal: 20
	},
	"discover__list": {
		marginBottom: 10
	},
	'discover__box': {
		flex: Dimensions.get('window').height > 568 ? 5 : 3
	},
	"discover__back-button": {
		marginHorizontal: 20
	},
	"discover__header-text": {
		marginBottom: 5,
		color: "$textColor"
	},

	'discover__input__wrapper': {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		paddingHorizontal: 14,
		borderColor: 'rgba(0, 0, 0, .2)',
		borderWidth: 1,
		height: 49,
		borderRadius: 10
	},
	'discover__input__icon__search': {
		// position: 'absolute',
		// top: 5,
		fontSize: 14,
		color: "$accent"
	},
	"discover__input__close-search": {
		position: 'absolute',
		right: -10,
		top: -6,
		padding: 20,
	},
	'discover__input__icon__close': {
		fontSize: 14,
		color: "$textColor"
	},
	'discover__input': {
		marginLeft: 18,
		marginRight: 16,
		color: '$textColor',
		display: "flex",
		width: "100%"
	},

	// Influencer overview component
	'influencer-overview': {
		marginTop: 21,
		marginHorizontal: 20,
	},
	'influencer-overview__empty':{
		alignItems: "center"
	},
	"influencer-overview__schools": {
		borderTopWidth: 1,
		borderTopColor: 'rgba(43,32,85,0.1)',
		paddingTop: 25
	},
	"influencer-overview__school": {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 22
	},
	"influencer-overview__school-text": {
		marginLeft: 17,
	},
	"influencer-overview__school-text__name": {
		color: "$textColor"
	},
	"influencer-overview__title": {
		fontFamily: 'Main-Bold',
		fontSize: 18,
		marginBottom: 22,
		color: "$textColor"
	},
	'recent-slider__item__container': {
		overflow: 'hidden',
		paddingHorizontal: 14,
		paddingBottom: 23,
		paddingTop: 67,
		backgroundColor: '#000000'
	},
	'recent-slider__item__bgi': {
		width: '110%',
		height: '150%',
		position: 'absolute',
		opacity: 0.8
	},
	"recent-slider__item__logo-wrapper": {
		backgroundColor: '#FFFFFF',
		width: 36,
		height: 36,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 18
	},
	"recent-slider__item__logo": {
		width: 24,
		height: 24,
	},
	"recent-slider__item__title": {
		color: '#FFFFFF',
		fontFamily: 'Main-Bold',
		fontSize: 18,
		marginTop: 10
	},
	"recent-slider__item__description": {
		marginTop: 5,
		fontSize: 14,
		color: '#FFFFFF'
	},
	"recent-slider__item__followers-count": {
		marginTop: 5,
		fontSize: 10,
		fontFamily: 'Main-Bold',
		color: '#FFFFFF'
	},
	'influencer-overview__featured-title': {
		fontFamily: 'Main-Bold',
		fontSize: 16,
		marginLeft: 30,
		marginTop: 26,
		marginBottom: 18
	},
	'featured-slider__item__container': {
		backgroundColor: '#fafafa',
		paddingTop: 10,
		alignItems: 'center',
		minHeight: 178
	},
	'featured-slider__item__title': {
		fontSize: 12,
		color: '#000000',
		paddingHorizontal: 14,
		textAlign: 'center',
		marginBottom: 3
	},
	'featured-slider__item__description': {
		fontSize: 10,
		color: '#57606E',
		paddingHorizontal: 14,
		textAlign: 'center'
	},
	'featured-slider__item__followers-count': {
		color: '#000',
		fontSize: 10,
		marginTop: 'auto',
		marginBottom: 7
	},
	"featured-slider__item__followers-count-text": {
		color: "#958FAA",
		fontSize: 10,
	},
	"featured-slider__item__button": {
		backgroundColor: "#FCB03A",
		width: '100%',
		paddingTop: 7,
		paddingBottom: 9
	},
	"featured-slider__item__button-text": {
		textAlign: 'center',
		color: '#fff',
		fontSize: 10,
		fontFamily: 'Main-Medium'
	},

	// Influencer list component
	'influencer-list': {
		marginTop: 21,
		flex: 1,
	},
	"influencer-list__item": {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5
	},
	"influencer-list__item__title": {
		marginLeft: 12,
		color: "$textColor"
	},
	"influencer-list__item__separator": {
		height: 1,
		backgroundColor: "rgba(43,32,85, .1)",
		width: "100%",
		marginVertical: 6
	},

	// Avatar
	"avatar__photo": {
		width: 35,
		height: 35,
		borderRadius: 15.5,
	},
	"avatar__gradient-overlay": {
		position: "absolute",
		width: "100%",
		height: "100%",
	},
	'avatar__name-text': {
		color: '$accentBgTextColor'
	},
	"avatar__non-image": {
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		backgroundColor: '#FCB03A',
		// borderWidth: 4
	}
})
