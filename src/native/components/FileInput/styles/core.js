import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	'file-input':{
		marginTop:15,
	},
	'file-input__list':{
		marginBottom:10
	},
	'file-input__item':{
		flexDirection:'row',
		alignItems:'center',
		justifyContent:'space-between',
		marginBottom:10,
	},
	'file-input__item-text' : {
		width:"60%"
	},
	'file-input__item-overlay': {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#000",
		opacity: 0.6,
		borderRadius: 10
	},
	'file-input__item-preview':{
		width:50,
		height:50,
		alignItems:'center',
		justifyContent:'center',
		borderColor:'$additionalTextColor',
		borderWidth:2,
		borderRadius:10,
		marginRight:12
	},
	'file-input__item-img':{
		width:50,
		height:50,
		alignItems:'center',
		justifyContent:'center',
		borderRadius:10
	},
	'file-input__item-format':{
		fontSize: 14,
		color: '$additionalTextColor'
	},
	'file-input__item-icon':{
		color:'$additionalTextColor',
		fontSize:22,
		marginRight:10
	},
	'file-input__item-remove':{
		marginLeft:12
	},
	'file-input__item-remove__icon':{
		fontSize:18,
		color:'$additionalTextColor',
	},
});
