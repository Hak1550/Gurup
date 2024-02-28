import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	"statusbar-wrapper": {
		height: 6,
		width: '100%',
		backgroundColor: "$itemBackground",
		borderRadius: 10.5,
		overflow: "hidden"
	},
	"statusbar-wrapper__status": {
		height: 6,
		width: '100%',
		borderRadius: 10.5,
	},
	"statusbar__line": {
		backgroundColor: "$accent",
		position: "absolute", 
		height: "100%"
	}
});