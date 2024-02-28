import styled, { css } from "styled-components"
import { config } from "styles/variables"

export const TagsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: -5px;
	position: relative;
	${props => props.fit && css`
		padding-right: 42px;
	`}
`

export const Tag = styled.div`
	height: 28px;
	padding: 0 5px;
	display: flex;
	align-items: center;
	color:#fff;
	font-size: 14px;
	background: ${({ theme }) => theme.$accent};
	border-radius: 10px;
	margin-right: 5px;
	margin-bottom: 5px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	flex: none;
`

export const More = styled(Tag)`
	padding: 0 13px;
	position: absolute;
	right: 0;
	padding-bottom: 10px;
	width: 37px;
	margin-right: 0;
`

export const SkeletonTag = styled.div`
	height: 28px;
	width: 75px;
	border-radius: 10px;
	margin-right: 5px;
`
