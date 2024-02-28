import React, {Component, Fragment} from "react";

import {
    Title,
PaymentMethods,
PaymentMethod,
PriceWrap,
PriceLabel,
Price,
} from './styles';
import Checkbox from 'components/Checkbox';
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

const CheckoutHeader = ({price, title, t}) =>{
    return (
        <Fragment>
            {title && <Title style={{ textAlign: "center" }}>{title === "default" ? t("web_basic:checkout_title") : title}</Title>}
            <PaymentMethods>
                {paymentMethods.map((pm, i) =>
                    <PaymentMethod key={i} src={pm} />
                )}
            </PaymentMethods>
            <PriceWrap>
                <PriceLabel>{t("basic:Price")}</PriceLabel>
                <Price>
                    {price}
                </Price>
            </PriceWrap>
        </Fragment>
    )
};

export default compose(
    withNamespaces(["basic", "web_basic"])
)(CheckoutHeader)

const paymentMethods = [
    require("assets/core/icon/visa.png"),
    require("assets/core/icon/mastercard.png"),
    require("assets/core/icon/mir.png")
]