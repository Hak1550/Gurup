import styled, { css } from "styled-components"
import { config } from "styles/variables"

import AdaptiveImage from 'components/AdaptiveImage'

export const Wrapper = styled.div`
	max-width: 635px;
	li{
		display: flex;
		align-items: center;
		font-size: 14px;
		font-weight: 500;
		color:${config.colors.$contentPale};
		margin-bottom: 10px;
		:before{
			content:'';
			display: block;
			border-radius: 50%;
			background: ${({ theme }) => `linear-gradient(139.69deg, ${theme.$mainGradientColorOne} 14.78%, ${theme.$mainGradientColorSecond} 85.37%) ${theme.$accent}`};
			width: 9px;
			height: 9px;
			margin-right: 11px;
		}
	}
`

export const Image = styled(AdaptiveImage)`
	margin-bottom: 28px;
`

export const Name = styled.h1`
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	color: ${config.colors.$textColor};
	margin-bottom: 11px;
`

export const Time = styled.div`
	font-size: 14px;
	color: ${config.colors.$greyColor};
	font-weight: bold;
	margin-bottom: 20px;
	i{
		font-weight: 900;
		font-size: 12px;
	}
`

export const TimeValue = styled.span`
	color: ${config.colors.$contentPale};
`

export const Title = styled.h2`
	font-size: 16px;
	line-height: 20px;
	margin-bottom: 9px;
	color${config.colors.$textColor};
`

export const Values = styled.div`
	display: flex;
	margin-bottom: 14px;
`

export const Value = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	font-size: 14px;
	line-height: 20px;
	:not(:last-child){
		margin-right: 30px
	}
`

export const ValueName = styled.div`
	color:${config.colors.$greyColor};
	margin-bottom: 2px;
`

export const Text = styled.p`
	font-size: 14px;
	line-height: 20px;
	color:${config.colors.$contentPale};
	margin-bottom: 23px;
`
