import React, { Component } from "react"
import { connect } from "react-redux"
import { getChats, startPrivateChat } from "../../../actions/chat"
import { setPlansModalOptions } from "../../../actions/plans"
import { compose } from "redux"
import isLoading from "../../../hocs/isLoading"
import { withNamespaces } from "react-i18next"
import { Actions } from "react-native-router-flux"
import { checkOnlineInfluencer } from "../../../actions/sign"

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			buyChatModalVisible: false,
		}

		async componentDidMount() {
			const { dispatch } = this.props
			// console.log("dialogs get chats");
			let chatsResult = await dispatch(getChats());
			// console.log("chatsResult ",chatsResult);
			await dispatch(setPlansModalOptions({ afterPurchase: () => dispatch(getChats()) }))
			if(chatsResult && chatsResult.status=="ok" && chatsResult.chats && chatsResult.chats.length==1 && chatsResult.chats[0]._id){
				// console.log("chatsResult ONE CHAT");
				// Actions.reset("tabbar")
				//Если один чат - идем в него
				Actions.replace('chat',{ _id: chatsResult.chats[0]._id, dialogName: chatsResult.chats[0].title })
			}
			// await dispatch(checkOnlineInfluencer())
			// this.checkMessagesInterval = setInterval(() => dispatch(checkOnlineInfluencer()), 5000)
		}

		toggleBuyChatsModal = () => {
			this.setState({ buyChatModalVisible: !this.state.buyChatModalVisible })
		}

		goToPrivateChat = () => {
			const { dispatch, t } = this.props
			dispatch(startPrivateChat()).then(chat => {
				this.setState({ buyChatModalVisible: false })
				setTimeout(() => Actions.chatPrivate({ _id: chat._id, dialogName: t("private_chat") }), 500)
			})
		}
		render() {
			return (
				<WrappedComponent
					state={this.state}
					toggleBuyChatsModal={this.toggleBuyChatsModal}
					goToPrivateChat={this.goToPrivateChat}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_chats","chats"], { wait: true }),
		isLoading({
			status_path: ({ status }) => ({ status: status.chats }),
		}),
		connect(({ chats, influencer, influencerOnline }) => ({ chats, influencer, influencerOnline }))
	)(Logic)
}
