import styled from "styled-components"
import { config } from "styles/variables"

export const AdvantagesContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	grid-gap: 27px;
`

export const Image = styled.div`
	width: 75px;
    height: 75px;
	background-image: url('${prop => prop.img || require("assets/core/placeholders/placeholder.png")}');
	border-radius: 50%;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	margin: 0 auto 16px;
`

export const Text = styled.span`
	display: block;
	font-size: 14px;
	color: ${config.colors.$textColor};
	text-align: center;
`
