import {Dimensions} from "react-native";
import styled from "styled-components/native";
import ThemedButton from "../../../components/Button"
import _Logo from "../../../components/Logo";

export const Screen = styled.View`
    background-color: ${({theme}) => theme.$screenBackgroundColor};
    flex: 1;
    padding: 50px 10%;
`


export const LogoWrap = styled.View`
    /* flex: ${Dimensions.get('window').height > 568 ? 2 : 1};   */
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`

export const Content = styled.View`
    flex: ${Dimensions.get('window').height > 568 ? 5 : 3};
    align-items: center;
`

export const Logo = styled(_Logo)`
    width: 120px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.$textColor};
    margin-bottom: 18px;
`;

export const SubTitle = styled.Text`
    font-size: 14px;
    color: ${({theme}) => theme.$additionalTextColor};
    text-align: center;
    margin-bottom: 14px;
`

export const ButtonWrap = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
`

export const Button = styled(ThemedButton)`
    margin-bottom: 14px;
`


export const Link = styled.Text`
    color: ${({theme}) => theme.$additionalTextColor};
`