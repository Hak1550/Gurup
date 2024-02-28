import styled from "styled-components"

export const Container = styled.div`
	margin: 16px 0;
    & a {
		text-decoration: underline;
	}
	& > *{
        margin-block-start: 1em;
        margin-block-end: 1em;
	}
	& > ol,
	& > ul {
		padding-inline-start: 25px;
		font-size: 14px;
		color: ${props => props.theme.$textColor}
	}
	& > ol {
		li {
			list-style-type: decimal;
		}
	}
	& > ul {
		li {
			list-style-type: disc;
		}
	}
	& > p {
		font-size: 14px;
		color: ${props => props.theme.$textColor}
	}
`
