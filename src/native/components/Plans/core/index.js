import React, {Fragment} from "react";
import Preloader from "../../Preloader";
import {ScrollView, View, Text} from "react-native";
import styles from "../styles";
import {gradients} from "../../../styles/variables";
import PricingCard from "../../PricingCard";
import Button from "../../Button";
import Logic from '../logic'
import { config } from "../../../styles/variables";

const Plans = ({state,  buyProduct, hasSubscriptionView, toggleActive, removeSubscription, buySubscription, me, influencer, t}) => {
    const { activeProduct = {}, autoRenewablePlans = [], nonRenewablePlans = [], coinBundles = [], userSubscription, itemProduct, item, plans, loading} = state;
    // console.log("render plans markup ", coinBundles)
    let renderButton = () => {
        // console.log("render button");
        if(userSubscription){
            // console.log("USER SUBSCRIPTION");
            return(
                <View style={styles['pricing-plan__get-subscription-btn']}>
                    <Button
                        title={t('app_tariff:cancel_subscription')}
                        theme="accent"
                        onPress={removeSubscription}
                    />
                </View>
            );
        } else if(activeProduct) {
            let title;
            switch (activeProduct.type) {
                case "one-time-subscription":
                    title= t('app_tariff:purchase_access');
                    break;
                case "subscription":
                    title = t('app_tariff:buy_subscribe');
                    break;
                case "coin":
                    title = t("app_tariff:buy_coins");
                    break;
                case "product":
                    title = t('app_tariff:purchase_product');
                    break;
                default:
                    title=t('app_tariff:buy_button');
            }
            return(
                <View style={styles['pricing-plan__get-subscription-btn']}>
                    <Button
                        disabled = {!activeProduct}
                        title={title}
                        theme="accent"
                        onPress={buyProduct}
                    />
                </View>
            );

        }
    };
    // console.log("ITEM PRODUCT => ",itemProduct,"    ",userSubscription,"   activeProduct")
    // console.log("config ",config);
    if (!config.appDomain){
        return (loading) ? <Preloader />:(
            <View>
                <ScrollView contentContainerStyle={styles['pricing-plan']} showsVerticalScrollIndicator={false}>
                    {coinBundles.map((item) => (
                        <PricingCard
                            type="coin"
                            onPress={() => {
                                // console.log("COIN BUNDLE SELECTED ", item)
                                toggleActive(item, "coin")
                            }}
                            currency={item.currency}
                            name={item.name_en}
                            oldPrice={item.oldPrice}
                            price={item.price}
                            localizedPrice={(item && item.product)?item.product.localizedPrice:null}
                            banner={item.banner}
                            coinImage={influencer.coinImage}
                            coinName={influencer.coinName}
                            recurringPeriodText={item.recurringPeriodText}
                            key={item._id}
                            active={activeProduct.productId === item.productId}
                        />
                    ))}
                </ScrollView>
                {
                    (activeProduct && activeProduct.productId) ?
                        renderButton() :
                        null
                }
            </View>
        );
    }


    return (loading ) ? <Preloader/> : (
        <Fragment>
            <View>
                <ScrollView contentContainerStyle={styles['pricing-plan']} showsVerticalScrollIndicator={false}>
                    {userSubscription ? hasSubscriptionView() : (
                        <Fragment>
                            {itemProduct?(
                                <Fragment>
                                    {/* {(()=>{console.log("render itemProduct ",itemProduct)})()} */}
                                    <Text style = {styles['pricing-plan__title']}>{t('app_tariff:one_time_purchase_text')}</Text>
                                    <PricingCard
                                        key={Math.random()}
                                        type="one-time"
                                        onPress={() => {
                                            // console.log("INE TIME SELECTED ",itemProduct)
                                            toggleActive(itemProduct,"product")
                                        }}
                                        name={item.title}
                                        price={parseInt(itemProduct.price)}
                                        currency={itemProduct.currency}
                                        active={activeProduct.productId === itemProduct.productId}
                                    />
                                </Fragment>
                            ):null}
                            {nonRenewablePlans && nonRenewablePlans.length ? (
                                <Fragment>
                                    <Text style = {styles['pricing-plan__title']}>{t('app_tariff:one_time_subscriptions_text')}</Text>
                                    { nonRenewablePlans.map((item) => (
                                        <PricingCard
                                            type="not-renewable"
                                            onPress={() => {
                                                // console.log("NON RENEWABLE SELECTED ",item)
                                                toggleActive(item, "one-time-subscription")
                                            }}
                                            name={item.name}
                                            oldPrice={item.oldPrice}
                                            price={item.price}
                                            banner={item.banner}
                                            currency={item.currency}
                                            recurringPeriodText={item.recurringPeriodText}
                                            key={item._id}
                                            active={activeProduct.productId === item.productId}
                                        />
                                    ))}
                                </Fragment>
                            ) : null}
                            {autoRenewablePlans && autoRenewablePlans.length ? (
                                <Fragment>
                                    <Text style = {styles['pricing-plan__title']}>{t('app_tariff:renewable_subscriptions_for_all_text')}</Text>
                                    { autoRenewablePlans.map((item) => (
                                        <PricingCard
                                            type="auto-renewable"
                                            onPress={() => {
                                                toggleActive(item)
                                            }}
                                            name={item.name}
                                            coinImage={influencer.coinImage}
                                            oldPrice={item.oldPrice}
                                            price={item.price}
                                            banner={item.banner}
                                            currency={item.currency}
                                            recurringPeriodText={item.recurringPeriodText}
                                            key={item._id}
                                            active={activeProduct.productId === item.productId}
                                        />
                                    ))}
                                </Fragment>
                            ) : null}
                        </Fragment>
                    )}
                </ScrollView>
                
                {
                    (activeProduct && activeProduct.productId)?
                    renderButton():
                    null
                }

                {userSubscription?renderButton():null}
            </View>
        </Fragment>
    )
}

export default Logic(Plans)

