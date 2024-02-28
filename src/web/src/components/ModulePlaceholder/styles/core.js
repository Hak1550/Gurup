import styled from "styled-components"

export const PlaceholderContainer = styled.div`
	display: ${({display}) => display ? display : 'flex'};
	align-items: ${({alignItems}) => alignItems ? alignItems : 'center'};
	flex-direction: ${({direction}) => direction ? direction : 'column'};
	justify-content: ${({justifyContent}) => justifyContent ? justifyContent : 'center'};;
`

export const PlaceholderImage = styled.img`
	display: block;
	max-width: ${({ maxWidth }) => maxWidth ? maxWidth : '63px'};
	height: auto;
	margin-bottom: 25px;
`
export const PlaceholderText = styled.p`
	font-weight: 500;
	font-size: 16px;
	color: ${({ theme }) => theme.$textColor};
	text-align: center;
`
