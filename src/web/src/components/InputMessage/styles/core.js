import styled, {css} from 'styled-components';
import {config} from "styles/variables"
import FileUploader from 'components/FileUploader';
import TextareaAutosize from 'react-autosize-textarea';

export const Attachments = styled.div`
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    flex-shrink: 0;
    padding-left: 16px;
    padding-top: 5px;
    margin-left: 2px;
    padding-bottom: 5px;
`

export const Icon = styled.i`

`

export const Attachment = styled.div`
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-position: center;
    margin-right: 5px;
    margin-top: 5px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    background-size: cover;
    border-radius: 8px;
    position: relative;
    &.loading {
        background-size: contain;
        background-image: url(${require("assets/core/profile.gif")});
    }
    &:hover {
        .delete {
            display: block;
        }
    }
`

export const AttachmentDelete = styled.button`
    position: absolute;
    display: none;
    right: -4px;
    top: -4px;
    width: 12px;
    height: 12px;
    justify-content: center;
    align-items: center;
    font-size: 8px;
    border-radius: 50%;
    background-color: white;
    color: #A53789;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.25);
`

export const InputWrap = styled.div`
    position: relative;
    font-size: 14px;
    max-width: 100%;
    margin-top: 2px;
    margin-right: 2px;
    color: #777777;
`

export const Input = styled(TextareaAutosize)`

    background-color: white;
    width: 100%;
    outline: none;
    border: none;

    resize: none;

    border-radius: 0;
    box-shadow: none;
    display: block;
    height: 37px;
    margin-left: 2px;
    padding: 10px 45px 10px 42px;
    line-height: 17px;

    &::placeholder {
        color: #777777;
    }
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: #AE4A84;
        border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: #AE4A84;
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

export const Plane = styled.i`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    font-size: 18px;
    cursor: pointer;
`

export const Uploader = styled(FileUploader)`
    position: absolute !important;
    left: 19px;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 999;
    cursor: pointer;
    display: flex;
`
