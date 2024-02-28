import styled from "styled-components"

export const Avatar = styled.div`
    width: 56px;
    height: 56px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: white;
    background-size: cover;
    background-image: ${props => `url(${props.img})`};
    background-repeat: no-repeat;
    background-position: center;
    &.default {
        border: 10px solid;
    }
    &.small {
        width: 26px;
        height: 26px;
        margin-right: 8px;
        font-size: 10px;
        &.default {
            border: 5px solid;
        }
    }
    &.pink {
        border-color: #A53789;
        background-color: #C970B2;
    }
    &.purple {
        border-color: #4C3D88;
        background-color: #6D50AB;
    }
    &.blue {
        border-color: #6169AB;
        background-color: #848EE3;
    }
    &.green {
        border-color: #458F6B;
        background-color: $green;
    }
    &.red {
        border-color: #D56161;
        background-color: $red;
    }
    &.yellow {
        border-color: #DC9B1A;
        background-color: #FFB118;
    }
    &.blue-dark {
        border-color: #372387;
        background-color: #4427B8;
    }
`
