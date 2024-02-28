import React, {Component, Fragment} from "react";
import Logic from "../logic";
import getSymbolFromCurrency from 'currency-symbol-map'

import {Modal, Image, Text, PriceText, Price, Time, Button} from '../styles';

export default Logic(({t, influencer, Close, buy})=>{
    return (
        <Modal>
            <Close/>
            <Image/>
            <Text>
                {/* Вы собираетесь купить <Time>15 минутный</Time> приватный чат с преподавателем */}
                {t("pay_consultation_modal_text")}
            </Text>
            <PriceText>
                {t("pay_consultation_modal_price_text")}
                <Price> {influencer.privateChatPrice} {getSymbolFromCurrency(influencer.privateChatCurrency)}</Price>
            </PriceText>
            <Button onClick={buy}>Купить</Button>
        </Modal>
    )
});
