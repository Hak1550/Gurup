import styled, { css } from "styled-components"

export const DateContainer = styled.div`
	display: inline-block;
	margin: 0 20px;
`
export const DateItemNumberContainer = styled.div`
	background-color: ${props => props.disable ? "transparent" : "#f8f8fb"} ;
	padding: 0 45px;
	display: inline-block;
	border-top-left-radius: ${props => props.first && '3em'};
	border-bottom-left-radius: ${props => props.first && '3em'};
	border-top-right-radius: ${props => props.last && '3em'};
	border-bottom-right-radius: ${props => props.last && '3em'};
`

export const DateItemNumber = styled.span`
	display: inline-block;
	border-radius: 3em;
	padding: 5px 7px;
	font-size: 14px;
	position: relative;
	color: ${props => props.disable ? "#949CA4" : props.theme.$textColor}
	${props =>
		props.active &&
		css`
			background-color: ${props => props.theme.$accent};
			color: #fff;
		`}
	${props =>
		props.dotColor &&
		css`
			&:before {
				content: "";
				width: 6px;
				height: 6px;
				position: absolute;
				background-color: ${props.dotColor};
				border-radius: 2em;
				border: 2px solid #fff;
				bottom: -5px;
				left: 50%;
				transform: translateX(-50%);
			}
		`}
`

export const DateItemName = styled.p`
	text-align: center;
	margin-bottom: 12px;
	color: ${props => props.theme.$contentPale};
	font-size: 14px;
	${props =>
		props.active &&
		css`
			font-weight: 600;
			color: ${props.theme.$textColor};
		`}
`

export const DateItemContainer = styled.div`
	display: inline-block;
	&:first-child ${DateItemNumberContainer} {
		border-top-left-radius: 2em;
		border-bottom-left-radius: 2em;
	}
	&:last-child ${DateItemNumberContainer} {
		border-top-right-radius: 2em;
		border-bottom-right-radius: 2em;
	}
`
export const DateNavButton = styled.button`
	background: #ffffff;
	box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
	padding: 8px 13px 8px;
	font-size: 14px;
	border-radius: 2em;
	display: inline-block;
	transition: all ease-in .15s;
	visibility: ${props => props.hide ? 'hidden' : 'visible'};
	&:hover {
		box-shadow: 0 0 13px 0px rgba(0,0,0,0.25);
		transform: scale(1.05);
	}
`
