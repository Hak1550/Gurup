import styled, { css } from "styled-components"
import Button from "components/Button"
import { config } from "styles/variables"
import { Link } from "react-router-dom";

export const Sign = styled.div`
    width: 277px;
`

export const Forgot = styled.button`
    font-size: 14px;
    color: #57606E;
    display: block;
    font-weight: 500;
`

export const Tab = styled.button`
    width: 100%;
    text-align: start;
    font-size: 14px;
    color: #32343A;
    padding-bottom: 11px;
    border-bottom: 3px solid transparent;
    &.active {
        font-weight: bold;
        border-bottom: 3px solid #FF4C65;
    }
    &.right {
        text-align: end;
    }
` 

export const Tabs = styled.div`
    display: flex;
    margin-bottom: 16px;
    border-bottom: 0.5px solid #C9C9C9;
`
export const SocialsTitle = styled.p`
	
`
export const Socials = styled.div`
	
`
export const Submit = styled(Button)`
	width: 100%;
    border-radius: 10px !important;
    margin-top: 20px;
`

export const Conditions = styled.p`
	text-align: center;
    font-size: 14px;
    margin-top: 13px;
`

export const SignForm = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const Title = styled.h1`
    font-weight: 500;
    color: ${config.colors.$textColor};
    font-size: 36px;
    margin-bottom:14px;
    display: flex;
    justify-content: center;
    white-space: nowrap;
`;

export const SubTitle = styled.h3`
    color: ${config.colors.$additionLight};
    font-weight: 400;
    margin-bottom: 20px;
    text-align: center;
`;

export const FormRow = styled.div`
    width: 100%;
`;

export const LinksContainer = styled.div`
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
`;

export const SignLink = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  text-decoration: underline;
  color: ${config.colors.$textColor};
`;