import styled from "styled-components"
import {config} from "styles/variables"
import { withDynamicTag } from "hocs/DynamicTag"
import { Link } from "react-router-dom"

const { $textColor } = config.colors

export const GeneralButton = withDynamicTag(styled(Link)`
	font-size: 14px;
	background-color: ${ props => props.theme.$accent };
	color: #fff;
	border-radius: 10px;
	display: inline-block;
	&.medium {
		padding: 19px 41px;
	}
	&.small {
		padding: 4px 10px;
	}
	&.circle {
		border-radius: 50%;
		width: 40px;
		height: 40px;
	}
	&.white {
		background-color: white;
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
		color: ${$textColor};
	}
	&.pink {
		background-color: #A53789;
	}
	&.violet {
		background: linear-gradient(166.7deg, #9671F2 -7.47%, #8F57ED 79.69%), #FF4C65;
	}
`)
