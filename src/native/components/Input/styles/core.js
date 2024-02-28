import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"input__wrap":{
		height: 30,
		flexDirection:"row",
		borderBottomWidth: 1,
		borderBottomColor: "$additionalTextColor",
		marginTop: 26,
		alignItems: "center",
		paddingLeft: 17,
		paddingBottom: 10
	},
	"input__icon":{
		fontSize: 14,
		color: "$accent",
	},
	"input__eye": {

	},
	"input__icon-wrap":{
		width: 14.5,
		justifyContent: "center",
		marginRight: 11
	},
	"input":{
		fontSize: 14,
		width: "100%",
		flex: 1,
		color: "$textColor",
		fontFamily: "Main-Light",
		// height: "100%"
		height: 40
	},
	'file-input':{
		marginTop:15,
	},
	'file-input__list':{
		//paddingHorizontal:44,
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
