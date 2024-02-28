import React from "react";
import { View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import PickImage from "../../../components/PickImage";
import Logic from "../logic";
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from "../../Button";
import CacheImage from "../../CacheImage";
import Touchable from '../../Touchable';

const ChatSend = ({
	state,
	onChangeText,
	_onPressButton,
	onFileDrop,
	t,
	inputPlaceholder = t("app_chats:message_placeholder_text"),
	setAttachment,
	clearAttachment,
	closeAttachmentPreview,
	sendAttachment
}) => {
	// LanguageFixNeeded Fixed
	return (
		<View style={styles["chat-send"]}>
			<Modal 
				isVisible={state.showPreview} 
				onBackdropPress={closeAttachmentPreview} 
				onModalHide={clearAttachment}
				useNativeDriver
			>
				<View style={styles["chat-send__preview"]}>
					{state.attachment.result && (
						<CacheImage
							style={styles["chat-send__preview-img"]}
							source={state.attachment.result.uri}
							resizeMode="contain"
							auto
						/>
					)}
					<View style={styles["chat-send__preview-buttons"]}>
						<Button 
							size="small" 
							style={styles["chat-send__preview-button"]} 
							title={t("app_basic:cancel_button")}
							onPress={closeAttachmentPreview} 
						/>
						<Button 
							size="small" 
							style={styles["chat-send__preview-button"]} 
							title={t("app_basic:send_button")}
							onPress={sendAttachment}
						/>
					</View>
				</View>
			</Modal>
			<PickImage
				document={true}
				innerStyle={styles["chat-send__attachment"]} onImagePick={(result, options)=>{
					// console.log("image picked ",result, options);
					if (!options || (options.type !== "video" && options.type !== "document")) {
						// console.log("SET ATT")
						setAttachment({ result, options });
					} else {
						// console.log("DROP FILE")
						onFileDrop(result, options)
					}
					// setAttachment({ result, options });
					// onFileDrop(result,options);
				}
			}>
				<FontAwesome style={styles["chat-send__attachment-icon"]} name={"paperclip"} />
			</PickImage>
			<View style={styles["chat-send__input-wrapper"]}>
				<AutoGrowingTextInput
					textAlignVertical="center"
					style={styles["chat-send__input"]}
					underlineColorAndroid='rgba(0,0,0,0)'
					name='message'
					onChangeText={text => onChangeText(text)}
					value={state.text}
					placeholder={inputPlaceholder}
					placeholderTextColor={EStyleSheet.value("$textColor")}
				/>
			</View>
			{/* */}
			<Touchable style={styles["chat-send__send-button"]} onPress={_onPressButton}>
				<FontAwesome style={styles["chat-send__send-button-icon"]} name={"paper-plane"} />
			</Touchable>
		</View>
	);
};

export default Logic(ChatSend);
