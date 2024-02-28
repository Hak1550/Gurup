import styled from 'styled-components'
import {config} from "styles/variables"

export const BlockContainer = styled.div`
	margin: 0 0 26px;
`

export const Image = styled.img`
    display: block;
    max-width: 100%;
    height: auto;
`

export const Paragraph = styled.p`
	color: ${config.colors.$textColor};
	font-size: 14px;
`