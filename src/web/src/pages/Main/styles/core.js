import styled from "styled-components"
import { config } from "styles/variables"

export const SectionContainer = styled.section`
	margin-bottom: 31px;
`

export const SectionTitle = styled.h4`
	font-size: 16px;
	color: ${config.colors.$textColor};
	font-weight: 500;
`

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
	grid-gap: 27px;
	margin-top: 25px;
`

export const CardTitle = styled.h4`
	font-size: 14px;
	font-weight: 700;
	line-height: 16px;
	margin-bottom: 12px;
	color: ${config.colors.$textColor};
	z-index: 20;
`

export const CardDescription = styled.p`
	font-size: 14px;
	line-height: 16px;
	color: ${config.colors.$textColor};
	margin-bottom: 40px;
`
