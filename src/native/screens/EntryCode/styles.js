import styled from "styled-components/native";
import ThemedButton, {RoundedButton} from "../../components/Button"
import CustomInput from "../../components/Input";
import {KeyboardAvoidingView, Platform, Dimensions} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {isTall} from "../../utils"
import {HiddenBlock} from "../../components/AnimatedContainers";
import _Logo from "../../components/Logo";

const KeyboardAvoider = Platform.select({
    // ios: Dimensions.get('window').height > 568
    //     ?  styled(KeyboardAvoidingView).attrs((props) => ({
    //         ...props,
    //         behavior: "padding",
    //     }))``
    //     : styled(KeyboardAwareScrollView).attrs((props) => ({
    //         ...props,
    //         contentContainerStyle: {
    //             flex: 1,
    //         },
    //         // extraScrollHeight: 30,
    //         behavior: "padding",
    //     }))``,
    ios: styled(KeyboardAvoidingView).attrs((props) => ({
        ...props,
        behavior: "padding",
    }))``,
    android: styled(KeyboardAvoidingView).attrs((props) => ({
        ...props, 
        behavior: "padding",
        keyboardVerticalOffset: -80
    }))``
})

export const Screen = styled.View`
    background-color: ${({theme}) => theme.$screenBackgroundColor};
    flex: 1;
    padding: 50px 10%;
`

export const LogoWrap = styled.View`
    flex: ${Dimensions.get('window').height > 568 ? 2 : 1};
    justify-content: center;
    align-items: center;
`
export const ContentKeyboardAvoid = styled(KeyboardAvoider)`
    flex: ${Dimensions.get('window').height > 568 ? 5 : 3};
`

export const Content = styled.View`
    align-items: center;
    flex: 1;
`

export const Logo = styled(_Logo)`
    width: 240px;
`;

export const HiddenContainer = styled(HiddenBlock)`
  align-items: center;
`

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.$textColor};
    margin-bottom: 18px;
`;

export const SubTitle = styled.Text`
    font-size: 14px;
    color: ${({theme}) => theme.$additionalTextColor};
    text-align: center;
    margin-bottom: auto;
`
export const InputWrap = styled.View`
    flex: 1;
    justify-content: center;
    width: 100%;
`

export const Input = styled(CustomInput)`
    width: 100%;
    margin-bottom: 22px;
`

export const EntryButton = styled(ThemedButton)`
    width: 194px;
`
export const BackButton = styled(RoundedButton)`
`

export const NavWrapper = styled.View`
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
`

export const Link = styled.Text`
    color: ${({theme}) => theme.$screenBackgroundColor};
`