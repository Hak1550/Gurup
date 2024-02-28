import styled from "styled-components"
import { config } from "styles/variables"

export const ReadMoreContainer = styled.div`
`

export const TextContent = styled.p`
	font-size: 14px;
	color: ${config.colors.$textColor};
	margin-bottom: 10px;
	white-space: pre-line;
`

export const ReadMoreButton = styled.span`
	text-decoration: underline;
	cursor: pointer;
	font-weight: 700;
	font-size: 14px;
	color: ${config.colors.$textColor};
	&:hover {
		color: ${({theme}) => theme.$accent}
	}
`
