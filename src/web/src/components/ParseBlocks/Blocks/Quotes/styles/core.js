import styled from "styled-components"
import { config } from "styles/variables"

export const QuoteContainer = styled.div`
	background: #f9f9f9;
	padding: 39px 116px 29px;
	position: relative;
`
export const QuoteBody = styled.div``

export const Text = styled.p`
	font-size: 14px;
	line-height: 24px;
	color: ${config.colors.$textColor};
`
export const QuoteFooter = styled.div`
	display: flex;
	justify-content: flex-end;
	align-items: center;
`
export const Author = styled.p`
	margin-right: 10px;
	font-weight: 500;
	font-size: 14px;
	color: ${config.colors.$contentPale};
`
export const AuthorPhoto = styled.div`
	width: 56px;
	height: 56px;
	background-image: url('${prop => prop.photo}');
	background-size: cover;
	border-radius: 2rem;
`

export const ButtonPrev = styled.button`
	position: absolute;
	left: 30px;
	top: 43%;
	transform: translateY(-50%);
`
export const ButtonNext = styled.button`
	position: absolute;
	right: 30px;
	top: 43%;
	transform: translateY(-50%);
`
export const Icon = styled.i`
	font-size: 24px;
`
