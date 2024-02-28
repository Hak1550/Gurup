import React from "react";
import MainLayout from "../../../components/MainLayout";
import Plans from "../../../components/Plans";
import Logic from '../logic'
import { config } from "../../../styles/variables";
import Styled from "../styles"
import Animated from "react-native-reanimated";
import { formatPrice } from "../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

const PricingPlan = ({ me, removeSubscription, navigation, t}) => {

    // let title = (me && me.plan) ? `${t("app_tariff:choose_plan")} - ${me.plan.name}` : t("app_tariff:choose_plan");
    // if (!config.appDomain) {
    //     title = t("app_tariff:choose_plan");
    // }

    // console.log("PLAN!", me.plan)
    const {offers} = navigation.state.params;
    // console.log("PRICING PLANS",offers);
    return (
        <MainLayout screenTitle={t("app_tariff:choose_plan")} getAvatar={false}>
            <Styled.Plans>
                <Styled.Title>{t("app_tariff:choose_plan")}</Styled.Title>
                {me.plan && (
                    <Styled.PlanCard>
                        <Styled.PlanName>{me.plan.name}</Styled.PlanName>
                        <Styled.PlanPrice>{formatPrice({ price: me.plan.price, currency: "RUB"})}</Styled.PlanPrice>
                        <Styled.PlanMore>{t("app_basic:show_more")}</Styled.PlanMore>
                        {/* <Styled.PlanInfoWrap as = {Animated.View}> 
                            <Styled.PlanInfo></Styled.PlanInfo>
                        </Styled.PlanInfoWrap>  */}
                    </Styled.PlanCard>
                )}
                <Plans offers={offers}/>
                <TouchableOpacity onPress={removeSubscription}>
                    <Styled.CancelSubscription>
                        {t("app_tariff:cancel_subscription")}
                    </Styled.CancelSubscription>
                </TouchableOpacity>
            </Styled.Plans>
        </MainLayout>
    );
}

export default Logic(PricingPlan)
