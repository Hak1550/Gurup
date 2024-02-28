import EStyleSheet from 'react-native-extended-stylesheet';
import Color from 'color'

export default EStyleSheet.create({
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
		color: '$screenBackgroundColor'
	},
	"avatar__non-image": {
		justifyContent: 'center',
		alignItems: 'center',
		overflow: 'hidden',
		backgroundColor: '$accent',
		// borderColor: () => Color(EStyleSheet.value('$accent')).darken(0.3),
		// borderWidth: 4
	},
	"avatar__image": {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0
	}
});
