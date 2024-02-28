import React, { Component } from "react"
import { getChat } from "../../../actions/chat"
import { connect } from "react-redux"
import { compose } from "redux"
import isLoading from "../../../hocs/isLoading"
import { withNamespaces } from "react-i18next"
import moment from "moment"
import Preloader from "../../components/Preloader/core"

// Мне придет чат с данными и датой покупки,
// Беру из redux - createdAt, подставляю в функцию chatTimer в componentDidMount

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			refreshing: false,
			uploadProgress: 0,
			time: 0,
			chatFinished: false,
			loading: true
		}

		componentDidMount() {
			const { navigation, chat, dispatch } = this.props
			// console.log("Chat cdm");
			if (navigation.state.params._id !== chat.info._id) {
				console.log("GET CAHT")
				dispatch(getChat(navigation.state.params._id, true))
			}
			this.checkMessagesInterval = setInterval(() => dispatch(getChat(navigation.state.params._id)), 5000)
			// console.log("go chat Timer")
			this.chatTimer()
		}

		chatTimer = (start) => {
			// console.log("chatTimer")
			this.chatTimerInterval = setInterval(() => {
				let { chat } = this.props;
				// console.log("chat ",chat);
				// console.log("paidUntil ",chat.info.paidUntil);
				// console.log("createdAt ",chat.info.createdAt);
				// console.log("diff ",moment(chat.info.paidUntil).diff( moment(),'seconds') )
				if (chat.info.paidUntil && chat.info.createdAt){
					let time = moment(chat.info.paidUntil).diff(moment(), 'seconds');
					// console.log("time ",time);
					if (time && time >= 0) {
						this.setState({
							time,
							loading: false
						})
					} else {
						this.setState({
							chatFinished: true,
							loading: false
						})
						try {
							clearInterval(this.chatTimerInterval)
						} catch (e) {

						}
					}
				}
			}, 1000)


		}

		componentWillUnmount() {
			try {
				clearTimeout(this.checkMessagesInterval)
			} catch (e) { }
			try {
				clearInterval(this.chatTimerInterval)
			} catch (e) { }

		}

		refreshDialogs = () => {
			let { dispatch, navigation } = this.props
			let self = this
			// console.log("refreshDialog")
			this.setState({ refreshing: true })
			dispatch(getChat(navigation.state.params._id)).then(() => {
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
			//TODO: @Ilya, сделай прелоадер
			if (this.state.loading) {
				return <Preloader />;
			}

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
