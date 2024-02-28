import React, {Component, Fragment} from "react";
import Logic from "../logic";
import InfiniteScroll from 'react-infinite-scroller';
import moment from 'moment';

import Header from 'components/Header';
import InputMessage from 'components/InputMessage';
import Avatar from 'components/Avatar';
import Message from 'components/Message';

import {
    Chats,Sidebar,SearchWrap,Search,SearchIcon,List,Chat,Image,Name,ChatWrap,ChatHeader,HeaderWrap,Title,DeleteIcon,Content,DefaultImg,PaidConsultation,Time,MessageWrap,MessageName,MessageText,MessageAttachments,
    MessageAttachment,Placeholder,PlaceholderText,PlaceholderImage,ChatOver
} from '../styles'

export default Logic(({
    t, state,
    chats=[], chat={}, isPrivate=false,
    inputOnChange, sendMessage, attachmentDelete, scrollToBottom,
    chatIsOpen,
    uploadOnChange, onUploadStart, createChatRef, chatTopRef, me, createMessagesEndRef, openPayModal, influencer
})=>{
    let {message={}, uploading=false} = state;


    return (
        <Fragment>
            <Header breadcrumbs={[{to: '/chats', label: t("web_layout:chats_title")}]}/>
            <Chats>
                <Sidebar>
                    <SearchWrap>
                        <Search placeholder={t("chats:chat_search_placeholder")}/>
                        <SearchIcon className="fas fa-search"/>
                    </SearchWrap>
                    <List>
                        {chats.sort((a,b)=>{
                            if(!a.updatedAt){
                                a.updatedAt = a.createdAt;
                            }
                            if(!b.updatedAt){
                                b.updatedAt = b.createdAt;
                            }
                            return b.updatedAt - a.updatedAt
                        }).map((chat, i)=>{
                            return(
                                <Chat to={isPrivate ? "/private-chats/"+chat._id : "/chats/"+chat._id} activeClassName="active" key={i}>
                                    <Avatar img={chat.image} name={chat.title}/>
                                    <Name>{chat.title}</Name>
                                </Chat>
                            )
                        } )}
                    </List>
                    {influencer.privateChatsEnabled && <PaidConsultation onClick={openPayModal}>{t("web_chats:paid_consultation_button")}</PaidConsultation>}
                </Sidebar>
                <ChatWrap>
                    {chat && chat.info && chat.info._id && (
                        <ChatHeader>
                            <HeaderWrap>
                                <Avatar className="small" img={chat.info.image} name={chat.info.title}/>
                                <Title>{chat.info.title}</Title>
                            </HeaderWrap>
                        </ChatHeader>
                    )}
                    <Content ref={createChatRef}>
                        {chat.info && chat.info._id && chat.messages && chat.messages.length ? (
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={()=>{
                                    // if (chat.messages.length !== skip) {
                                    //     this.setState({skip: chat.messages.length})
                                    // }
                                }}
                                // hasMore={true}
                                useWindow={false}
                                isReverse={true}
                            >
                                {chat.messages.slice().reverse().map((message, i)=>{
                                    let reverse = message.user._id == me._id
                                    return (
                                        <Message key={i} message={message} reverse={reverse}/>
                                    )
                                })}
                            </InfiniteScroll>
                        ) : chat.info && chat.info._id ? (
                            <Placeholder>
                                <PlaceholderImage/>
                                <PlaceholderText className="top">{t("web_chats:no_messages")}</PlaceholderText>
                                <PlaceholderText>{t("web_chats:start_chat")}</PlaceholderText>
                            </Placeholder>
                        ) : null}
                        <div style={{ float:"left", clear: "both" }}
                             ref={createMessagesEndRef}>
                        </div>
                    </Content>
                    {chat && chat.info && chat.info._id ? (
                        chatIsOpen ? (
                            <InputMessage
                                onSubmit={sendMessage}
                                onUploadStart={onUploadStart}
                            />
                        ) : (
                          <ChatOver>{t("chat_private_over")}</ChatOver>
                        )
                    ) : null}
                </ChatWrap>
            </Chats>
        </Fragment>
    )
});
