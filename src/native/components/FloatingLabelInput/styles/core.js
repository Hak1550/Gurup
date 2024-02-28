import styled from "styled-components/native"
import FontAwesome from "react-native-vector-icons/FontAwesome"


export const InputWrap = styled.View`
    padding-top: 15px;
`

export const Label = styled.Text`
    position: absolute;
    left: 0;
    color: ${({ theme, error }) => error ? "#EB5757" : theme.$additionalTextColor};
`

export const Input = styled.TextInput`
    height: 26px;
    font-size: 14px;
    color: ${({ theme }) => theme.$textColor};
`

export const IconWrap = styled.TouchableOpacity`
    margin-left: auto;
    position: absolute;
    top: 15px;
    right: 0;
`

export const Icon = styled(FontAwesome).attrs(({isPasswordVisible, ...props}) => ({
    name: isPasswordVisible ? "eye" : "eye-slash", 
    ...props
}))`
    margin-left: auto;
    color: ${({ theme }) =>  theme.$textColor};
    font-size: 14px;
`


