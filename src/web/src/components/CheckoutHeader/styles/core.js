import styled from "styled-components"
import { config } from "styles/variables"
import DefaultContent from "components/Content"
import DefaultSign from 'components/Sign';
import Button from 'components/Button';

//Style

const { $textColor } = config.colors

export const Title = styled.h3`
	color: ${$textColor};
	font-size: 18px;
	margin-bottom: 16px;
`

export const PaymentMethods = styled.div`
	display: flex;
	justify-content: center;
`

export const PaymentMethod = styled.img`
	height: 21px;
	margin-right: 7px;
	&:last-child {
		margin-right: 0px;
	}
`

export const PriceWrap = styled.div`
	display: flex;
    margin-bottom: 32px;
    margin-top: 27px;
    position: relative;
    border-radius: 10px;
    height: 70px;
    box-shadow: 0px 0px 8px rgba(34, 34, 34, 0.15);
`

export const PriceLabel = styled.p`
    height: 37px;
    flex-shrink: 0;
    width: 70px;
    transform-origin: 0 0;
    position: absolute;
    top: 100%;
    display: flex;
    border-bottom: 1px solid #E8E8E8;
    align-items: center;
    color: #C9C9C9;
    justify-content: center;
    transform: rotate(-90deg);
`

export const Price = styled.div`
	font-size: 24px;
	color: #57606E;
	font-weight: 700;
    width: 100%;
    padding-left: 37px;
    display: flex;
    align-items: center;
    justify-content: center;
`