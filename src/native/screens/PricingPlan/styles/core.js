import styled from 'styled-components/native';

export const Plans = styled.View`
    padding: 13px;
`
export const Title = styled.Text`
    font-size: 20px;
    margin-bottom: 13px;
`

export const PlanCard = styled.View`
    background-color: ${({theme}) => theme.$itemBackground};
    height: 100px;
    padding: 13px;
    border-radius: 10px;
`

export const PlanName = styled.Text`
    color: ${({ theme }) => theme.$textColor};
    font-size: 16px;
`

export const PlanPrice = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.$additionalTextColor};
`

export const PlanMore = styled.Text`
    font-size: 14px;
    color: ${({ theme }) => theme.$additionalTextColor};
    margin-top: auto;
`

export const PlanInfoWrap = styled.Text`

`

export const CancelSubscription = styled.Text`
    color: ${({theme}) => theme.$additionalTextColor};
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
`

export const PlanInfo = styled.Text`

`