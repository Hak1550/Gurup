import styled from "styled-components"

export const SchoolBanner = styled.img`
	width: 100%;
	${'' /* max-height: 265px; */}
	${'' /* object-fit: cover; */}
`

export const SchoolDescriptionGrid = styled.div`
	display: grid;
	grid-template-columns: 4fr 1fr;
	background-color: #ffffff;
	padding-top: 23px;
	padding-bottom: 36px;
	border-radius: 0 0 10px 10px;
`
export const SchoolDescriptionContent = styled.div`
	padding-left: 30px;
`

export const SchoolDescriptionSocials = styled.div``

export const SchoolDescriptionTitle = styled.h3`
	font-size: 1.5rem;
	font-weight: normal;
	margin-bottom: 4px;
`
export const SchoolDescriptionLogo = styled.img`
	max-height: 50px;
	max-width: 100%;
	margin-bottom: 37px;
`

export const LinkSocial = styled.a`
	margin-right: 24px;
	margin-top: 16px;
	display: inline-block;
`

export const LinkSocialIcon = styled.i`
	color: #000;
	font-size: 36px;
	transition: color ease .15s;
	&:hover {
		color: ${props => props.theme.$accent}
	}
`