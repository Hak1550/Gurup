import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { withDynamicTag } from "hocs/DynamicTag"

const gradientOnStatus = {
	normal: css`
		linear-gradient(179.03deg, rgba(0, 0, 0, 0) 35.1%, rgba(9, 13, 47, 0.69) 98.51%)
	`,
	complete: css`
		linear-gradient(179.03deg, rgba(174, 174, 174, 0) 35.1%, ${props => props.theme.$accent} 98.51%);
	`,
}

const completeLessonIcon = css`
	&:after {
		content: "\f00c";
		font-family: "Font Awesome 5 Free";
		font-weight: 900;
		font-size: 24px;
		position: absolute;
		right: 11px;
		top: 50%;
		transform: translateY(-50%);
	}
`

export const Card = withDynamicTag(styled(Link)`
	max-width: 320px;
	overflow: hidden;
	display: flex;
	width: 100%;
	flex-direction: column;
	transition: all ease-in 0.15s;
	&:hover {
		transform: ${props => props.to && "scale(1.03)"};
	}
`)

export const Title = styled.h5`
	padding: 12px 45px 12px 15px;
	color: #fff;
	z-index: 10;
	font-size: 14px;
	position: relative;
	${prop => {
		if (prop.status && !(prop.status === "in_progress")) {
			return completeLessonIcon
		}
	}}
`

export const CardHeader = styled.div`
	flex: 1;
	min-height: 170px;
	background-image: url(${prop => prop.img});
	background-size: ${props => (props.resizeMode ? props.resizeMode : "cover")};
	background-repeat: no-repeat;
	background-position: center;
	border-radius: 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	overflow: hidden;
	&::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: ${prop => {
			if (!prop.status || prop.status === "in_progress") {
				return gradientOnStatus.normal
			} else {
				return gradientOnStatus.complete
			}
		}};
		z-index: 5;
	}
`
export const CardBody = styled.div`
	flex: 2;
	padding: 13px 13px 0;
	display: flex;
	flex-direction: column;
`

export const CardLessonBodyText = styled.p`
	font-size: 14px;
	color: ${props => props.theme.$textColor};
`
