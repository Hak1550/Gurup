import styled from 'styled-components';
import {NavLink} from 'react-router-dom';


export const Chats = styled.div`
    display: flex;
    background-color: #F0F0F0;
    max-width: 1000px;
    overflow: hidden;
    box-shadow: 0 0 10px #B1B1B1;
`

export const Sidebar = styled.div`
    width: 250px;
    flex-shrink: 0;
    display: flex;
    height: 608px;
    flex-direction: column;
`

export const SearchWrap = styled.div`
    position: relative;
`

export const Search = styled.input`
    background-color: white;
    width: 100%;
    padding-left: 43px;
    padding-right: 20px;
    color: #462163;
    height: 37px;
    &::placeholder {
        color: #3D3737;
    }
`

export const SearchIcon = styled.i`
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translate(0,-50%);
`

export const List = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    background-color: white;
    height: 100%;
    margin-top: 2px;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background: ${({theme}) => theme.$accent};
        border-radius: 50px;
    }
    &::-webkit-scrollbar-thumb:hover {
        background-color: ${({theme}) => theme.$accent};
    }
    &::-webkit-scrollbar-track {
        background: transparent;
    }
`

export const Chat = styled(NavLink)`
    display: flex;
    align-items: center;
    padding: 9px;
    border-bottom: 2px solid #F0F0F0;
    background-color: white;
    &:last-child {
        border-bottom: 0;
    }
    &:first-child {
        border-top: 0;
    }
    &.active {
        background-color: #F0F0F0;
        color: #3D3737;
    }
`

export const Name = styled.p`
    margin-left: 8px;
`

export const ChatWrap = styled.div`
    width: 100%;
    max-height: 608px;
    display: flex;
    flex-direction: column;
`

export const ChatHeader = styled.div`
    height: 37px;
    background-color: white;
    flex-shrink: 0;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 2px;
    justify-content: space-between;
    margin-left: 2px;
`

export const HeaderWrap = styled.div`
    display: flex;
    align-items: center;
`

export const Title = styled.p`
    font-size: 14px;
`

export const DeleteIcon = styled.i`
    margin-left: 11px;
`

export const Content = styled.div`
    margin-left: 2px;
    padding-top: 10px;
    padding-right: 20px;
    padding-left: 20px;
    padding-bottom: 10px;
    overflow-y: auto;
    background-color: white;
    height: 100%;
`

export const PaidConsultation = styled.button`
    background-color: ${ ({ theme }) => theme.$accent };
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 2px;
    flex-shrink: 0;
    height: 37px;
`

export const Placeholder = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

export const PlaceholderText = styled.p`
    color: #484545;
    &.top {
        font-weight: bold;
        margin-bottom: 5px;
    }
`

export const PlaceholderImage = styled.div`
    width: 89px;
    height: 89px;
    background-image: url(${require("assets/core/placeholders/no-messages.png")});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    margin-bottom: 19px;
`;

export const ChatOver = styled.p`
    background-color: white;
    width: 100%;
    padding-left: 43px;
    padding-right: 20px;
    color: #462163;
    height: 37px;
    text-align: center;
`;
