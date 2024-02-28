import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from 'react-i18next';
import {withRouter} from 'react-router';

import {
	getChats,
	getChat,
	sendMessage,
	startPrivateChat
} from 'actions/chat';
import { withTheme } from "styled-components"
import withHelmet from "hocs/withHelmet"
import moment from "moment";

export default WrapperComponent => {
	class Logic extends Component {

		state = {
	        error: false,
	        skip: 0,
	    }

		componentDidMount = async() => {
	        const {dispatch, match, chat, history} = this.props;
			dispatch({
  				type: 'SET_CHAT',
  				data: {info: {}, messages: []}
			});
			console.log("GO GET CHATS");
	        let chats = await dispatch(getChats())
			let chat_id = match.params.chat_id
			console.log("chats => ",chats);
	        if (chat_id) {
	            try{
	                clearInterval(window.chatInterval);
	            }catch(e){
	                console.error("error removing interval ",e);
	            }
	            window.chatInterval = setInterval(()=>{
	                dispatch(getChat(chat_id, false, true))
	            },1000)
				let data = await dispatch(getChat(match.params.chat_id))
				if (!data.chat || !data.chat.allowed) {
					history.push("/chats")
				}
				// this.chatTop.scrollIntoView();
	            setTimeout(()=> {
	                this.scrollToBottom();
	            }, 300);
	        }
	    }

		componentWillReceiveProps = async(newProps) => {
	        const {dispatch, chat, match} = this.props;
	        let oldId = match.params.chat_id;
	        let newId = newProps.match.params.chat_id;
	        if (oldId != newId) {
				try{
	                clearInterval(window.chatInterval)
	            }catch(e){
	                console.error("error removing interval ",e);
	            }

	            window.chatInterval = setInterval(()=>{
	                dispatch(getChat(newId, false, true))
	            },1000)

	            let data = await dispatch(getChat(newId))

	            this.scrollToBottom();
	        }
	    }

		scrollToBottom = () => {
			// this.messagesEnd.scrollIntoView();
			this.chat.scrollTop = (this.chat.scrollHeight - this.chat.clientHeight);
	    }

		componentWillUpdate(newProps) {
	        const {dispatch, chat, match} = this.props;
	        this.chatChanged = newProps.chat.messages && chat.messages ? newProps.chat.messages.length !== chat.messages.length : false;
	        if (this.chatChanged) {
	            const scrollPos = this.chat.scrollTop;
	            const scrollBottom = (this.chat.scrollHeight - this.chat.clientHeight);
	            this.scrollAtBottom = (scrollBottom <= 0) || (scrollPos === scrollBottom);
	        }
	    }

		componentDidUpdate() {
	        if (this.scrollAtBottom) {
	            this.scrollToBottom();
	            this.scrollAtBottom = false;
	        }
	    }

		componentWillUnmount() {
	        try{
	            clearInterval(window.chatInterval)
	        }catch(e){
	            console.error("error removing interval ",e);
	        }
	    }

		sendMessage = async({text, attachments}) => {
	        const {dispatch, me, chat} = this.props;
			dispatch(sendMessage(chat.info._id, {text, attachments}))
	    }

		render() {
			let {dispatch, chat, coursesType} = this.props;
			const chatIsOpen = chat.info.paidUntil ? moment(chat.info.paidUntil).isAfter(moment()) : true;
			return (
				<WrapperComponent
					{...this.props}
					state={this.state}
					chatIsOpen = {chatIsOpen}
					createChatRef={(el)=>this.chat = el}
					chatTopRef={(el)=>this.chatTop=el}
					createMessagesEndRef={(el)=>this.messagesEnd=el}
					openPayModal={()=>{
						dispatch({
							type: "TOGGLE_MODAL",
							data: {
								name: "chats_pay",
							}
						})
					}}
					onUploadStart={()=>{
						this.scrollToBottom()
					}}
					sendMessage={this.sendMessage}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["web_chats", "web_layout","chats", "basic"]),
		withRouter,
		withHelmet(({}) => ({title: 'web_layout:chats_title'}), ['web_layout']),
		withTheme,
		connect(({chat, chats, me, influencer})=>({chat, chats, me, influencer}))
	)(Logic);
};
