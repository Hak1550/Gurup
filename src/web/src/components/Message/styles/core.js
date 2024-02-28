import styled, { css } from "styled-components"
import {config} from "styles/variables"
const { $textColor, $accent } = config.colors

export const Wrap = styled.div`
    display: flex;
    margin-bottom: 25px;
    &.reverse {
        flex-direction: row-reverse;
        align-items: flex-end;
    }
    &:last-child {
        margin-bottom: 0;
    }
`

export const Time = styled.div`
    position: absolute;
    right: 11px;
    top: 11px;
    color: $grey;
    font-size: 12px;
`

export const Message = styled.div`
    margin-right: 16px;
    margin-left: 16px;
    border-radius: 20px;
    border-top-left-radius: 0;
    padding-top: 7px;
    padding-bottom: 13px;
    padding-right: 16px;
    max-width: 450px;
    padding-left: 16px;
    position: relative;
    background-color: #F2F2F2;
    &.reverse {
        border-radius: 20px;
        border-bottom-right-radius: 0;
        background-color: #F2F8FF;
    }
`

export const Name = styled.p`
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 8px;
    margin-right: 190px;
`

export const Text = styled.p`
    font-size: 14px;
    white-space: pre-line;
`

export const Attachments = styled.div`

`

export const Icon = styled.i`
    margin-bottom: 10px;
`

export const Attachment = styled.div`
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    width: 223px;
    height: 132px;
    margin-top: 7px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-size: cover;
`
