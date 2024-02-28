import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	's-video-training': {
		backgroundColor: "$screenBackgroundColor",
		flex: 1
	},
	's-video-training__control': {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 17
	},
	's-video-training__control-icon': {
		paddingHorizontal: 15,
		width: 51
	},
	's-video-training__control-title': {
		// color: '#fff',
		color: '$textColor',
		fontSize: 20,
		flex: 1,
		textAlign: 'center'
	},
	's-video-training__timer':{
		textAlign: 'center',
		color: '$textColor',
		fontSize: 65
	},
	's-video-training__repeats':{
		textAlign: 'center',
		color: '$textColor',
		fontSize: 42
	},
	's-video-training__instructions': {
		paddingHorizontal: 38,
		marginBottom: 10,
		justifyContent: 'center',
		alignItems: 'center'
	},
	's-video-training__instructions-text': {
		textAlign: 'center',
		color: '$textColor',
		fontSize: 14
	},
	's-video-training__info': {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	's-video-training__next': {
		marginVertical: 10
	},
	's-video-training__next-text': {
		textAlign: 'center',
		color: '$additionalTextColor',
		fontFamily: 'Main-Bold'
	},
	"play-icon":{
		fontSize: 18,
		color: "$textColor"
	},
	"pause-icon":{
		fontSize: 18,
		color: "$textColor"
	},
	"step-forward-icon":{
		fontSize: 18,
		color: "$textColor"
	},	
	"rewind-icon": {
		fontSize: 18,
		color: "$textColor"
	},
	's-video-training__button':{
		paddingHorizontal:40,
		marginTop:10
	}
});
