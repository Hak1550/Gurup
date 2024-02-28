import styled, { css } from "styled-components"
import { Route,Redirect, Link, Switch, NavLink} from "react-router-dom";
import {config} from "styles/variables"

import DefaultInput from 'components/Input'
import DefaultButton from 'components/Button'
import DefaultContent from "components/Content"

export const Wrapper = styled.div`
	display: flex;
	align-items: flex-start;
	height: 100%;
`

export const Container = styled(DefaultContent)`
	padding: 0;
	padding-left: 73px;
`

export const NavBar = styled.div`
 	display: inline-block;
 	min-width: 240px;
	flex-shrink: 0;
	padding-right: 50px;
`

export const ChangePasswordWrap = styled.div`
	display: flex;
	align-items: center;
	margin-top: 26px;
	cursor: pointer;
`

export const ChangePassword = styled.div`
	display: flex;
	align-items: center;
	color: ${config.colors.$contentPale};
`

export const Button = styled(DefaultButton)`
	background-image: url(${require("assets/core/key.png")});
	background-repeat: no-repeat;
	background-position: center;
	margin-right: 12px;
`

export const Input = styled(DefaultInput)`
	&-wrap {
		margin-bottom: 10px;
		max-width: 277px;
	}
`

export const Unsub = styled.button`
	text-decoration: underline;
	font-size: 16px;
	color: ${config.colors.$contentPale};
	margin-top: 46px;
`

export const Save = styled(DefaultButton)`
		margin-bottom: 46px;
		width: fit-content;
`

export const Title = styled.h2`
	font-size: 16px;
	margin-bottom: 23px;
	line-height: 125%;
	max-width: 240px;
	font-weight: 500;
	color: ${config.colors.$textColor};
	margin-top: 42px;
	height: 60px;
`;

export const NavItem = styled(NavLink)`
	height: 37px;
	font-size: 14px;
	display: flex;
	align-items: center;
	transition: all .1s ease;
	cursor: pointer;
	color:${config.colors.$contentPale};
	:hover{
		color: ${({ theme }) => theme.$accent};
	}
	&.active{
		color: ${({ theme }) => theme.$accent};
	}
`

export const Content = styled.div`
    padding-left: 80px;
    border-left: 1px solid #F2F2F2;
	width: 100%;
	display: flex;
	height: 100%;
	min-height: 616px;
	flex-direction: column;
	position: relative;
	justify-content: space-between;
`

export const InfoHeader = styled.div`
	display: flex;
	margin-bottom: 52px;
	margin-top: 42px;
`

export const Avatar = styled.div`
	display: block;
	border-radius: 50%;
	width: 98px;
	height: 98px;
	background-size: cover;
	background-position: center;
	position: relative;
	margin-right: 32px;
	cursor: pointer;
	background-image: ${ props => `url(${ props.img })` };
	background-color: #e8e8e8;
	:before{
		font-family: "Font Awesome 5 Free";
		content:"\f303";
		font-weight: 900;
		color:#ffffff;
		font-size: 14px;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		background: ${ ({ theme }) => `linear-gradient(135deg, ${ theme.$mainGradientColorOne }, ${ theme.$mainGradientColorSecond }), ${ theme.$accent }` };
		box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: 75px;
		top: 60px;
	}
`

export const Name = styled.div`
	font-weight: 500;
	font-size: 18px;
	margin-top: 30px;
	color:${config.colors.$textColor};
`
