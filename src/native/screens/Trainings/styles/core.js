import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'marathon-trainings__container': {
		paddingHorizontal: 15,
		paddingBottom: 70
	},
	'marthon-trainings__header': {
		marginTop: 18,
		marginBottom: 23
	},
	'marthon-trainings__header-title': {
		color: '$accent',
		fontSize: 20,
		fontFamily: 'Main-Bold',
		marginBottom: 14
	},
	'marthon-trainings__header-desc': {
		color: '$textColor',
	},
	'marthon-trainings__header-info': {
		// flexDirection: 'row'
		marginBottom: 10
	},
	'marthon-trainings__header-summary': {
		color: "$additionalTextColor"
	},
	'marthon-trainings__header-text': {
		fontSize: 14,
		color: '$additionalTextColor',
		marginRight: 18
	},
	'marthon-trainings__icon': {
		fontSize: 12,
		color: '$accent'
	},
	'training-item__container': {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		marginBottom: 8,
		paddingVertical: 12,
		paddingHorizontal: 11,
		borderRadius: 20,
		shadowColor: 'rgb(134, 134, 134)',
		shadowOpacity: .25,
		shadowRadius: 8,
		width: '100%'
	},
	'training-item__img': {
		width: 75,
		height: 75,
		borderRadius: 37.5,
		marginRight: 20
	},
	'training-item__title': {
		fontSize: 16,
		color: '#000',
		flexWrap: 'wrap',
		flex: 1
	},
	'marathon-trainings__buttons-wrapepr': {
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
		marginBottom: 9,
		left: 0,
		right: 0,
		position: 'absolute',
		bottom: 0,
	},
	'marthon-trainings__delete':{
		marginTop:5,
		color:"$textColor"
	},
	'marthon-trainings__icon_red':{
		fontSize: 12,
		color:"$accent"
	}
});
