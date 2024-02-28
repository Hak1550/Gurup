import styled from 'styled-components/native';
import Button from "../../components/Button";

export const OfferInner = styled.View`
    padding: 0px 20px 0px 20px;
`
export const OfferImage = styled.Image`
    width: 100%;
    min-height: 200px;
`;
export const OfferName = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 20px;
    font-weight: bold;
    margin: 18px 18px 18px 18px;
`

export const OfferDescription = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    margin: 10px 0 0 0;
    font-size: 14px;
`
export const ButtonContainer = styled.View`
    padding: 0 20px 20px 20px;
`;
export const BuyButton = styled(Button)`
    height: 60px;
`
export const OfferItemsTitle = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 18px;
    font-weight: bold;
    margin: 0 0 10px 0;
`
export const PlanInfoWrap = styled.View`
    color: ${({theme, selected}) => theme.$textColor};
    margin: 0 0 20px 0;

`
export const PlanInfo = styled.Text`
    color: ${({theme, selected}) => theme.$textColor};
    font-size: 12px;
`