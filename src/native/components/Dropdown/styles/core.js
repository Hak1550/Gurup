import styled, {css} from "styled-components/native"
import ModalDropdown from '../ModalDropdown';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import EStyleSheet from "react-native-extended-stylesheet";
import React from "react";
// import Dropdown from "../core";

const DropdownSeparator = styled.View`
    height: 1px;
    background-color: ${({ theme }) => theme.$additionalTextColor};
    margin: 0 5px;
`
const defaultAdjustment = ({ top, ...rest }) => ({
    top: top - 2,
    ...rest
})
export const CustomDropdown = styled(ModalDropdown).attrs(
    ({dropdownStyles, adjustFrame, ...props}) => ({
        dropdownTextStyle: {
            fontSize: 14,
            color: EStyleSheet.value("$textColor"),
            backgroundColor: EStyleSheet.value("$itemBackground"),
            borderWidth: 0,
            ...dropdownStyles.dropdownTextStyle
        },
        dropdownTextHighlightStyle: {
            fontSize: 14,
            color: EStyleSheet.value("$textColor"),
            backgroundColor: EStyleSheet.value("$itemBackground"),
            ...dropdownStyles.dropdownTextHighlightStyle
        },
        dropdownStyle: {
            width: 250,
            backgroundColor: EStyleSheet.value("$itemBackground"),
            borderWidth: 0,
            height: 200,
            top: -200,
            ...dropdownStyles.dropdownStyle
        },
        renderSeparator: (value, index) => {
            index = parseInt(index)
            if(index + 1 != props.options.length)
                return <DropdownSeparator style={dropdownStyles.separatorStyle}/>
            else 
                return null
        },
        adjustFrame: adjustFrame ? adjustFrame : defaultAdjustment,
        ...props,
    })
)`
`

export const Control = styled.View`
    flex-direction: row;
    align-items: center;
    width: 250px;
    padding-bottom: 10px;
    border-bottom-width: 1;
    border-bottom-color: ${({ theme }) => theme.$itemBackground};
`

export const Label = styled.Text`
    font-size: 16;
    color: ${({theme}) => theme.$textColor};
`

export const Arrow = styled(FontAwesome).attrs(
    ({ isOpen, ...props }) => ({
        name: isOpen ? "chevron-up": "chevron-down",
        ...props
    })
)`
    color: ${({ theme }) => theme.$textColor};
    margin-left: auto;
`