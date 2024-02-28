import styled from 'styled-components'
import {Link, NavLink} from "react-router-dom";
import { config } from "styles/variables"

export const Content = styled.div`
    padding: 20px;
    flex-grow: 1;
`

export const Footer = styled.footer`
    background-color: #2B2727;
    color: ${config.colors.$greyColor};
    flex-shrink: 0;
    margin-top: auto;
    display: flex;
`

export const FooterWrap = styled.div`
    display: flex;
    padding: 20px;
    font-size: 14px;
    align-items: center;
    height: 100%;
    width: 100%;
    @media (max-width: 480px) {
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column-reverse;
    }
`

export const Info = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    ${'' /* margin-left: 80px; */}
`

export const InfoList = styled.ul`
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 15px;
    @media (max-width: 480px) {
        margin: auto;
        text-align: center;
        margin-bottom: 10px;
    }
        
`

export const InfoItem = styled.li`
    transition: all 0.2s;
    margin-bottom: 5px;
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
`;

export const PoweredBy = styled.a`
  display: flex; 
  flex-direction: column;
  margin-right: 30px;  
  align-items: flex-start;
  @media (max-width: 480px) {
    margin-right: 0 !important;
    display: flex !important;
    align-items: center !important;
  }
`;

export const PoweredByText = styled.span`
  font-weight: bold;
  margin-bottom: 10px; 
`;

export const GurucanLogo = styled.img`
    content: url(${require("assets/core/gurucan-logo.png")});
    height: 23px;
`;

export const PaymentMethods = styled.div`
    display: flex;
    @media (max-width: 480px) {
        margin-bottom: 10px;
    }
`

export const Wrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    @media (max-width: 480px) {
        flex-direction: column;
    }
`