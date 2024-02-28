import React from "react";
import {Text, View} from 'react-native'
import MainLayout from "../../../components/MainLayout";
import styles from '../styles'
import Switch from 'react-native-switch-pro'
import Button from "../../../components/Button";
import Logic from '../logic'

const Notification = ({t}) => {
    return (
        <MainLayout screenTitle={'Notification settings'} getAvatar={false}>
            <View style={styles['notification']}>
                <Text style={styles['notification__title']}>{t('app_notification:select_type_notification')}</Text>
                <View style={styles['notification__item']}>
                    <Text style={styles['notification__item-text']}>{t('app_notification:new_courses_button')}</Text>
                    <Switch backgroundActive={'#6ad398'} backgroundInactive={'#E9467E'} width={52} height={28}/>
                </View>
                <View style={styles['notification__item']}>
                    <Text style={styles['notification__item-text']}>{t('app_notification:course_updates_button')}</Text>
                    <Switch backgroundActive={'#6ad398'} backgroundInactive={'#E9467E'} width={52} height={28}/>
                </View>
                <View style={styles['notification__item']}>
                    <Text style={styles['notification__item-text']}>{t('app_notification:chats_button')}</Text>
                    <Switch backgroundActive={'#6ad398'} backgroundInactive={'#E9467E'} width={52} height={28}/>
                </View>
                <View style={styles['notification__btn-wrapper']}>
                    <Button title={'app_basic:save_button'} theme="accent"/>
                </View>
            </View>
        </MainLayout>
    );
}

export default Logic(Notification)