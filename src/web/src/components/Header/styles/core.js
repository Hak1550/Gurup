import styled from "styled-components"
import { Link } from "react-router-dom"
import { config } from "styles/variables"
import DefaultContainer from 'components/Container';
import DefAvatar from 'components/Avatar'

export const Avatar = styled(DefAvatar)`
	width: 42px;
	height: 42px;
	margin-right: 8px;
	font-size: 12px;
	&.default {
		border: 5px solid;
	}
`

export const Range = styled.div`
	margin-bottom: 23px;
	margin-top: 8px;
	.input-range__track {
		height: 10px;
		&--active {
			background: ${ ({ theme }) => theme.$accent };
		}
	}
	.input-range__slider-container {
		.input-range__slider {
			${ "" /* margin-left: 0px; */ }
		}
		&:last-child {
			.input-range__slider {
				${ "" /* margin-left: -20px; */ }
			}
		}
	}
	.input-range__slider {
		margin-top: -0.9rem;
		background-color: white;
		height: 20px;
		width: 20px;
		box-shadow: 0 0 5px rgba(49, 115, 143, 0.2);
		border: none;
		&:active {
			transform: none;
		}
	}
	.input-range__label-container,
	.input-range__label--max .input-range__label-container {
		font-size: 14px;
		color: ${ config.colors.$contentPale };
		left: 0;
		right: 0;
	}
`

export const Section = styled.div`
	padding-bottom: 25px;
	border-bottom: 1px solid #e1e1e1;
	padding-top: 25px;
`

export const HeaderWrap = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding-left: 20px;
	height: 100%;
	@media (max-width: 480px) {
		display: none !important;
	}
`

export const Header = styled.header`
	height: 60px;
	background-color: ${({ theme }) => theme.$headerColor};
	display: flex;
	z-index: 100;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	box-shadow: 0 4px 8px rgba(179, 179, 179, 0.15);
`

export const LogoWrap = styled.div`
	width: 243px;
	flex-shrink: 0;
	padding: 7px 13px 7px 26px;
	height: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 0;
	&.white {
		background-color: #ffffff;
		padding-left: 26px;
	}
	@media (max-width: 480px) {
        width: 100% !important;
		padding-right: 0 !important;
   	    justify-content: center !important;
		background-color: initial !important;
		padding-left: 0 !important;
    }
`

export const Logo = styled(Link)`
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	margin-right: 10px;
	background-image: url(${props => props.src});
	@media (max-width: 480px) {
        margin-right: 0 !important;
    }
`

export const LogoText = styled(Link)`
	color: ${({ theme }) => theme.$accent};
	font-size: 16px;
`

export const TitleWrap = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin-bottom: 10px;
`

export const Hamburger = styled.div`
	width: 17px;
	height: 17px;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	background-image: url(${require("assets/core/hamburger.png")});
	background-size: contain;
	transform: rotate(${props => (props.open ? "0" : "90")}deg);
	transition: all ease .15s;
	@media (max-width: 480px) {
		display: none;
	}
`

export const Container = styled(DefaultContainer)`
	display: flex;
	height: 100%;
	padding-right: 20px;
	max-width: 1400px;
	&.no-sidebar {
		padding-left: 20px;
	}
	@media (max-width: 480px) {
		padding-right: 0 !important;
		padding-left: 0 !important;
	}
`

export const Breadcrumbs = styled.div`
	width: 100%;
	color: ${({ theme }) => theme.$headerTextColor};
	font-weight: 500;
`

export const Breadcrumb = styled(Link)``

export const Angle = styled.i`
	margin-left: 10px;
	margin-right: 10px;
	font-size: 12px;
`

export const Title = styled.p`
	font-weight: bold;
	color: ${config.colors.$textColor};
	font-size: 14px;
`

export const FilterWrap = styled.div`
	margin-right: 38px;
	position: relative;
`

export const Filter = styled.div`
	border-radius: 5px;
	position: absolute;
	z-index: 99;
	padding: 0 25px 10px;
	box-shadow: 0 0 8px rgba(179, 179, 179, 0.4);
	border: 1px solid #e4e4e4;
	min-width: 325px;
	background-color: white;
	top: calc(100% + 9px);
	left: 50%;
	transform: translateX(-50%);
`

export const FilterToggle = styled.div`
	display: flex;
    justify-content: center;
    align-items: center;
	width: 49px;
	height: 42px;
	background-repeat: no-repeat;
	background-position: center;
	cursor: pointer;
	border-radius: 5px;
	transition: all ease .15s;
	&.open {
		box-shadow: 0 0 8px rgba(179, 179, 179, 0.4);
		background-color: #FFFFFF;
	}
`

export const Name = styled.div`
	color: ${({ theme }) => theme.$headerTextColor};
	font-size: 16px;
	white-space: nowrap;
	display: flex;
	align-items: center;
	margin-right: 14px;
`

export const Icon = styled.i`
	display: flex;
	align-items: center;
	color: ${({ theme }) => theme.$headerTextColor};
`

export const User = styled.div`
	display: flex;
	cursor: pointer;
	font-weight: bold;
	padding: 6px 11px 6px 24px;
	border-radius: 5px;
	transition: all ease .15s;
	&.open {
		box-shadow: 0 0 8px rgba(179, 179, 179, 0.4);
		background-color: ${({ theme }) => theme.$headerTextColor};
		& ${Name}, & ${Icon} {
			color: #000;
		}
	}
`

export const UserMenu = styled.div`
	position: absolute;
	top: calc(100% + 10px);
	padding-left: 15px;
	padding-right: 15px;
	box-shadow: 0 0 8px rgba(179, 179, 179, 0.4);
	width: 100%;
	z-index: 999;
	left: 0;
	background: white;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
`

export const UserWrap = styled.div`
	position: relative;
`

export const Photo = styled.div`
	width: 30px;
	height: 30px;
	margin-right: 12px;
	background-image: url(${props => props.src});
	background-size: cover;
`

export const Triangle = styled.div`
	width: 20px;
	height: 20px;
	position: absolute;
	top: -13px;
	left: 50%;
	background-position: center;
	transform: translate(-50%);
	background-image: url(${require("assets/core/triangle.png")});
	&.user {
		left: 110px;
		transform: none;
	}
`

export const UserLink = styled.p`
	height: 35px;
	display: flex;
	align-items: center;
	color: ${config.colors.$contentPale};
	&:hover {
		color: ${({ theme }) => theme.$accent};
	}
	&.main {
		height: 40px;
		border-bottom: 1px solid #f2f2f2;
	}
`

export const Logout = styled.a`
	border-top: 1px solid #f2f2f2;
	height: 50px;
	cursor: pointer;
	padding-top: 14px;
	color: ${config.colors.$contentPale};
	&:hover {
		color: ${({ theme }) => theme.$accent};
	}
`

export const Tag = styled.li`
	height: 30px;
	display: flex;
	align-items: center;
	font-size: 14px;
	cursor: pointer;
	white-space: nowrap;
	color: ${config.colors.$contentPale};
	&:hover {
		color: ${({ theme }) => theme.$accent};
	}
`

export const Tags = styled.ul`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 8px;
	grid-column-gap: 40px;
`

export const Checkbox = styled.div`
	width: 15px;
	height: 15px;
	border: 1px solid #d1d1d1;
	margin-right: 9px;
	display: flex;
	justify-content: center;
	font-size: 10px;
	align-items: center;
	color: ${({ theme }) => theme.$accent};
`

export const TrashIcon = styled.i`
	margin-left: 5px;
`

export const Clear = styled.button`
	font-weight: bold;
	font-size: 14px;
	color: ${config.colors.$greyColor};
`
export const Apply = styled.button`
	width: 100%;
	font-weight: bold;
	margin: auto;
	height: 30px;
	color: ${({ theme }) => theme.$accent};
	margin-top: -1px;
	background-color: white;
`
