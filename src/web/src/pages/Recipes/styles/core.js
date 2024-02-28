import styled, { css } from "styled-components"
import { config } from "styles/variables"

import Card from 'components/Card';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
	grid-gap: 23px;
`

export const Recipe = styled(Card)`
	display: flex;
	flex-direction: column;
	min-height: 255px;
`

export const Params = styled.div`
	display: flex;
	margin-bottom: 3px;
`

export const Param = styled.div`
	color: ${config.colors.$contentPale};
	margin-bottom: 6px;
	font-weight: bold;
	margin-right: 10px;
	i{
		font-weight: 900px;
		font-size: 13px;
	}
	span{
		 color:${config.colors.$greyColor};
		 font-size: 14px;
	}
`

export const Name = styled.h2`
	color: ${config.colors.$textColor};
	font-size: 14px;
	margin-bottom: 13px;
	font-weight: bold;
`

export const SkeletonWrap = styled.div`
	max-width: 320px;
	border-radius: 20px;
	overflow: hidden;
`
