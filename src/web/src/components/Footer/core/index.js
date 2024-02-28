import React, {Component, Fragment} from "react";
import Logic from "../logic";
import { Footer, FooterWrap, Info, InfoItem, Wrap, PaymentMethods, InfoList, Mastercard, PoweredBy, PoweredByText, GurucanLogo, Visa} from "../styles";
import {Link} from "react-router-dom";
import { isAuthorized } from "hocs/checkAuth"
import Container from 'components/Container';

export default Logic(({t, influencer,sidebar})=>{
    const info = [
        [
            {label: t("web_layout:footer_help_link"), href: "http://help.gurucan.com"},
            // {label: "Политика конфиденциальности", href: t("basic:policy_url")},
            // {label: "Условия пользования", href: t("basic:terms_url")}
        ],
    ];
    if (influencer) {
        if (influencer.privacyPolicy) {
            info[0].push({ label: t("footer_policy_link"), href: influencer.privacyPolicy })
        }
        if (influencer.termsOfUse) {
            info[0].push({ label: t("footer_terms_link"), href: influencer.termsOfUse })
        }
    }
    return (
        <Footer>
            <Container>
                <FooterWrap>
                    {(influencer && influencer.pricingPlan === "expert") || true ? (
                        <PoweredBy target="_blank" href={t("web_layout:footer_powered_by_link")}>
                            <PoweredByText>{t("web_layout:footer_powered_by")}</PoweredByText>
                            {/* src = {require("assets/core/gurucan-logo.svg")} */}
                            <GurucanLogo />
                        </PoweredBy>
                    ) : null}
                    <Wrap>
                        <Info>
                            {info.map((list, i) =>
                                <InfoList key={i}>
                                    {list.map((link, i) =>
                                        <InfoItem key={i}>
                                            {link.to ? (
                                                <Link to={link.to}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                    <a target="_blank" href={link.href}>
                                                        {link.label}
                                                    </a>
                                                )}
                                        </InfoItem>
                                    )}
                                </InfoList>
                            )}
                        </Info>
                        <PaymentMethods style={{display: "flex"}}>
                            <Visa />
                            <Mastercard />
                        </PaymentMethods>
                    </Wrap>
                </FooterWrap>
            </Container>
        </Footer>
    )
});

