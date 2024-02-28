import styled from 'styled-components/native';
import Button from "../../components/Button";

export const PlansScrollView = styled.ScrollView`
    
`

export const Plans = styled.View`
    padding: 13px;
    padding-bottom: 40px;
`

export const Title = styled.Text`
    font-size: 20px;
    margin-bottom: 13px;
`

export const PlanCard = styled.View`
    background-color: ${({theme, selected}) => selected ? theme.$accent : theme.$itemBackground};
    min-height: 100px;
    padding: 13px;
    border-radius: 10px;
    margin: 10px 0;
`

export const PlanName = styled.Text`
    color: ${({theme, selected}) => selected ? theme.$accentBgTextColor: theme.$textColor};
    font-size: 16px;
`

export const PlanDescription = styled.Text`
    color: ${({theme, selected}) => selected ? theme.$accentBgTextColor: theme.$textColor};
    font-size: 12px;
`

export const PlanPrice = styled.Text`
    font-size: 14px;
    color: ${({theme, selected}) => selected ? theme.$accentBgTextColor: theme.$additionalTextColor};
`

export const PlanMore = styled.Text`
    font-size: 14px;
    color: ${({theme, selected}) => selected ? theme.$accentBgTextColor: theme.$additionalTextColor};
    margin-top: auto;
`

export const PlanInfoWrap = styled.View`
    height: ${({open}) => open ? "auto" : "0px" };
    overflow: hidden;
`

export const CancelSubscription = styled.Text`
    color: ${({theme}) => theme.$additionalTextColor};
    font-size: 14px;
    text-align: center;
    margin-top: 20px;
`

export const PlanInfo = styled.Text`
    color: ${({theme}) => theme.$accentBgTextColor};
    font-size: 12px;
    margin: 6px 0;
`

export const BuyButton = styled(Button)`
    border-radius: 0;
    height: 60px;
`


export const OfferCard = styled.View`
    background-color: ${({theme}) => theme.$itemBackground};
    min-height: 100px;
    border-radius: 6px;
    margin: 10px 0;
    padding: 0 0 10px 0;
    overflow: hidden;
`

export const OfferInner = styled.View`
    padding: 20px;
`

export const OfferFirstLine = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
export const OfferImage = styled.Image`
    width: 100%;
    min-height: 200px;
`;
export const OfferName = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 20px;
`
export const OfferPrice = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 20px;
    font-weight: bold;
    width: 120px;
    text-align: right;
`

export const OfferDescription = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    margin: 10px 0 0 0;
    font-size: 14px;
`
export const OfferBanner = styled.View`
    background-color: ${({theme}) => theme.$accentBgTextColor};
    padding: 5px 10px 5px 10px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 6px;
`
export const OfferBannerText = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 14px;
    height: 20px;
    line-height: 20px;
`
