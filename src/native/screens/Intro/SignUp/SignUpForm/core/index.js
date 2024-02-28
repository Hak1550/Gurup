import React from "react";
import {View, Text, Linking, TouchableOpacity} from "react-native";
import styles from "../styles";
import Input from '../../../../../components/Input';
import Button from "../../../../../components/Button";
import EStyleSheet from "react-native-extended-stylesheet";
import Logic from '../logic'

const Form = ({ state, handleFieldChange, influencer, _onPressButton, t }) => {
    return (
        <View style={styles['form']}>
            <Input
                icon={'user-o'}
                placeholder={t('app_login:whats_name')}
                name="name"
                onChangeText={handleFieldChange}
                value={state.name}
            />
            <Input
                autoCapitalize='none'
                icon={'envelope-o'}
                placeholder={t('app_login:enter_email')}
                name="email"
                onChangeText={(handleFieldChange)}
                value={state.email}
            />
            <Input
                icon={'key'}
                placeholder={t('app_login:create_password')}
                name="password"
                onChangeText={handleFieldChange}
                value={state.password}
                secureTextEntry
            />
            <View style={styles["form__text-wrap"]}>
                <Text style={styles["form__text"]}>
                    {t('app_login:agree_privacy_policy')}
                </Text>
                <TouchableOpacity onPress={() => {
                    if (influencer && influencer.privacyPolicy){
                        Linking.openURL(influencer.privacyPolicy)
                    }else{
                        Linking.openURL(t('basic:policy_url'))
                    }
                }}>
                    <Text style={styles["form__link-text"]}>{t('app_login:privacy_policy')}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    if (influencer && influencer.termsOfUse) {
                        Linking.openURL(influencer.termsOfUse)
                    } else {
                        Linking.openURL(t('basic:terms_url'))
                    }
                }}>
                    <Text style={styles["form__link-text"]}>{t('app_login:terms_of_use')}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles['form__signin']}>
                <Button
                    onPress={_onPressButton}
                    title={t('app_login:sign_up')}
                    theme="accent"
                    style={styles['form__signin-button']}
                />
            </View>
        </View>
    )
}

export default Logic(Form)
