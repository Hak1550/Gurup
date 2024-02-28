import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"test": {
		// paddingLeft: 5,
		// paddingRight: 5,
		paddingTop: 16,
		// flex: 1,
		// height: '100%'
	},
	'test__question': {
		overflow: 'hidden',
		marginBottom: 18,
		// height: '25%',
		justifyContent: 'center'
	},
	'test__question-placeholder': {
		// position: "absolute",
		width: "100%",
		aspectRatio: 16 / 9,
		backgroundColor: "$itemBackground",
		alignItems: "center",
		justifyContent: "center"
	},
	'test__question-placeholder-icon': {
		fontSize: 120,
		color: "$additionalTextColor"
	},

	"test__question-image": {
		width: "100%",
		aspectRatio: 16 / 9,
	},
	'test__question-text': {
		// paddingLeft: 34,
		// paddingRight: 34,
		paddingHorizontal: 13,
		fontSize: 16,
		color: '$textColor',
		marginBottom: 10,
	},
	'test__answers': {
		marginTop: 31,
		marginBottom: 34,
		paddingHorizontal: 15
		// height: '60%'
	},
	'test__answer-item': {
		// paddingTop: 24,
		padding: 10,
		flexDirection: "row",
		// paddingBottom: 24,
		backgroundColor: '$itemBackground',
		borderRadius: 12,
		// shadowColor: '$additionalTextColor',
		// shadowOpacity: 0.3,
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 4,
		marginBottom: 16,
		// height: '19%',
		borderWidth: 3,
		borderColor: 'transparent',
		minHeight: 50,
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	'test__answer-item_red': {
		borderColor: '#FF4C65',
	},	
	'test__answer-item_green': {
		borderColor: '#00D681',
	},	
	'test__answer-text': {
		color: "$textColor"
	}, 
	"test__answer-icon": {
		fontSize: 12
	},
	"test__answer-icon_correct":{
		color: '#00D681'
	},
	"test__answer-icon_wrong":{
		color: '#FF4C65',
	},
	"test__meta": {
		paddingHorizontal: 13,
		marginBottom: 6,
	},
	"test__meta-text": {
		fontSize: 12,
	}
});
