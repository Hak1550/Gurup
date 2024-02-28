import styled from "styled-components"
import { Link, NavLink } from "react-router-dom"
import { config } from "styles/variables"
import Container from 'components/Container'

export const Dashboard = styled.div`
	display: flex;
	padding-top: 60px;
	background-color: ${props => props.theme.$screenBackgroundColor};
`

export const Sidebar = styled.aside`
	width: 243px;
	background-color: white;
	height: calc(100vh - 60px);
	flex-shrink: 0;
	padding-top: 20px;
	position: fixed;
	@media (max-width: 480px) {
		display: none;
	}
`

export const Menu = styled.ul``

export const Item = styled.li``

export const MainLink = styled(NavLink)`
	width: 203px;
	height: 39px;
	padding-left: 26px;
	display: flex;
	align-items: center;
	border-bottom-right-radius: 50px;
	border-top-right-radius: 50px;
	transition: all 0.2s;
	color: ${({ theme }) => theme.$textColor};
	&:hover,
	&.active {
		background-color: ${({ theme }) => theme.$screenBackgroundColor};
		color: ${({ theme }) => theme.$accent};
	}
`

export const SubMenu = styled.ul`
	margin-top: 10px;
	margin-left: 37px;
`

export const SubItem = styled.li`
	margin-bottom: 10px;
`

export const SubLink = styled(NavLink)`
	display: inline-block;
	transition: all 0.2s;
	color: ${({ theme }) => theme.$textColor};
	&.active,
	&:hover {
		color: ${({ theme }) => theme.$accent};
	}
`

export const ContentWrap = styled.div`
	width: 100%;
	display: flex;
	min-height: calc(100vh - 60px);
	flex-direction: column;
	&.with-sidebar {
	    padding-left: 243px;
	}
	@media (max-width: 480px) {
		padding-left: 0px !important;
	}
`

export const Content = styled(Container)`
	padding: 20px;
	flex-grow: 1;
	@media (max-width: 480px) {
        padding: 0;
    }
`

export const Footer = styled.footer`
	height: 121px;
	background-color: #2b2727;
	color: ${config.colors.$greyColor};
	flex-shrink: 0;
	display: flex;
`

export const FooterWrap = styled.div`
	display: flex;
	padding-top: 22px;
	font-size: 14px;
	padding-bottom: 33px;
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	height: 100%;
`

export const Icon = styled.i`
	display: flex;
	align-items: center;
`

export const Info = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`

export const InfoList = styled.ul`
	font-size: 14px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-right: 15px;
`

export const InfoItem = styled.li`
	transition: all 0.2s;
	&:hover {
		color: white;
	}
`

export const Visa = styled.div`
	width: 73px;
	height: 24px;
	margin-right: 36px;
	flex-shrink: 0;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${require("assets/core/visa.png")});
`

export const Mastercard = styled.div`
	width: 136px;
	height: 24px;
	flex-shrink: 0;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;
	background-image: url(${require("assets/core/mastercard.png")});
`
