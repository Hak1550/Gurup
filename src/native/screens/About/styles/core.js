import styled from "styled-components/native";

export const About = styled.View`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 20px;
`

export const Link = styled.TouchableOpacity`
    margin-bottom: 34px ;
    align-content: flex-start;
    flex-wrap: wrap;
`

export const LinkText = styled.Text`
    color:${({ theme }) => theme.$textColor};
    font-size: 16px;
`

export const Separator = styled.View`
    background-color: ${({theme}) => theme.$itemBackground};
    height: 1px;
    margin-bottom: 34px;
`