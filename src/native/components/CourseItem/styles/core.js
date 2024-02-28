import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({

	"courseitem-long-wrapper":{
		borderRadius: 10,
		marginBottom: 16,
		overflow:"hidden"
	},
	"courseitem-long":{
		borderRadius: 10,
		backgroundColor: "$itemBackground",
		minHeight: 250
	},
	"courseitem-long__image":{
		position: "absolute",
		top: 0,
		left: 0,
		height: 200,
		width:"100%"
	},
	"coursesitem-long__content":{
		paddingTop: 210,
		paddingLeft:20,
		paddingRight:20,
		paddingBottom:20
	},
	"coursesitem-long__content-info": {
		marginBottom: 10
	},
	"coursesitem-long__content-info-text":{
		color:"$textColor"
	},
	"courseitem-long__content-title": {
		color: "$textColor",
		fontFamily: 'Main-Bold',
		fontSize: 16,
	},
	"courseitem__content-text":{
		color: "$textColor",
		fontSize: 14,
		marginTop: 7
	},
	"courseitem-long__content-statusbar":{
		marginTop: "auto",
		paddingTop: 10,
		width: '100%'
	},
	"courseitem-long__content-statusbar-bar":{
		backgroundColor:"$screenBackgroundColor"
	},


	"courseitem-wrapper": {
		borderRadius: 10,
		marginBottom: 16,
	},
	"courseitem": {
		borderRadius: 10,
		overflow: "hidden",
		backgroundColor: "$screenBackgroundColor",
		minHeight: 196
	},
	"courseitem__image": {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	},
	"coursesitem__content": {
		paddingTop: 15,
		paddingBottom: 40,
		paddingLeft: 15,
		paddingRight: 15,
		flex: 1
	},
	"courseitem__overlay": {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "#000000",
		opacity: 0.5
	},
	"courseitem__content-title": {
		color: "$darkBgTextColor",
		fontFamily: 'Main-Bold',
		fontSize: 16,
	},
	'courseitem__content-statusbar': {
		marginTop: "auto",
		paddingTop: 10,
		width: '100%'
	},
	"courseitem__content-text": {
		color: "$darkBgTextColor",
		fontSize: 14,
		marginTop: 7
	},
	"coursesitem__content-info": {
		marginBottom: 13
	},
	"coursesitem__info-block": {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	"coursesitem__info-block_left": {
		marginRight: "auto",
		justifyContent: "flex-start"
	},
	"coursesitem__info-block_right": {
		marginLeft: "auto",
		justifyContent: "flex-end"
	},
	"coursesitem__info-text": {
		color: "$textColor",
		opacity: 0.8,
		fontSize: 14,
	},
	"coursesitem__info-icon": {
		marginRight: 5
	},
	"courseitem__content-price": {
		fontSize: 18,
		color: "#65c691",
		marginTop: 8
	},
	"courseitem__content-badge": {
		position: "absolute",
		top: 101,
		left: 25,
		backgroundColor: "$accent",
		borderRadius: 10,
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 8,
		paddingRight: 8,
	},
	"courseitem__content-badge-text": {
		color: "red"
	}
});
