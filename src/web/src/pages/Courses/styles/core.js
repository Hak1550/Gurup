import styled from "styled-components"
import { config } from "styles/variables"

export const  CoursesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	grid-gap: 27px;
`

export const  CardTitle = styled.h4`
	font-size: 14px;
	font-weight: 700;
	line-height: 16px;
	margin-bottom: 12px;
	color: #fff;
	z-index: 20;
	padding: 0 13px;
`

export const  CardDescription = styled.p`
	font-size: 14px;
	line-height: 16px;
	color: ${config.colors.$contentPale};
	margin-bottom: 40px;
`

export const  CardPrice = styled.div`
	color: ${config.colors.$textColor};
	font-weight: 700;
	font-size: 24px;
	margin-top: auto;
	margin-bottom: 32px;
`

export const  CardBackground = styled.div`
	background: ${props => `url(${props.img}) #fafafa no-repeat center`};
	background-size: ${props => props.resizeMode ? props.resizeMode : 'cover'};
	width: 100%;
	height: 100px;
	display: flex;
	min-height: 130px;
	align-items: flex-end;
	position: relative;
	&::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: ${props => !props.loading && `linear-gradient(179.23deg, rgba(0, 0, 0, 0) 35.03%, rgba(9, 13, 47, 0.69) 84.5%)`};
		z-index: 5;
	}
`
