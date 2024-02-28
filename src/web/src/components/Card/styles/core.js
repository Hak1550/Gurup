import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { withDynamicTag } from "hocs/DynamicTag"

export const Card = withDynamicTag(styled(Link)`
	box-shadow: 0 0 8px rgba(21, 116, 228, 0.15);
	background-color: #fff;
	border-radius: 20px;
	max-width: 320px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	min-height: 214px;
	transition: all ease 0.5s;
	${props => !props.loading && css`
		&:hover {
			box-shadow: 0 0 15px 0 rgba(21, 116, 228, 0.15);
			transform: scale(1.03);
		}
	` }
`)

export const CardHeader = styled.div`
	flex: 1;
`

export const Image = styled.div`
	min-height: 130px;
	width: 100%;
	background: ${props => {
		return `url(${props.src}) #fafafa no-repeat center`
	}};
	background-size: ${props => (props.resizeMode ? props.resizeMode : "100%")};
`

export const CardBody = styled.div`
	flex: 2;
	padding: 13px 13px 0;
	display: flex;
	flex-direction: column;
`
