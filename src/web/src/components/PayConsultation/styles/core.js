import styled from 'styled-components'
import DefaultButton from 'components/Button';

export const Modal = styled.div`
    background-color: white;
    padding-top: 43px;
    padding-bottom: 41px;
    padding-right: 15px;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`

export const Image = styled.div`
    background-image: url(${require("assets/core/pay-consultation.png")});
    width: 89px;
    height: 89px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    margin-bottom: 6px;
`

export const Text = styled.p`
    color: #484545;
    font-weight: 500;
    margin-bottom: 6px;
    max-width: 285px;
`

export const PriceText = styled.p`
    color: #484545;
    font-weight: 300;
    max-width: 180px;
`

export const Price = styled.span`
    color: #484545;
    font-weight: bold;
`

export const Time = styled.span`
    color: #A53789;
`

export const Button = styled(DefaultButton)`
    margin-top: 33px;
`
