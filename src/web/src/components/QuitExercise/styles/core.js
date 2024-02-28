import styled from 'styled-components'
import { config } from "styles/variables"

export const Modal = styled.div`
    background-color: white;
    padding-top: 43px;
    padding-bottom: 41px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const Image = styled.div`
    background-image: url(${require("assets/core/quit-exercise.png")});
    width: 89px;
    height: 89px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 6px;
`

export const Text = styled.p`
    color: ${config.colors.$textColor};
    font-weight: 500;
    margin-bottom: 6px;
    max-width: 285px;
`

export const Note = styled.p`
    color: ${config.colors.$contentPale};
    font-weight: 300;
    margin-bottom: 33px;
    max-width: 280px;
`

export const Quit = styled.button`
    margin-right: 26px;
    color: ${config.colors.$contentPale};
    font-size: 14px;
`

export const Wrap = styled.div`
    display: flex;
`
