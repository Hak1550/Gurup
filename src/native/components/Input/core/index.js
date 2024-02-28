import React, {useState, useEffect, useRef} from "react";
import {View, TextInput, TouchableOpacity, Platform } from "react-native";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EStyleSheet from "react-native-extended-stylesheet";

const Input = ({icon, name, value,
    // placeholderTextColor = EStyleSheet.value('$additionalTextColor'),
    //TODO
    placeholderTextColor="#ccc",
    style,
    onChangeText, ...rest}) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    const textInputRef = useRef()
    if (EStyleSheet.builded) {
        placeholderTextColor = EStyleSheet.value('$textColor')
    }
    const wrap_styles = [styles["input__wrap"]];
    // console.log("PLACEGOLDER COLOR", placeholderTextColor);
    if(style){
        wrap_styles.push(style)
    }
    let resetFont = () => {
        if (Platform.OS == "android") {
            // console.log("reset");
            textInputRef.current?.setNativeProps({
                style: {
                    fontFamily: "Main-Light",
                },
            });
        }
    }
    useEffect(() => {
        if (isPasswordVisible || !value) {
            resetFont()
        }
    }, [isPasswordVisible, value]);
    useEffect(() => {
        resetFont()
    }, []);
    let secureTextEntry = rest.secureTextEntry && !isPasswordVisible
    // console.log("secureTextEntry", value, secureTextEntry);
    return (
        <View style={wrap_styles}>
            {icon && (
                <View style={styles['input__icon-wrap']}>
                    <FontAwesome name={icon} style={styles['input__icon']}/>
                </View>
            )}
            <TextInput
                placeholderTextColor={placeholderTextColor}
                style={styles['input']}
                // underlineColorAndroid='rgba(43,32,85, 0.1)'
                onChangeText={text => onChangeText({name, value: text})}
                ref={_ref => {
                    textInputRef.current = _ref;
                }}
                value={value}
                {...rest}
                secureTextEntry={secureTextEntry}
            />
            {rest.secureTextEntry && (
                <View style={styles['input__icon-wrap']}>
                    <TouchableOpacity onPress = {() => setPasswordVisibility(!isPasswordVisible)}>
                        <FontAwesome name={isPasswordVisible ? "eye-slash" : "eye"} style={styles['input__icon']}/>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
};

export default Input
