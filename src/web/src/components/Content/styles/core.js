import styled, { css } from "styled-components"
import React from "react"

export const Container = styled.div`
	background-color: #ffffff;
	border: 1px solid #f2f2f2;
	padding: ${props => (props.padding ? props.padding : "24px 26px 51px 26px")};
	${({verticalCenter, horizontalCenter}) => (verticalCenter || horizontalCenter) && css`display: flex`};
	${({verticalCenter}) => verticalCenter && css`justify-content: center`};
	${({horizontalCenter}) => horizontalCenter && css`align-items: center`};
	@media (max-width: 480px) {
        padding: 15px;
    }
`

export const Body = styled.div`
	width: ${prop => prop.bodyWidth};
`

export const Footer = styled.div``
