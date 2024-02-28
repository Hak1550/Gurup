import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from "../styles";
import Input from '../../../../../components/Input';
import Button from "../../../../../components/Button";
import FormLogic from '../logic'
import ForgotModal from "../../../../../components/ForgotModal";

const Form = ({methods, state, t,...rest}) => (
    <View style={styles['form']}>
        <Input
            autoCapitalize='none'
            autoCorrect={false}
            icon={'envelope-o'}
            placeholder={t('log_in_page:login_label')}
            name="email"
            onChangeText={(methods.handleFieldChange)}
            autoCompleteType="email"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={state.email}
        />
        <Input
            icon={'key'}
            placeholder={t('log_in_page:password_label')}
            name="password"
            onChangeText={methods.handleFieldChange}
            value={state.password}
            secureTextEntry
            textContentType="password"
        />
        
        <View style={styles['form__signin']}>
            <Button
                onPress={methods._onPressButton}
                title={t('app_login:sign_in')}
                theme="accent"
                style={styles['form__signin-button']}
            />
        </View>
        <View style={styles["form__text-wrap"]}>
            <TouchableOpacity onPress={methods.toggleForgotModal}>
                <Text style={styles['form__text']}>{t('app_login:forgot_password')}</Text>
            </TouchableOpacity>
        </View>

        <ForgotModal
            modalVisible={state.forgotModalOpened}
            toggleModal={methods.toggleForgotModal}
            buttonAction={()=>{
                methods.toggleForgotModal();
            }}
        />
    </View>
)

export default FormLogic(Form)


