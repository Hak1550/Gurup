import React from "react"
import { KeyboardAvoidingView, RefreshControl, Image, Text, View, Platform } from "react-native"
import MainLayout from "../../../components/MainLayout"
import ProgressBar from "../../../components/ProgressBar"
import ChatMessage from "../../../components/ChatMessage"
import ChatSend from "../../../components/ChatSend"
import Button from "../../../components/Button"

import styles from "../styles"
import InvertibleScrollView from "react-native-invertible-scroll-view"
import Preloader from "../../../components/Preloader"
import { Screen320 } from "../../../utils"
import Logic from "../logic"

const Chat = ({ state, refreshDialogs, onAssetsProgress, onAssetsEnd, me, chat, loading, moreMessages, navigation, t }) => {
	// console.log("{chat && chat.info && chat.info.type", chat && chat.info)
	return (
		<MainLayout
			screenTitle={navigation.state.params.dialogName || chat.info.title}
			accountButton={true}
			getAvatar={false}
			customBackgroundColor={'#FFFFFF'}
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
					contentContainerStyle={styles["chat__message-wrapper"]}
					inverted
					refreshControl={
						<RefreshControl
							refreshing={state.refreshing}
							onRefresh={refreshDialogs}
							// tintColor={EStyleSheet.value("$accent")}
							// colors={EStyleSheet.value("$accent")}
						/>
					}>
					<Button>Загрузить ещё</Button>
					{chat.messages.length
						? chat.messages
								.filter(({ pending }) => pending)
								.map(message => (
									<ChatMessage
										{...message}
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
										{...message}
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
						{chat.prevPagesLoaded*50 < chat.messagesPrevCount && (
							<View style={styles["chat__load-more"]}>
								<Button
									loading = {state.loadingMore}
									title="Загрузить ещё"
									onPress = {moreMessages}
									theme="accent"
									size="small"
								/>
							</View>
						)}
				</InvertibleScrollView>
			) : null}
			{chat && chat.info && chat.info.type === "admin_announcements" ? null : (
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'padding' : null}
					keyboardVerticalOffset={Screen320() ? 75 : 115}
				>
					<ProgressBar style={styles["chat__upload-progress"]} progress={state.uploadProgress} />
					<ChatSend onUploadEnd={onAssetsEnd} onUploadProgress={onAssetsProgress} chatID={chat.info._id} />
				</KeyboardAvoidingView>
			)}
		</MainLayout>
	)
}

export default Logic(Chat)
