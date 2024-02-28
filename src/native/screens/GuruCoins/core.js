import React from "react";
import MainLayout from "../../components/MainLayout";
import Plans from "../../components/Plans";
import Logic from './logic'
import { config } from "../../styles/variables";

const GuruCoins = ({ afterPurchase, me, influencer, t }) => {

    let title = (me && me.plan) ? `${t("app_tariff:choose_plan")} - ${me.plan.name}` : t("app_tariff:choose_plan");
    if (!config.appDomain) {
        title = t("app_tariff:choose_coins");
    }


    return (
        <MainLayout screenTitle={title} getAvatar={false}>
            <Plans
                afterPurchase={this.afterPurchase}
                influencer={influencer}
                me={me}
            />
        </MainLayout>
    );
}

export default Logic(GuruCoins)
