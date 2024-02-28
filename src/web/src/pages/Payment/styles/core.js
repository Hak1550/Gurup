import styled from "styled-components"
import { config } from "styles/variables"
import DefaultContent from "components/Content"
import DefaultSign from 'components/Sign';
import Button from 'components/Button';


let {$textColor} = config

export const DownloadApp = styled.img`
	width: 211px;
`

export const Apps = styled.div`
    
`

export const Mobile = styled.div`
    display: none;
    @media (max-width: 480px) {
        display: block;
    }
`

export const Desktop = styled.div`
    display: block;
    @media (max-width: 480px) {
        display: none;
    }
`

export const Content = styled(DefaultContent)`
    &__body {
        display: flex;
    flex-direction: column;
    align-items: center;
    }
`

export const BlockImage = styled.img`
	width: 161px;
`
export const CloseBlock = styled.i`
    color: black;
    font-size: 19px;
    cursor: pointer;
	margin-top: 17px;
    margin-bottom: 38px;
`
export const Title = styled.h3`
	color: ${$textColor};
	font-size: 18px;
`

export const Block = styled.div`
	position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    z-index: 99;
    left: 0;
    padding-top: 60px;
    bottom: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
`

export const SubTitle = styled.p`
	font-size: 14px;
    color: #57606E;
    text-align: center;
    max-width: 250px;
`