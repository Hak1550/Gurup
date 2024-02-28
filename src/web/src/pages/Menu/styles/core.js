import styled, { css } from "styled-components"
import { config } from "styles/variables"

import AdaptiveImage from 'components/AdaptiveImage';
import Card from 'components/Card'

export const Wrapper = styled.div`
	max-width: 635px;
	margin-bottom: 33px;
`

export const Image = styled(AdaptiveImage)`
	margin-bottom: 10px;
`

export const Name = styled.h1`
	font-weight: 500;
	font-size: 18px;
	line-height: 21px;
	color: ${config.colors.$contentPale};
	margin-bottom: 14px;
	margin-top: 17px;
`

export const Text = styled.div`
	font-size: 14px;
	line-height: 140%;
	color: ${config.colors.$contentPale};
`

export const ShowButton = styled.div`
	font-size: 14px;
	line-height: 110%;
	border-bottom:1px solid;
	transition: all .1s ease;
	cursor: pointer;
	display: inline-block;
	color: ${config.colors.$contentPale};
	font-weight: bold;
	margin-top: 14px;
	:hover{
		opacity: .8;
	}
`

export const RecipesTitle = styled.div`
	margin-bottom: 18px;
	font-size: 18px;
	line-height: 21px;
	font-weight: 500;
	color: ${config.colors.$contentPale};
`

export const Recipes = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
	grid-gap: 23px;
`

export const Recipe = styled(Card)`
	display: flex;
	flex-direction: column;
	min-height: 255px;
`

export const RecipeParams = styled.div`
	display: flex;
	margin-bottom: 3px;
`

export const RecipeParam = styled.div`
	color: ${config.colors.$contentPale};
	margin-bottom: 6px;
	font-weight: bold;
	margin-right: 10px;
	i{
		font-weight: 900px;
		font-size: 13px;
	}
	span{
		 color: ${config.colors.$greyColor};
		 font-size: 14px;
	}
`

export const RecipeName = styled.h2`
	color: ${config.colors.$contentPale};
	font-size: 14px;
	margin-bottom: 13px;
	font-weight: bold;
`
