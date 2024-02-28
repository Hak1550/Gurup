import React, {Fragment} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import styles from "../styles";
// import Input from '../../../Input';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Button from '../../../Button';
import { isEmpty } from "../../../../utils";
import Input from '../../../FloatingLabelInput';
import DismissKeyboard from "../../../DismissKeyboard";
import Logic from '../logic';
import { Formik } from 'formik';

const ChangePassword = ({state, changePassword, validationSchema, t}) => {
    return (
        <Formik
            initialValues={{ current_password: "", new_password: '', repeat_password: ''}}
            onSubmit={changePassword}
            validationSchema={validationSchema}
        >
            {({ handleChange, touched, handleBlur, handleSubmit, values, errors }) => {
                return (
                    <DismissKeyboard>
                        <View style={styles['change-password__body']}>
                            <View style={styles['change-password__body-input']}>
                                <Input
                                    error={errors.current_password && touched.current_password}
                                    placeholder={t('app_basic:current_password_placeholder')}
                                    secureTextEntry
                                    name="current_password"
                                    textContentType="password"
                                    value={values.current_password}
                                    onChangeText={handleChange('current_password')}
                                    onBlur={handleBlur('current_password')}
                                />
                            </View>
                            <View style={styles['change-password__body-input']}>
                                <Input
                                    error={errors.new_password && touched.new_password}
                                    placeholder={t('app_basic:new_password_placeholder')}
                                    secureTextEntry
                                    name="new_password"
                                    textContentType="password"
                                    value={values.new_password}
                                    onChangeText={handleChange('new_password')}
                                    onBlur={handleBlur('new_password')}
                                />
                            </View>
                            <View style={styles['change-password__body-input']}>
                                <Input
                                    error={errors.repeat_password && touched.repeat_password}
                                    placeholder={t('app_basic:new_password_repeat_placeholder')}
                                    secureTextEntry
                                    textContentType="password"
                                    name="repeat_password"
                                    value={values.repeat_password}
                                    onChangeText={handleChange('repeat_password')}
                                    onBlur={handleBlur('repeat_password')}
                                />
                            </View>
                            {!isEmpty(errors) && Object.keys(errors).map((field) => (
                                touched[field] && <Text style={styles['change-password__error']}>{errors[field]}</Text>
                            ))}
                            <View style={styles['change-password__body-btn']}>
                                <Button
                                    title={t('basic:save_button')}
                                    theme="accent"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </DismissKeyboard>
                )
            }}         
        </Formik>
    )
}


export default Logic(ChangePassword)
