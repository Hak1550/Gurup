import React, { useState, useRef } from "react"
import Styled from "./styles"
import Logic from "./logic"
import { Animated } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const FloatingLabelInput = ({ error, placeholder, secureTextEntry, name, onChange, style, ...props}) => {

    const labelStyle = {
        top: useRef(new Animated.Value(15)).current,
        fontSize: useRef(new Animated.Value(14)).current,
    }

    const [value, setValue] = useState(false);
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    togglePasswordVisibility = () => setPasswordVisibility(!isPasswordVisible)

    handleFocus = (e) => {
        if (props.onFocus) {
            props.onFocus(e)
        }
        Animated.parallel([
            Animated.timing(
                labelStyle.top,
                {
                    toValue: 0, duration: 300
                }
            ),
            Animated.timing(
                labelStyle.fontSize,
                {
                    toValue: 12, duration: 300
                }
            ),
        ]).start()
    };

    handleBlur = (e) => {
        if (props.onBlur) {
            props.onBlur(e)
        }
        if(!value){
            Animated.parallel([
                Animated.timing(
                    labelStyle.top,
                    {
                        toValue: 15, duration: 300
                    }
                ),
                Animated.timing(
                    labelStyle.fontSize,
                    {
                        toValue: 14, duration: 300
                    }
                ),
            ]).start()
        }
    };

    handleChange = (value) => {
        if (props.onChangeText){
            props.onChangeText(value)
        }
        setValue(value);
        if (onChange){
            onChange({name, value});
        }
    }

    const inputProps = {
        ...props,
        onFocus: handleFocus,
        onBlur: handleBlur ,
        onChangeText: handleChange
    }

    if (secureTextEntry && !isPasswordVisible) {
        inputProps.secureTextEntry = true;
    }

    return (
        <Styled.InputWrap style={style}>
            <Styled.Label as={Animated.Text} error={error} style={labelStyle}>
                {placeholder}
            </Styled.Label>
            <Styled.Input
                {...inputProps}
            />
            {secureTextEntry && (
                <Styled.IconWrap onPress={togglePasswordVisibility}>
                    <Styled.Icon isPasswordVisible={isPasswordVisible}/>
                </Styled.IconWrap>
            )}
        </Styled.InputWrap>
    );
}

export default Logic(FloatingLabelInput)
