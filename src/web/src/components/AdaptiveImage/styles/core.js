import styled, {css} from 'styled-components';

export const Wrapper = styled.div`
	position: relative;
	padding-top: ${props => props.ratio}%;
`

export const Inner = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	background: ${props => `url(${props.src}) #fafafa no-repeat center`};
	background-size: ${props => (props.resizeMode ? props.resizeMode : "cover")};
`
