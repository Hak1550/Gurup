import React from "react"
import { View, TouchableOpacity } from "react-native"
import styles from "../styles"
import EStyleSheet from 'react-native-extended-stylesheet';
import Modal from "react-native-modal";

import FontAwesome from "react-native-vector-icons/FontAwesome"
import { AutoGrowingTextInput } from "react-native-autogrow-textinput"
import Logic from "../logic"
import PickImage from "../../PickImage"
import ProgressBar from "../../ProgressBar"
import Button from "../../Button";
import CacheImage from "../../CacheImage";

const ReportSend = ({
	state,
	onChangeText,
	_onPressButton,
	t,
	onFileDrop,
	inputPlaceholder = t("app_chats:message_placeholder_text"),
	setAttachment,
	clearAttachment,
	closeAttachmentPreview,
	sendAttachment
}) => {
	const renderAttachment = () => {
		
		if (state.attachment.result){
			if (state.attachment.options){
				switch (state.attachment.options){
					case "video":
						break;
					case "document":
						break;
					default:
						return (
							<CacheImage
								style={styles["report-send__preview-img"]}
								source={state.attachment.result.uri}
								resizeMode="contain"
								auto
							/>
						)
				}
			}
		}
	}
	// LanguageFixNeeded Fixed
	return (
		<View style={styles["report-send__wrap"]}>
			<Modal
				isVisible={state.showPreview}
				onBackdropPress={closeAttachmentPreview}
				onModalHide={clearAttachment}
				useNativeDriver
			>
				<View style={styles["report-send__preview"]}>
					{state.attachment.result && (
						<CacheImage
							style={styles["report-send__preview-img"]}
							source={state.attachment.result.uri}
							resizeMode="contain"
							auto
						/>
					)}
					<View style={styles["report-send__preview-buttons"]}>
						<Button
							size="small"
							style={styles["report-send__preview-button"]}
							title={t("app_basic:cancel_button")}
							onPress={closeAttachmentPreview}
						/>
						<Button
							size="small"
							style={styles["report-send__preview-button"]}
							title={t("app_basic:send_button")}
							onPress={sendAttachment}
						/>
					</View>
				</View>
			</Modal>
			<ProgressBar
				progress={state.progress}
				style={styles["report-send__progress"]}
			/>
			<View style={styles["report-send"]}>
				<PickImage
					document={true}
					video={true}
					innerStyle={styles["report-send__attachment"]}
					onImagePick={(result, options) => {
						// console.log("image picked ", result, options)
						if(result.cancelled) return

						if (!options || (options.type !== "video" && options.type !== "document")){
							// console.log("SET ATT")
							setAttachment({ result, options });
						} else {
							// console.log("DROP FILE")
							onFileDrop(result, options)	
						}
					}}>
					<FontAwesome style={styles["report-send__attachment-icon"]} name={"paperclip"} />
				</PickImage>
				<View style={styles["report-send__input-wrapper"]}>
					<AutoGrowingTextInput
						style={styles["report-send__input"]}
						underlineColorAndroid='rgba(0,0,0,0)'
						name='message'
						onChangeText={text => onChangeText(text)}
						value={state.text}
						placeholder={inputPlaceholder}
						placeholderTextColor={EStyleSheet.value("$textColor")}
					/>
				</View>
				<TouchableOpacity style={styles["report-send__send-button"]} onPress={_onPressButton}>
					<FontAwesome style={styles["report-send__send-button-icon"]} name={"paper-plane"} />
				</TouchableOpacity>
			</View>
		</View>
		
	)
}

export default Logic(ReportSend)
