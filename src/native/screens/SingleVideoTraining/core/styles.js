import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	's-video-training__control': {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 17
	},
	's-video-training__control-icon': {
		paddingHorizontal: 15,
	},
	's-video-training__control-title': {
		// color: '#fff',
		color: '$textColor',
		fontSize: 20,
		flex: 1,
		textAlign: 'center'
	},
	's-video-training__heading':{
		textAlign: 'center',
		color: '$textColor',
		fontSize: 40
	},
	's-video-training__instructions': {
		paddingHorizontal: 38,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	's-video-training__instructions-text': {
		textAlign: 'center',
		color: '$additionalTextColor',
		fontSize: 16
	},
	's-video-training__next': {
		marginVertical: 30
	},
	's-video-training__next-text': {
		textAlign: 'center',
		color: '$additionalTextColor',
		fontFamily: 'Main-Bold'
	}
});
