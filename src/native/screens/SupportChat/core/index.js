import React from "react"
import { KeyboardAvoidingView, RefreshControl, Image, Text, View, Platform } from "react-native"
import MainLayout from "../../../components/MainLayout"
import ProgressBar from "../../../components/ProgressBar"
import ChatMessage from "../../../components/ChatMessage"
import ChatSend from "../../../components/ChatSend"
import styles from "../styles"
import InvertibleScrollView from "react-native-invertible-scroll-view"
import Preloader from "../../../components/Preloader"
import { Screen320 } from "../../../utils"
import Logic from "../logic"

const ProblemReport = ({ state, refreshDialogs, onAssetsProgress, onAssetsEnd, me, chat, loading, navigation, t }) => {
	const { influencerData } = me
	return (
		<MainLayout
			screenTitle={navigation.state.params.dialogName || chat.info.title}
			accountButton={true}
			getAvatar={false}
			avatarUri={navigation.state.params.dialogName || chat.info.title}>
			{loading && (
				<View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }}>
					<Preloader />
				</View>
			)}
			{!loading && (!chat.messages || !chat.messages.length) && (
				// Если сообщений нет, выводим placeholder
				<View style={styles["no-messages"]}>
					<Image
						source={require("../../../assets/core/no-messages.png")}
						style={{ width: 180, height: 180 }}
						resizeMode='contain'
					/>
					<Text style={styles["no-messages__title"]}>{t("app_chats:no_message_title")}</Text>
					<Text style={styles["no-messages__text"]}>{t("app_chats:no_message_text")}</Text>
				</View>
			)}
			{!loading && chat.messages.length ? (
				<InvertibleScrollView
					contentContainerStyle={styles["problem-report__message-wrapper"]}
					inverted
					refreshControl={
						<RefreshControl
							refreshing={state.refreshing}
							onRefresh={refreshDialogs}
							// tintColor={EStyleSheet.value("$accent")}
							// colors={EStyleSheet.value("$accent")}
						/>
					}>
					{chat.messages.length
						? chat.messages
								.filter(({ pending }) => pending)
								.map(message => (
									<ChatMessage
										_id={message._id}
										key={message.pending}
										active={me._id === message.user._id}
										pending
										user={message.user.name}
										message={message.text}
										attachments={message.attachments}
										userAvatar={message.user.avatar}
										date={message.createdAt}
									/>
								))
						: null}
					{chat.messages.length
						? chat.messages
								.filter(({ pending }) => !pending)
								.map(message => (
									<ChatMessage
										_id={message._id}
										key={message._id}
										active={me._id === message.user._id}
										user={message.user.name}
										message={message.text}
										attachments={message.attachments}
										userAvatar={message.user.avatar}
										date={message.createdAt}
									/>
								))
						: null}
				</InvertibleScrollView>
			) : null}
			<KeyboardAvoidingView
				behavior={Platform.OS==="ios"?'padding':null}
				keyboardVerticalOffset={Screen320() ? 140 : 185}
			>
				<ProgressBar style={styles["problem-report__upload-progress"]} progress={state.uploadProgress} />
				<ChatSend onUploadEnd={onAssetsEnd} onUploadProgress={onAssetsProgress} chatID={influencerData.supportChat} />
			</KeyboardAvoidingView>
		</MainLayout>
	)
}

export default Logic(ProblemReport)
