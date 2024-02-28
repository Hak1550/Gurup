import styled, { css } from "styled-components"
import { config } from "styles/variables"

export const NoPlans = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: absolute;
    top: 0;
    justify-content: center;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: white;
`

export const Img = styled.img`
    content: url(${require("assets/core/no-plans.png")});
    margin-bottom: 15px;
`

export const Text = styled.p`

`

export const Plans = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export const Name = styled.div`

`

export const Price = styled.div`
    display: flex;
`

export const Value = styled.span`
`

export const Period = styled.span`
    color: ${config.colors.$greyColor};
    font-size: 12px;
    display: flex;
    align-items: center;
`

export const Plan = styled.div`
    width: 272px;
    height: 104px;
    border-radius: 8px;
    box-shadow: 0px 0px 8px rgba(34,34,34,0.2);
    margin-right: 20px;
    margin-bottom: 20px;
    padding: 17px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    cursor: pointer;
    color: ${config.colors.$textColor};
    &.active {
        background-color: ${({ theme }) => theme.$accent};
        color: white;
        ${Period} {
            color: white;
        }
    }
`
