import React, {Component, Fragment} from "react";
import Logic from "../logic";
import Skeleton from "react-loading-skeleton"

import { Plans, Plan, Name, Value, Price, Period, NoPlans, Img, Text } from "../styles"

export const PlanCard = ({plan, onClick, active}) => {
    return (
        <Plan onClick={onClick} className={active ? "active" : ""}>
            <Name>{plan.name}</Name>
            <Price>
                <Value>{plan.currencySymbol}{plan.price}/</Value>
                <Period>{plan.recurringPeriodText}</Period>
            </Price>
        </Plan>
    )
};

export default Logic(({plans, onPlanClick, state, loading, t})=>{
    let {activePlan} = state;
    return (
        <Plans>
            {plans && plans.length ? plans.map((plan, i)=>
                <PlanCard key={i} plan={plan} onClick={()=>onPlanClick(plan._id)} active={plan._id===activePlan}/>
            ) : loading.plans ? (
                [1,2,3,4].map((key)=>
                    <Plan key = {key}>
                        <Name>
                            <Skeleton />
                        </Name>
                        <Name>
                            <Skeleton />
                        </Name>
                    </Plan>
                )
            ): (
                <NoPlans>
                    <Img/>
                    <Text>{t("no_available_plans")}</Text>
                </NoPlans>
            )}
        </Plans>
    )
});
