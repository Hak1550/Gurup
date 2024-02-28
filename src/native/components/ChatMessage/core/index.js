import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import massageStyles from '../styles';
import Avatar from '../../../components/Avatar';
import FitImage from 'react-native-fit-image';
import CacheImage from '../../../components/CacheImage';
import Autolink from 'react-native-autolink';
import Lightbox from 'react-native-lightbox-v2';
import Logic from '../logic';
import moment from 'moment';
import EStyleSheet from 'react-native-extended-stylesheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Preloader from '../../Preloader';
import Block from '../../ArticleLayout';

const ChatMessage = ({
  renderLightBoxImage,
  userAvatar,
  message,
  attachments,
  me,
  self = false,
  pending = false,
  user,
  date,
  actionsModal,
  _id,
}) => {
  const styles = self
    ? massageStyles.selfMessage
    : massageStyles.standartMessage;
  const containerStyles = [styles['chatmessage']];
  // if(self){
  //     contentStyle.push(styles['chatmessage_self'])
  // }
  if (pending) {
    containerStyles.push(styles['chatmessage_pending']);
  }
  if (message) {
    message = message.trim();
  }
  return (
    <View style={containerStyles}>
      <View style={styles['chatmessage__avatar']}>
        <Avatar uri={userAvatar} name={me.name} />
      </View>

      <View style={styles['chatmessage__content']}>
        <View style={styles['chatmessage__content-info']}>
          <Text style={styles['chatmessage_content-username']}>{user}</Text>
          {/* {pending ? (
                            <Preloader 
                                style={styles['chatmessage_pending-preloader']} 
                                size="small"
                                color={EStyleSheet.value('$additionalColor')}
                            />
                        ) : (
                            <Text style={styles['chatmessage__time']}>{moment(date).format("HH:mm")}</Text>
                        )} */}
          <Text style={styles['chatmessage__time']}>
            {moment(date).format('HH:mm')}
          </Text>
          {/* <TouchableOpacity onPress={()=>{
                            actionsModal(_id)
                        }} style={{alignItems:"center"}}>
                            <MaterialCommunityIcons name="dots-horizontal" style={{ marginRight:10, color: "#333" }} />
                        </TouchableOpacity> */}
        </View>
        <View style={styles['chatmessage_message']}>
          <View style={styles['chatmessage_message__inner']}>
            {message ? (
              <Autolink
                style={styles['chatmessage_message-content']}
                linkStyle={{
                  color: EStyleSheet.value('$accent'),
                  textDecorationLine: 'underline',
                }}
                text={message}
              />
            ) : null}
            {!!attachments.length &&
              attachments.map((item, key) => {
                switch (item.type) {
                  case 'video':
                    return (
                      <View
                        style={styles['chatmessage_message--file']}
                        key={key}
                      >
                        <Block
                          inArticle={false}
                          block={{
                            type: 'download',
                            data: {
                              src: item.src,
                              name: item.name,
                            },
                          }}
                        />
                      </View>
                    );
                  case 'audio':
                    return (
                      <View
                        style={styles['chatmessage_message--file']}
                        key={key}
                      >
                        <Block
                          inArticle={false}
                          block={{
                            type: 'download',
                            data: {
                              src: item.src,
                              name: item.name,
                            },
                          }}
                        />
                      </View>
                    );
                  case 'document':
                    return (
                      <View
                        style={styles['chatmessage_message--file']}
                        key={key}
                      >
                        <Block
                          inArticle={false}
                          block={{
                            type: 'download',
                            data: {
                              src: item.src,
                              name: item.name,
                            },
                          }}
                        />
                      </View>
                    );
                  case 'file':
                    return (
                      <View
                        style={styles['chatmessage_message--file']}
                        key={key}
                      >
                        <Block
                          inArticle={false}
                          block={{
                            type: 'download',
                            data: {
                              src: item.src,
                              name: item.name,
                            },
                          }}
                        />
                      </View>
                    );
                  case 'image':
                    return (
                      <Lightbox
                        underlayColor="white"
                        key={key}
                        renderContent={() => renderLightBoxImage(item.src)}
                      >
                        <CacheImage
                          source={item.src}
                          indicator={true}
                          indicatorColor="#919191" // react native colors or color codes like #919191
                          indicatorSize="small" // (small | large) or integer
                          style={styles['chatmessage_message--img']}
                          resizeMode="contain"
                          auto
                        />
                      </Lightbox>
                    );
                  default:
                    return (
                      <View
                        key={key}
                        style={styles['chatmessage_message--active']}
                      >
                        <Autolink
                          style={styles['chatmessage_message-content--active']}
                          text={message}
                          linkStyle={{
                            color: '#fff',
                            textDecorationLine: 'underline',
                          }}
                        />
                      </View>
                    );
                }
              })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Logic(ChatMessage);
