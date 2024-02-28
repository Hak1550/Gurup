import styled from "styled-components/native";
import Button from "../Button";

export const PlaceholderWrap = styled.View`
	flex: 1;
    justify-content: center;
    align-items: center;
`

export const PlaceholderText = styled.Text`
    width: 100%;
    text-align: center;
    font-size: 20px;
    color: ${({theme}) =>  theme.$textColor}
`
export const PlaceholderActionButton = styled(Button)`
  margin-top: 30px;
`