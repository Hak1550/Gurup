import React, { useEffect, useState } from "react";
import MainLayout from "../../components/MainLayout";
import { config } from "../../styles/variables";
import * as Styled from "./styles"
import Animated from "react-native-reanimated";
import { formatPrice } from "../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import * as RNIap from 'react-native-iap';
import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { usePubSub } from "../../hooks";
import { Actions } from "react-native-router-flux";
import { getPlans } from '../../../actions/plans';
import CacheImage from "../../components/CacheImage"
import FastImage from "react-native-fast-image"
import Touchable from '../../components/Touchable';

let PricingCard = (props) => {
    const { selected, item, t } = props;
    const deviceStore = Platform.OS === "ios" ? "iTunes" : "Google Play";
    const price = formatPrice({ price: item.price, currency: item.currency });
    const renderLegalInfo = () => {
        if (item.auto_renewable) {
            return t("app_tariff:subscription_description", { price, plan: item.name, deviceStore, days: item.recurringPeriodDays })
        } else if (!item.auto_renewable && item.recurringPeriodDays) {
            return t("app_tariff:one_time_payment_period_description", { price, plan: item.name, days: item.recurringPeriodDays })
        } else {
            return t("app_tariff:one_time_payment_forever_description", { price, plan: item.name })
        }
    }

    return <Styled.OfferCard>
        <CacheImage style={{ width: "100%", height: 200 }} source={item.banner}></CacheImage>
        {(item.purchased && item.purchased._id) ? (
            <Styled.OfferBanner>
                <Styled.OfferBannerText>{t("app_tariff:Purchased")}</Styled.OfferBannerText>
            </Styled.OfferBanner>
        ) : null}
        <Styled.OfferInner>
            <Styled.OfferFirstLine>
                <Styled.OfferName>{item.name}</Styled.OfferName>
                {(item.purchased && item.purchased._id) ? null : (
                    <Styled.OfferPrice>{price}</Styled.OfferPrice>
                )}
            </Styled.OfferFirstLine>
            <Styled.OfferDescription>{item.description}</Styled.OfferDescription>
        </Styled.OfferInner>
    </Styled.OfferCard>
    return (
        <Styled.PlanCard selected={selected}>
            <Styled.PlanName selected={selected}>{item.name}</Styled.PlanName>
            <Styled.PlanDescription selected={selected}>{item.description}</Styled.PlanDescription>
            <Styled.PlanPrice selected={selected}>{price}</Styled.PlanPrice>
            <Styled.PlanInfoWrap open={selected}>
                <Styled.PlanInfo>
                    {t("app_tariff:payment_will_be_charged", { deviceStore })}
                    {/* Оплата будет снята с учетной записи {deviceStore} при подтверждении покупки */}
                </Styled.PlanInfo>
                {/*{item.auto_renewable && (*/}
                {/*    <>*/}
                {/*        <Styled.PlanInfo>*/}
                {/*            Подписка автоматически не продлевается.*/}
                {/*        </Styled.PlanInfo>*/}
                {/*        <Styled.PlanInfo>*/}
                {/*            Любая неиспользованная часть бесплатного пробного периода, если таковая*/}
                {/*            предлагается, будет аннулирована, когда пользователь приобретает подписку на эту*/}
                {/*            публикацию, где это применимо.*/}
                {/*        </Styled.PlanInfo>*/}
                {/*    </>*/}
                {/*)}*/}
            </Styled.PlanInfoWrap>
        </Styled.PlanCard>
    )
}

PricingCard = withNamespaces(["app_basic", "app_tariff"], { wait: true })(PricingCard)

const Offers = ({ dispatch, navigation, t }) => {
    // console.log("BUY OFFER")
    let { offers } = navigation.state.params;
    const [purchasableItems, setPurchasableItems] = useState([]);
    const [selectedItem, selectItem] = useState({});
    const [purchaseInProgress, setPurchaseLoading] = useState(false);
    const [loadingIAP, setLoadingIAP] = useState(true);
    const { subscribe, unsubscribe } = usePubSub();


    // console.log("purchasebleItems", purchasableItems);
    // console.log("offers ", offers);
    const getPlatformIAPs = async () => {
        // console.log("getPlatformIAPs ", offers)
        if (!offers) {
            // console.log("FETCH ALL OFFERS");
            let plansResponse = await dispatch(getPlans());
            if (plansResponse && plansResponse.status == "ok") {
                offers = plansResponse.plans;
            }
        }
        if (!offers) {
            setPurchasableItems([])
            return;
        }


        setLoadingIAP(true);
        await RNIap.initConnection();
        const productsSKU = [], subscriptionsSKU = [];
        for (const offer of offers) {
            // console.log("offer.iapProducts ",offer.iapProducts);
            if (offer.auto_renewable) {
                if (offer.iapProducts && offer?.iapProducts[Platform.OS]) {
                    subscriptionsSKU.push(offer.iapProducts[Platform.OS]);
                }
            } else {
                if (offer.iapProducts && offer?.iapProducts[Platform.OS]) {
                    productsSKU.push(offer.iapProducts[Platform.OS]);
                }
            }
        }
        let platformProducts = {}, platformSubscriptions = {};
        // console.log("subscriptionsSKU ", subscriptionsSKU);
        if (subscriptionsSKU.length) {
            const result = await RNIap.getSubscriptions(subscriptionsSKU);
            // console.log("result subscriptionsSKU ", result);
            result.forEach((subscription) => {
                if (subscription && subscription.productId) {
                    platformSubscriptions[subscription.productId] = subscription
                }
            });
        }
        // console.log("productsSKU ", productsSKU);
        if (productsSKU.length) {
            const result = await RNIap.getProducts(productsSKU);
            // console.log("result productsSKU ", result);
            result.forEach((product) => {
                if (product && product.productId) {
                    platformProducts[product.productId] = product
                }
            });
        }
        const purchasableItems = []
        offers.forEach((offer) => {
            const purchasableItem = offer;
            if (offer.iapProducts && offer?.iapProducts[Platform.OS]) {
                const productId = offer?.iapProducts[Platform.OS];
                purchasableItem.product = offer.auto_renewable ? platformSubscriptions[productId] : platformProducts[productId];
                if (purchasableItem.product) {
                    purchasableItem.price = purchasableItem.product.price;
                    purchasableItem.currency = purchasableItem.product.currency;
                    purchasableItems.push(purchasableItem)
                }
            } else {
                return purchasableItems
            }
        }, []);
        // console.log("purchasableItems => ", purchasableItems);

        if (purchasableItems && purchasableItems.length) {
            setPurchasableItems(purchasableItems);
        }
        setLoadingIAP(false);
    }


    const onPurchaseFinish = async (params) => {
        // console.log("onPurchaseFinish in offers");
        // await dispatch(getPlans());
        let plansResponse = await dispatch(getPlans());
        if (plansResponse && plansResponse.status == "ok") {
            offers = plansResponse.plans;
            getPlatformIAPs();
        }
    }

    useEffect(() => {
        getPlatformIAPs();
        subscribe("purchaseFinished", onPurchaseFinish);
        return () => {
            unsubscribe("purchaseFinished", onPurchaseFinish);
        }
    }, []);

    // useEffect(() => {
    // getPlatformIAPs();
    // },[offers]);

    return (
        <MainLayout loading={loadingIAP} screenTitle={t("app_tariff:choose_plan")} getAvatar={false}>
            <Styled.PlansScrollView>
                <Styled.Plans>
                    <Styled.Title>{t("app_tariff:choose_plan")}</Styled.Title>

                    {purchasableItems.map((item) => (

                        <Touchable onPress={() => {
                            // console.log("item._id ", item._id);
                            // if(item && item.purchased && item.purchased._id){
                            // dispatch({
                            // type: "ALERT",
                            // text: "Already purchased"
                            // })
                            // }else{
                            Actions.offer({ offer_id: item._id })
                            // }
                            // selectItem(item)
                        }}>
                            <PricingCard item={item} selected={selectedItem._id === item._id} />
                        </Touchable>
                    ))}
                </Styled.Plans>
            </Styled.PlansScrollView>
        </MainLayout>
    );
}

export default compose(
    connect(({ me, influencer }) => ({ me, influencer })),
    withNamespaces(["app_basic", "app_tariff"], { wait: true })
)(Offers)
