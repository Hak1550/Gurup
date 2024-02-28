import styled from "styled-components"
import { config } from "styles/variables"

export const Question = styled.div`
    border: 1px solid #cccccc;
`

export const HeadContainer = styled.div`
	cursor: pointer;
	padding: 16px 16px;
	background-color: #e6e6e6;
`

export const HeaderTitle = styled.h3`
	color: ${config.colors.$textColor};
`

export const BodyContainer = styled.div`
	background-color: #f5f5f5;
	padding: 18px 16px 36px;
`

export const BodyContent = styled.p`
	color: ${config.colors.$textColor};
`
