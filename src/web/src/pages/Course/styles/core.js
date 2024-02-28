import styled from "styled-components"
import { config } from "styles/variables"
import DefaultContent from "components/Content"
import DefaultSign from 'components/Sign';
import Button from 'components/Button';

//Style

const { $textColor } = config.colors

export const SubscribeWrap = styled.div`
	@media (max-width: 480px) {
		display: none;
	}
`

export const Start = styled(Button)`
	width: 100%;
	border-radius: 10px !important;
`

export const Or = styled.p`
	text-align: center;
	margin-top: 28px;
	margin-bottom: 28px;
	max-width: 300px;
	color: ${$textColor};
`

export const Sidebar = styled.div`
	margin: 0 auto;
	margin-bottom: 43px;
    padding: 0 20px;
	max-width: 320px;
	width: 100%;
	&.column {
		margin: 0;
		margin-bottom: 43px;
		padding: 0;
		max-width: 280px;
	}
	@media (max-width: 480px) {
		padding: 0;
		margin: 0 auto !important;
		margin-bottom: 43px !important;
		max-width: 280px !important;
	}
`

export const Sign = styled(DefaultSign)`
`



export const Wrap = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	&.column {
		flex-direction: column;
	}
`

export const Container = styled(DefaultContent)`
`

export const Image = styled.img`
	margin-bottom: 28px;
	width: 100%;
	@media (max-width: 480px) {
		width: calc(100% + 32px);
		margin-left: -16px;
		margin-top: -16px;
    }
	
`

export const ImagePlaceholder = styled.div`
	min-height: 278px;
	background-size: cover;
	margin-bottom: 28px;
`

export const Title = styled.h3`
	color: ${$textColor};
	font-size: 18px;
	margin-bottom: 16px;
`

export const SignTitle = styled(Title)`
	text-align: center;
`

export const PageBody = styled.div`
	max-width: 600px;
    width: 100%;
	margin-bottom: 43px;
`

export const PageFooter = styled.div`
`

export const FooterTitle = styled.h3`
	margin-bottom: 18px;
	font-size: 18px;
	color: ${$textColor};
	font-weight: 500;
	@media (max-width: 480px) {
        text-align: center;
    }
`

export const FooterGrid = styled.div`
	display: grid;
    grid-template-columns: repeat(auto-fill,minmax(280px,1fr));
    grid-gap: 23px;
	${'' /* justify-items: center; */}
	@media (max-width: 480px) {
		justify-items: center;
	}
`
