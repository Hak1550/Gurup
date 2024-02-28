import EStyleSheet from 'react-native-extended-stylesheet';

export const standartMessage = EStyleSheet.create({
	"chatmessage": {
		marginTop: 16,
		marginBottom: 16,
		flexDirection: "row",
	},
	"chatmessage_pending":{
		opacity: 0.6
	},
	"chatmessage__content": {
		paddingBottom:10,
		paddingTop: 10,
		flex: 1
	},	
	"chatmessage__avatar": {
		width: 35,
		height: 35,
		borderRadius: 18,
		overflow: "hidden",
		marginRight: 11
	},
	"chatmessage_content-username": {
		fontSize: 14,
		lineHeight: 15,
		color: "$textColor",
		marginBottom: 5
	},
	"chatmessage_message": {
		flexDirection: "row",
	},
	"chatmessage_message__inner": {
		backgroundColor: "$itemBackground",
		borderRadius: 20,
		borderTopLeftRadius: 0,
		flexShrink: 1
	},
	"chatmessage_message-content": {
		color: "$textColor",
		paddingHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
		width: "100%"
	},
	"chatmessage__content-info": {
		flexDirection: "row",
		marginBottom: 5,
		alignItems: "center",
	},
	"chatmessage_message--img": {
		width: "100%",
		borderRadius: 20,
		overflow: 'hidden',
		borderRadius: 20,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	"chatmessage_message--img_only": {
		width: "100%",
		borderRadius: 20,
		borderRadius: 20,
	},
	'chatmessage__time': {
		textAlign: 'right',
		fontSize:10,
		// marginTop: 4,
		marginLeft: "auto",
		color: '$additionalTextColor'
	},
	"chatmessage_message--file": {
		paddingVertical: 7
	}
});


export const selfMessage = EStyleSheet.create({
	"chatmessage": {
		marginTop: 16,
		marginBottom: 16,
		flexDirection: "row",
	},
	"chatmessage_pending": {
		opacity: 0.6
	},
	"chatmessage_pending-preloader":{
		flex: 0,
		// marginBottom: 5,
		marginRight: 5,
	},
	"chatmessage__content": {
		paddingBottom: 10,
		paddingTop: 10,
		flex: 1
	},
	"chatmessage__avatar": {
		display: "none"
	},
	"chatmessage_content-username": {
		fontSize: 14,
		lineHeight: 15,
		color: "$textColor",
		// marginBottom: 5
	},
	"chatmessage_message": {
		flexDirection: "row-reverse",
	},
	"chatmessage_message__inner": {
		backgroundColor: "$itemBackground",
		borderRadius: 20,
		borderTopRightRadius: 0,
		flexShrink: 1
	},
	"chatmessage_message-content": {
		color: "$textColor",
		paddingHorizontal: 10,
		paddingTop: 5,
		paddingBottom: 10,
		width: "100%"
	},
	"chatmessage__content-info": {
		flexDirection: "row-reverse",
		alignItems: "center",
		marginBottom: 5,
	},
	"chatmessage_message--img": {
		width: "100%",
		borderRadius: 20,
		overflow: 'hidden',
		borderRadius: 20,
		borderTopLeftRadius: 0,
		borderTopRightRadius: 0,
	},
	"chatmessage_message--img_only": {
		width: "100%",
		borderRadius: 20,
		borderRadius: 20,
	},
	'chatmessage__time': {
		textAlign: 'right',
		fontSize: 10,
		// marginTop: 4,
		marginRight: 6,
		color: '$additionalTextColor'
	},
	"chatmessage_message--file": {
		paddingVertical: 7
	}
});