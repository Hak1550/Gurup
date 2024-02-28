import React, { Fragment, useCallback } from 'react';
import {
  KeyboardAvoidingView,
  RefreshControl,
  Image,
  Text,
  View,
  Platform,
  FlatList,
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import ProgressBar from '../../../components/ProgressBar';
import ChatMessage from '../../../components/ChatMessage';
import ChatSend from '../../../components/ChatSend';
import styles from '../styles';
import InvertibleScrollView from 'react-native-invertible-scroll-view';
import Preloader from '../../../components/Preloader';
import { isTall } from '../../../utils';
import Logic from '../logic';
import Button from '../../../components/Button';
import moment from 'moment';
import ScreenPlaceholder from '../../../components/ScreenPlaceholder';
import NoArticles from '../../../assets/core/svg-icon/no_articles';

const Chat = ({
  state,
  refreshDialogs,
  onAssetsProgress,
  onAssetsEnd,
  me,
  chat,
  loading,
  navigation,
  t,
  moreMessages,
}) => {
  // Нужно для групировки сообщений по дням
  let chatDay =
    chat.messages && chat.messages.length
      ? chat.messages[0].createdAt
      : moment();

  const renderChatItem = useCallback(
    ({ item: message, index: key }) => {
      let block;
      let messageProps = {
        _id: message._id,
        key: message._id,
        self: me._id === message.user._id,
        user: message.user.name,
        message: message.text,
        attachments: message.attachments,
        userAvatar: message.user.avatar,
        date: message.createdAt,
      };
      if (message.pending) {
        messageProps = {
          ...messageProps,
          pending: true,
          key: message.pending,
        };
      }

      if (!moment(message.createdAt).isSame(chatDay, 'day')) {
        let formatedDate = moment(chatDay);
        if (moment().diff(formatedDate, 'days') >= 2) {
          formatedDate = formatedDate.format('DD MMMM YYYY'); // '2 days ago' etc.
        } else {
          formatedDate = formatedDate.calendar();
        }
        block = (
          <Fragment>
            {(key !== 0) && (<Text style={styles['chat__day']}>{formatedDate}</Text>)}
            <ChatMessage {...messageProps} />
          </Fragment>
        );
        chatDay = message.createdAt;
      } else if (key + 1 === chat.messages.length) {
        block = (
          <Fragment>
            <ChatMessage {...messageProps} />
            <Text style={styles['chat__day']}>
              {moment(chatDay).format('DD MMMM YYYY')}
            </Text>
          </Fragment>
        );
      } else {
        block = <ChatMessage {...messageProps} />;
      }
      return block;
    },
    [chat]
  );

  const renderFooter = useCallback(()=> {
    if(chat.prevPagesLoaded * 50 < chat.messagesPrevCount) {
      return (
      <View style={styles['chat__load-more']}>
        <Button
          loading={state.loadingMore}
          title={t('app_chats:load_more')}
          onPress={moreMessages}
          theme="accent"
          size="small"
        />
      </View>
      )
    }

    return null
  }, [chat, moreMessages])

  const keyExtractor = useCallback((item) => `${item._id}${item.createdAt}`, [chat]);

  return (
    <MainLayout
      screenTitle={navigation.state.params.dialogName || chat.info.title}
      accountButton={true}
      getAvatar={false}
      avatarUri={navigation.state.params.dialogName || chat.info.title}
    >
      {loading && (
        <View style={styles['no-messages']}>
          <Preloader />
        </View>
      )}
      {!loading && (!chat.messages || !chat.messages.length) && (
        // Если сообщений нет, выводим placeholder
        <ScreenPlaceholder
          text={t('app_chats:no_message_title')}
          imageComponent={<NoArticles />}
        />
      )}
      {!loading && chat.messages.length ? (
        <FlatList
          contentContainerStyle={styles['chat__message-wrapper']}
          inverted
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={state.refreshing}
              onRefresh={refreshDialogs}
              // tintColor={EStyleSheet.value("$accent")}
              // colors={EStyleSheet.value("$accent")}
            />
          }
          data={chat.messages}
          keyExtractor={keyExtractor}
          renderItem={renderChatItem}
          ListFooterComponent={renderFooter}
        />
      ) : null}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={isTall() ? 88 : 70}
      >
        <ProgressBar
          style={styles['chat__upload-progress']}
          progress={state.uploadProgress}
        />
        <ChatSend
          onUploadEnd={onAssetsEnd}
          onUploadProgress={onAssetsProgress}
          chatID={chat.info._id}
        />
      </KeyboardAvoidingView>
    </MainLayout>
  );
};

export default Logic(Chat);
