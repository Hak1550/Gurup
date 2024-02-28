import styled, {css} from 'styled-components';
import {config} from "styles/variables"
import FileUploader from 'components/FileUploader';
import TextareaAutosize from 'react-autosize-textarea';

export const Label = styled.label`
	margin-left: 18px;
	line-height: 19px;
	margin-bottom: 8px;
	font-size: 14px;
	color: ${config.colors.$contentPale};
	display: block;
	font-weight: 500;
`;

export const Cancel = styled.span`
	cursor: pointer;
	color: #FFA0A0;
	padding-right: 18px;
`

export const Border = styled.label`
	display: flex;
	height: 40px;
	border:1px solid #C9C9C9;
	line-height: 40px;
	border-radius: 10px;
	color: ${config.colors.$contentPale};
	font-size: 14px;
	width: 100%;
	${props => props.shape === "round" && css`
		border-radius: 20px;
	`};
`

export const Input = styled.input`
	width: 100%;
	padding-left: 18px;
	padding-right: 18px;
`;

export const InputWrap = styled.div`
    position: relative;
	${props => props.withError && css`
			padding-bottom: 20px;
		  `
	  };
`;

export const ErrorText = styled.span`
  position: absolute;
  width: 100%;
  text-align: center;
  bottom: 0;
  color: ${config.colors.$errorColor};
  font-size: 12px;
`;
