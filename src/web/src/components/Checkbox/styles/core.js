import styled, {css} from 'styled-components';
import {config} from "styles/variables"
import FileUploader from 'components/FileUploader';
import TextareaAutosize from 'react-autosize-textarea';

export const Label = styled.div`
	width: 24px;
	height: 24px;
	font-size: 14px;
	${'' /* color: $blue; */}
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 9px;
	border-radius: 5px;
	background-color: white;
	flex-shrink: 0;
	box-shadow: inset 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
	&.radio {
		border-radius: 50%;
	}
`

export const Text = styled.p`
	font-size: 14px;
	font-weight: 500;
	&.radio {
		color: #BABCCB;
	}
	&.active {
        &.radio {
			color: black;
        }
    }
`

export const Icon = styled.i`
	
`;

export const Wrap = styled.div`
	display: flex;
	align-items: center;
	width: fit-content;
	cursor: pointer;
    
`;
