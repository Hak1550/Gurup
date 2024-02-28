import React from "react"
import { View, ScrollView, Text, Fragment } from "react-native"
import MainLayout from "../../../components/MainLayout"
import DialogItem from "../../../components/DialogItem"
import styles from "../styles"
import Preloader from "../../../components/Preloader"
import { Actions } from "react-native-router-flux"
import Logic from "../logic"
import { togglePlansModal } from "../../../../actions/plans"
import StyledButton from "../../../components/Button"
import BuyPrivateChatModal from "../../../components/BuyPrivateChatModal"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import EStyleSheet from "react-native-extended-stylesheet"
import { config } from "../../../styles/variables";

const Dialogs = ({
	state,
	chats,
	loading = false,
	goToPrivateChat,
	toggleBuyChatsModal,
	dispatch,
	influencer,
	navigation,
	t,
	influencerOnline,
}) => {
	// console.log("chats ",chats);
	return (
		<MainLayout screenTitle={t(navigation.state.params.title)} backButton={false} getAvatar={false}>
			<ScrollView contentContainerStyle={styles["dialogs"]}>
				{loading && <Preloader />}
				{!loading && chats
					? chats.map((chat, key) => (
							<DialogItem
								allowed={chat.allowed}
								_id={chat._id}
								key={key}
								image={chat.image}
								lastMessage={chat.lastMessage}
								unread={chat.unread?chat.unread:0}
								onPress={() => {
									chat.allowed
										? Actions.chat({ _id: chat._id, dialogName: chat.title })
										: dispatch(togglePlansModal(true))
									// console.log("chat.allowed", chat.allowed)
								}}
								dialogName={chat.title}
							/>
					  ))
					: null}
			</ScrollView>
			{(influencer && influencer.privateChatsEnabled && (config.appDomain || influencer.coinsEnabled))?(
				<View>
					<View style={styles["dialogs__start-chat"]}>
						<View style={styles["dialogs__start-chat__blogger-info"]}>
							<View
								style={[
									styles["dialogs__start-chat__blogger-info__icon"],
									influencerOnline.online && { backgroundColor: EStyleSheet.value("$successColor") },
								]}
							/>
							<Text style={styles["dialogs__start-chat__blogger-info__text"]}>
								{t("influencer")} {influencerOnline.online ? t("online") : t("offline")}
							</Text>
						</View>
						<StyledButton
							activeOpacity={0.9}
							title={t("start_private_chat")}
							theme='accent'
							disabled={!influencerOnline.online}
							onPress={() => (influencerOnline.online ? toggleBuyChatsModal() : null)}
						/>
					</View>
					<BuyPrivateChatModal
						modalVisible={state.buyChatModalVisible}
						toggleModal={toggleBuyChatsModal}
						buttonAction={goToPrivateChat}
					/>
				</View>
			):null}
			
		</MainLayout>
	)
}
//TODO: Перевод кнопки в locize

export default Logic(Dialogs)
