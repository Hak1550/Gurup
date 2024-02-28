import React, { Component } from "react"
import { createSupportChat, getChat } from "../../../actions/chat"
import { connect } from "react-redux"
import { compose } from "redux"
import isLoading from "../../../hocs/isLoading"
import { withNamespaces } from "react-i18next"

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			refreshing: false,
			uploadProgress: 0,
		}

		async componentDidMount() {
			const { dispatch } = this.props
			const { influencerData } = this.props.me
			// console.log("me", this.props.me)
			if (!influencerData || !influencerData.supportChat) {
				const chat = await dispatch(createSupportChat())
                await dispatch(getChat(chat._id, true))
			} else {
				dispatch(getChat(influencerData.supportChat, true))
				this.checkMessagesInterval = setInterval(() => {
					dispatch(getChat(influencerData.supportChat, true))
				}, 5000)
			}
		}

		componentWillUnmount() {
			clearTimeout(this.checkMessagesInterval)
		}

		refreshDialogs = () => {
			let { dispatch, navigation } = this.props
			const { influencerData } = this.props.me
			let self = this
			// console.log("refreshDialog")
			this.setState({ refreshing: true })
			dispatch(getChat(influencerData.supportChat)).then(() => {
				self.setState({ refreshing: false })
			})
		}
		onAssetsProgress = ({ total, loaded }) => {
			// console.log("UPLOAD PROGRESS!!!!", loaded / total)
			this.setState({ uploadProgress: loaded / total })
		}

		onAssetsEnd = () => {
			this.setState({ uploadProgress: 0 })
		}

		render() {
			return (
				<WrappedComponent
					state={this.state}
					refreshDialogs={this.refreshDialogs}
					onAssetsProgress={this.onAssetsProgress}
					onAssetsEnd={this.onAssetsEnd}
					{...this.props}
				/>
			)
		}
	}

	return compose(
		withNamespaces(["app_chats"], { wait: true }),
		isLoading({
			status_path: ({ status }) => ({ status: status.chat }),
		}),
		connect(({ chat, me }) => ({ chat, me }))
	)(Logic)
}
