import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import Avatar from '../../../components/Avatar';
import FitImage from 'react-native-fit-image';
import Autolink from 'react-native-autolink';
import Lightbox from 'react-native-lightbox-v2';
import Logic from '../logic';
import moment from 'moment';

const ChatMessage = ({ renderLightBoxImage, userAvatar, message, attachments, me, active = false, pending = false, user, date, actionsModal, _id,displayOptions=true }) => {
	let messageStyles = [styles['chatmessage']];
	if(pending) {
		messageStyles.push(styles['chatmessage_pending']);
		console.log('RENDER PENDING', messageStyles);
	}
	return (
		<View style={ messageStyles }>
			<View>
				<View style={ styles['chatmessage__content'] }>
					<View style={ styles['chatmessage__avatar'] }>
						<Avatar uri={ userAvatar } name={ user }/>
					</View>
					<Text style={ styles['chatmessage_content-username'] }>{ user }</Text>
					<Text style={ styles['chatmessage__time'] }>{ moment(date).format('HH:mm') }</Text>
					{displayOptions?(
						<TouchableOpacity onPress={ () => {
							actionsModal(_id);
						} }>
							<Text style={ { marginLeft: 10, color: '#333' } }> ...</Text>
						</TouchableOpacity>
					):null}
				</View>
				{ !attachments || !attachments.length ? (
					<View style={ styles['chatmessage_message'] }>
						<Autolink
							style={ styles['chatmessage_message-content'] }
							text={ message }
							linkStyle={ { textDecorationLine: 'underline' } }
						/>
					</View>
				) : null}
				{ attachments && !!attachments.length ? attachments.map((item, key) => {
					switch(item.type) {
						case 'image':
							return (
								<Lightbox underlayColor="white" key={ key }
								          renderContent={ () => renderLightBoxImage(item.src) }>
									<FitImage
										source={ { uri: item.src } }
										indicator={ true }
										indicatorColor="#919191" // react native colors or color codes like #919191
										indicatorSize="small" // (small | large) or integer
										style={ styles['chatmessage_message--img'] }/>
								</Lightbox>
							);
						default:
							return (
								<View key={ key } style={ styles['chatmessage_message'] }>
									<Autolink
										style={ styles['chatmessage_message-content'] }
										text={ message }
										linkStyle={ { textDecorationLine: 'underline' } }
									/>
								</View>
							);
					}
				}): null }
			</View>
		</View>
	);
};

export default Logic(ChatMessage);
