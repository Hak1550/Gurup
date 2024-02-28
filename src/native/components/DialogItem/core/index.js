import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from "../styles";
import Avatar from "../../Avatar";
import Logic from '../logic'
import Touchable from '../../Touchable';

const DialogItem = ({_id, unread = 0,lastMessage=null, dialogName = "", message = "", image="", avatarProps, ...rest}) => {
	// console.log("unread ",unread);
	return(
		<Touchable style={styles['dialog']} {...rest}>
			<View style={styles['dialog__avatar']}>
				<View style={styles['dialog__avatar-image']}>
					<Avatar {...avatarProps}/>
				</View>
			</View>
			<View style={styles['dialog__content']}>
				<Text style={styles['dialog__content-username']}>{dialogName}</Text>
				{/* {lastMessage?(
				<Text style={styles['dialog__content-message']} numberOfLines={1} ellipsizeMode="tail">{lastMessage.text}</Text>
				):null} */}
			</View>
		{unread ? (
			<View style={styles['dialog__unread']}>
				<Text style={styles['dialog__unread-text']}>{unread}</Text>
			</View>
		) : null}
		</Touchable>
	)
};


export default Logic(DialogItem)