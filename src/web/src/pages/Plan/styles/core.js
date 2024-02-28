import styled from "styled-components"
import { config } from "styles/variables"

//Style

const { $textColor } = config.colors

export const Or = styled.p`
	margin-top: 6px;
`

export const Currency = styled.span`
	font-size: 18px;
`

export const PriceWrap = styled.div`
	margin-bottom: 20px
`

export const Image = styled.div`
	min-height: 278px;
	background: ${props => `url(${props.src}) transparent no-repeat center`};
	background-size: cover;
	margin-bottom: 28px;
`

export const Title = styled.h3`
	color: ${$textColor};
	font-size: 18px;
	margin-bottom: 16px;
`

export const PageBody = styled.div`
	width: 40%;
	margin-bottom: 43px;
`

export const PageFooter = styled.div`
`

export const FooterTitle = styled.h3`
	margin-bottom: 18px;
	font-size: 18px;
	color: ${$textColor};
	font-weight: 500;
`

export const FooterGrid = styled.div`
	display: grid;
    grid-template-columns: repeat(auto-fill,minmax(290px,1fr));
    grid-gap: 23px;
`

export const Price = styled.span`
	font-size: 24px;
	color: ${$textColor};
	font-weight: 700;
	margin-bottom: 32px;
	margin-top: 16px
`