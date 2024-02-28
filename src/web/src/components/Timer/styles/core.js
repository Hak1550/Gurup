import styled from "styled-components";
import { config } from "styles/variables";

export const TimerWrap = styled.h3`
    position: relative;
	width: 147px;
	height: 147px;
	margin: 45px auto;
	& .CircularProgressbar .CircularProgressbar-path {
	  stroke: ${({ theme }) => theme.$accent};
	}
`;

export const TimerText = styled.span`
	font-size: 30px;
	color: ${config.colors.$textColor};
`;
