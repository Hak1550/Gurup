import EStyleSheet from "react-native-extended-stylesheet"
import { Screen320, isTall } from "../../../utils";

export default EStyleSheet.create({
	"layout-articles": {
		paddingBottom: !isTall() ? 18 : 28,
	},
	"layout-articles__image": {
		width: "100%",
		// maxHeight: 
		// aspectRatio: 16 / 9,
	},
	"layout-articles__quote": {
		backgroundColor: "$itemBackground",
		padding: 15,
		paddingBottom: 15,
		borderRadius: 20,
		borderTopLeftRadius: 0,
		marginLeft: 16,
		marginRight: 16,
		color: "$textColor"
	},
	"layout-articles__quote-wrap": {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},
	"layout-articles__quote-image": {
		width: 30,
		height: 30,
		borderRadius: 15,
	},
	"layout-articles__quote-author": {
		fontSize: 16,
		fontFamily: "Main-Bold",
		color: "$accent",
		marginBottom: 5,
		marginLeft: 10
	},
	"layout-articles__text": {
		fontSize: 16,
		paddingHorizontal: 16,
		marginTop: 13,
		marginBottom: 13,
		color: "$textColor"
	},
	"layout-articles__subtitle": {
		fontSize: 16,
		color: "$textColor",
		paddingHorizontal: 16,
	},
	"layout-articles__price": {
		color: "#65c691",
		fontSize: 24,
	},
	// "layout-articles__button": {
	// 	justifyContent: "center",
	// 	flexDirection: "row",
	// },
	// "layout-articles__video": {
	// 	aspectRatio: 16 / 9,
	// },
	"layout-articles__gallery-pagination": {
		// position: "absolute",
		// bottom: 48,
		// left: 6,
		paddingVertical: 4,
		// paddingHorizontal: 8,
		borderRadius: 12,
	},
	"layout-articles__gallery-pagination__text": {
		color: "$textColor",
		fontFamily: "Main-Regular",
		textAlign: "center"
	},
	"layout-articles__video": {
		width: "100%",
		aspectRatio: 16/9,
		backgroundColor: "#000",
		justifyContent: "center",
		alignItems: "center"
	},
	"layout-articles__video-play": {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: '$screenBackgroundColor',
		width: 55,
		height: 55,
		borderRadius: 28,
		alignItems: "center",
		justifyContent: "center"
	},
	"layout-articles__video-thumbmnail": {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	"layout-articles__play-icon": {
		fontSize: 22,
		color: '$accent',
		marginLeft: 3
	},
	"rich__italic": {
		fontFamily: "Main-Italic",
		textAlign: "left",
		fontSize: !isTall() ? 14 : 16,
		color: "$textColor"
	},
	"rich__bold": {
		fontFamily: "Main-Bold",
		textAlign: "left",
		fontSize: !isTall() ? 14 : 16,
		color: "$textColor"
	},
	"layout-articles__button": {
		paddingBottom: !isTall() ? 18 : 28,
		minWidth: 280,
		paddingHorizontal: 18,
	},
	"article__advantages": {
		marginBottom: -68
	},
	"rich__paragraph": {
		// paddingHorizontal: 16,
		// paddingBottom: 18,
		textAlign: "left",
		fontFamily: 'Main-Regular',
		color: "$textColor",
		// marginBottom: 10
	},
	"rich__wrap": {
		paddingHorizontal: 16,
		// marginBottom: !isTall() ? 12 : 20
	},	
	"rich__unstyled": {
		paddingVertical:7,
		textAlign: "left",
		color: "$textColor",
		fontSize: !isTall() ? 14 : 16,
		fontFamily: 'Main-Regular'
	},
	"rich__blockquote": {
		// paddingHorizontal: 16,
		// paddingBottom: 18,
		color: "$textColor",
		paddingBottom: !isTall() ? 18 : 28,
		textAlign: "left",
	},
	"rich__header-one": {
		fontFamily: "Main-Bold",
		marginTop: 0,
		textAlign: "left",
		color: "$textColor",
		fontSize: !isTall() ? 22 : 24,
		// marginBottom: 16,
		// marginBottom: Screen320() ? 18 : 28,
		marginBottom: !isTall() ? 4 : 8,
		// paddingHorizontal: 16,
	},
	"rich__header-two": {
		fontFamily: "Main-Regular",
		marginTop: 0,
		textAlign: "left",
		// marginBottom: 16,
		color: "$textColor",
		marginBottom: !isTall() ? 3 : 6,
		fontSize: !isTall() ? 20 : 22,
		// marginBottom: 28,

		// paddingHorizontal: 16,
	},
	"rich__header-three": {
		fontFamily: "Main-Regular",
		marginTop: 0,
		// marginBottom: 16,
		textAlign: "left",
		// marginBottom: 8,
		color: "$textColor",
		fontSize: !isTall() ? 18 : 20,
		// marginBottom: Screen320() ? 18 : 28,
		marginBottom: !isTall() ? 3 : 6,


		// paddingHorizontal: 16,
	},
	"rich__header-four": {
		// paddingHorizontal: 16,
		// marginBottom: 16,
		textAlign: "left",
		fontSize: !isTall() ? 16 : 18,
		// marginBottom: Screen320() ? 18 : 28,
		color: "$textColor",
		marginBottom: !isTall() ? 3 : 6,

		// marginBottom: 8,
	},
	'rich__ordered-list-item': {
		margin:0,
		padding:0,
		color: "$textColor",
		fontFamily: 'Main-Regular',
		fontSize: !isTall() ? 14 : 16,
		marginBottom: 10
	},
	"rich__ordered-list-item__container": {
		// paddingHorizontal: 16,
		// marginBottom: 16,
		// marginBottom: 8,
		color: "$textColor",
		fontFamily: 'Main-Regular'
	},
	"rich__ordered-list-item__number": {
		marginRight: 4,
		alignSelf: "flex-start",
		// marginTop: 2,
		color: "$textColor",
		fontSize: !isTall() ? 14 : 16,
	},
	'rich__unordered-list-item': {
		margin:0,
		padding:0,
		color: "$textColor",
		fontFamily: 'Main-Regular',
		fontSize: !isTall() ? 14 : 16,
		marginBottom: 10
	},
	"rich__unordered-list-item__container": {
		// paddingHorizontal: 16,
		// marginBottom: 8,
	},
	"rich__unordered-list-item__bullet": {
		marginRight: 8,
		alignSelf: "flex-start",
		marginTop: 9,
		backgroundColor: "$textColor"
	},
	'layout-articles__download': {
		flexDirection: "row",
		paddingHorizontal: 16,
		alignItems: 'center',
		marginVertical: 5
	},
	'layout-articles__download__filename':{
		color: "$textColor",
		flexShrink: 1
	},
	"layout-articles__download__circle": {
		backgroundColor: '$accent',
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: 'center',
		alignItems: "center",
		marginRight: 8
	},
	"layout-articles__download__circle-icon": {
		color: "$screenBackgroundColor"
	}
})
