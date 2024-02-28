import React, { Fragment, useEffect, useState } from "react";
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
import {Platform, View, StyleSheet, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { usePubSub } from "../../hooks";
import { Actions } from "react-native-router-flux";
import { getPlans, getPlan} from '../../../actions/plans';
import CacheImage from "../../components/CacheImage"
import ErrorBoundary from '../../components/ErrorBoundary';
import FastImage from "react-native-fast-image"
import getRNDraftJSBlocks from "react-native-draftjs-render"
import styles from '../../components/ArticleLayout/styles';
import Article from "../../components/ArticleLayout";
import CourseItem from "../../components/CourseItem"


const Offer = ({ dispatch, navigation, purchasedCourses, t, influencer={}}) => {
    let {offer_id} = navigation.state.params;
    // console.log("offer_id => ",offer_id);
    let [offer, setOffer] = useState({});
    const [selectedItem, selectItem] = useState({});
    const [purchaseInProgress, setPurchaseLoading] = useState(false);
    const [loadingIAP, setLoadingIAP] = useState(false);
    const {subscribe, unsubscribe} = usePubSub();

    const renderLegalInfo = () => {
        if(!offer || !offer._id){
            return "";
        }
        // console.log("Offer", offer);
        if(offer.auto_renewable){
            return t("app_tariff:subscription_description", {price, plan: offer.name, deviceStore, days: offer.recurringPeriodDays})
        } else if(!offer.auto_renewable && offer.recurringPeriodDays){
            return t("app_tariff:one_time_payment_period_description", {price, plan: offer.name, days: offer.recurringPeriodDays})
        } else {
            return t("app_tariff:one_time_payment_forever_description", {price, plan: offer.name})
        }
    }
    let price = null;
    // console.log("Selected item", selectItem);
    if(selectedItem && selectedItem.price){
        price = formatPrice({ price: selectedItem.price, currency: selectedItem.currency});
    }

    // console.log("purchasebleItems", purchasableItems);
    const getPlatformIAP = async () => {
        // console.log("getPlatformIAPs ")
        setLoadingIAP(true);
        let purchasableItem = null;
        if(offer_id){
            // console.log("FETCH OFFER ",offer_id);
            let plansResponse = await dispatch(getPlan(offer_id));
            // console.log("planResponse ===> ",JSON.stringify(plansResponse));
            if(plansResponse && plansResponse.status == "ok"){
                offer = plansResponse.plan;
                setOffer(plansResponse.plan)
            }
        }else{
            // console.log("OFFER NOT FOUND???")
            dispatch({
                type: "ALERT",
                text: t("app_tariff:Offer not found")
            })
            Actions.pop();
            return;
        }
        if(!offer){
            setLoadingIAP(false);
            return;
        }
        if(offer && offer.purchased && offer.purchased._id){
            setLoadingIAP(false);
            return;
        }
        // console.log("offer zzz",offer);

        await RNIap.initConnection();
        if(Platform.OS === "ios"){
            RNIap.clearProductsIOS()
        }
        const productsSKU = [], subscriptionsSKU = [];
        // console.log("offer.iapProducts ",offer);
        if(offer.auto_renewable){
            if(offer.iapProducts && offer?.iapProducts[Platform.OS]){
                subscriptionsSKU.push(offer.iapProducts[Platform.OS]);
            }
        } else {
            if(offer.iapProducts && offer?.iapProducts[Platform.OS]){
                productsSKU.push(offer.iapProducts[Platform.OS]);
            }
        }
        
        let platformProducts = {}, platformSubscriptions = {};
        // console.log("subscriptionsSKU ",subscriptionsSKU);
        if(subscriptionsSKU.length){
            const result = await RNIap.getSubscriptions(subscriptionsSKU);
            // console.log("subs result ",result);
            if(result && result[0]){
                selectItem({
                    // ...offer,
                    offer_id: offer._id,
                    product:result[0],
                    price: result[0].price,
                    currency: result[0].currency,
                    productId:result[0].productId
                })
            }
        }
        // console.log("productsSKU ",productsSKU);
        if(productsSKU.length){
            const result = await RNIap.getProducts(productsSKU);
            // console.log("products result ",result);
            if(result && result[0]){
                selectItem({
                    // ...offer,
                    offer_id: offer._id,
                    product:result[0],
                    price: result[0].price,
                    currency: result[0].currency,
                    productId:result[0].productId
                })
            }
        }
        
        setLoadingIAP(false);
    }


    const onPurchaseFinish = async (params) => {
        setPurchaseLoading(false);
        // console.log("onPurchaseFinish ",offer_id)
        await dispatch(getPlans());
        let plansResponse = await dispatch(getPlan(offer_id));
        // console.log("planResponse onPurchaseFinish ===> ",JSON.stringify(plansResponse));
        if(plansResponse && plansResponse.status == "ok" && plansResponse.plan){
            // console.log("setting plansResponse.plan 1")
            offer = plansResponse.plan;
            // console.log("setting plansResponse.plan 2")
            setOffer(plansResponse.plan)
            // console.log("setting plansResponse.plan 3")
        }
    }

    useEffect(() => {
        getPlatformIAP();

        subscribe("purchaseFinished", onPurchaseFinish);
        return () => {
            unsubscribe("purchaseFinished", onPurchaseFinish);
        }
    }, []);

    const buyIAP = async () => {
        // console.log("selectedItem ",selectedItem);
        if(selectedItem){
            let purchase;
            setPurchaseLoading(true);
            try {

                await RNIap.clearTransactionIOS()
                let purchaseAttempts = await AsyncStorage.getItem('purchaseAttempts');
                purchaseAttempts = purchaseAttempts ? JSON.parse(purchaseAttempts): [];


                // console.log("selectedItem => ",selectedItem);
                await AsyncStorage.setItem('purchaseAttempts', JSON.stringify([
                    ...purchaseAttempts, 
                    {
                        ...selectedItem,
                        attemptDate: moment().toDate(),
                        nextCheck: moment().add(selectedItem.recurringPeriodDays,'days').toDate(),
                        type: "plan",
                    }
                ]));

                if(selectedItem.auto_renewable){
                    // console.log("requestSubscription!!!!!");
                    purchase = await RNIap.requestSubscription(selectedItem.productId, false)
                } else {
                    purchase = await RNIap.requestPurchase(selectedItem.productId, false)
                }
                
            } catch (error) {
                // console.log("ERRROR IN BUY PRODUCT!!!!! ",error);
                dispatch({
                    type:"ALERT",
                    text:t("app_tariff:buy_error") || "Purchase is not completed."
                })
                setPurchaseLoading(false);
            }
        }
    }

    const deviceStore = Platform.OS === "ios" ? "iTunes" : "Google Play";
    return (
        <MainLayout loading={loadingIAP} screenTitle={t("app_tariff:choose_plan")} getAvatar={false}>
            {(offer && offer._id)?(
                <ScrollView>
                    <CacheImage style={{width:"100%",height:250}} source={offer.banner}></CacheImage>
                    <Styled.OfferName>{offer.name}</Styled.OfferName>
                    <Article block={{ type:"richtext", meta_data: offer.fullDescription }} />
                    
                    <Styled.OfferInner>
                        {(offer.purchased && offer.purchased._id && offer.permissions)?(
                            <ErrorBoundary>
                                {offer.permissions.sort((a,b)=>{
                                    let order = ["courses", "marathons", "menus", "webinars", "chats", "articles"];
                                    return order.indexOf(a.module) - order.indexOf(b.module)
                                }).map(({module, access, elements})=>{
                                    // console.log("permissions ",module);
                                    if(module=="courses" && offer.courses && offer.courses.length){
                                        return <Fragment>
                                            <Styled.OfferItemsTitle>{t("app_tariff:Courses")}</Styled.OfferItemsTitle>
                                            {offer.courses.map((course, key) => {
                                                const purchasedCourse = purchasedCourses.find(purchasedCourse => purchasedCourse.course === course._id);
                                                let courseProgress = 0;
                                                if(purchasedCourse && purchasedCourse.activeExercises) {
                                                    courseProgress = purchasedCourse.activeExercises.filter(({ complete }) => complete).length /course.exercises.length
                                                }
                                                return(
                                                    <CourseItem
                                                        _id={course._id}
                                                        key={key}
                                                        course={{
                                                            ...course,
                                                            allowed: true //To remove FREE banner as we don't have allowed here
                                                        }}
                                                        purchasedCourse={purchasedCourse}
                                                        courseProgress={courseProgress}
                                                        displayType={influencer.app__courseCardDisplay||"default"}
                                                    />
                                                )
                                            })}
                                        </Fragment>
                                    }

                                    if(module=="marathons" && offer.marathons && offer.marathons.length){
                                        return <Fragment>
                                            <Styled.OfferItemsTitle>{t("app_tariff:Challenges")}</Styled.OfferItemsTitle>
                                            {offer.marathons.map((course, key) => {
                                                const purchasedCourse = purchasedCourses.find(purchasedCourse => purchasedCourse.course === course._id);
                                                let courseProgress = 0;
                                                if(purchasedCourse && purchasedCourse.activeExercises) {
                                                    courseProgress = purchasedCourse.activeExercises.filter(({ complete }) => complete).length /course.exercises.length
                                                } 
                                                return(
                                                    <CourseItem
                                                        key={key}
                                                        course={{
                                                            ...course,
                                                            allowed: true //To remove FREE banner as we don't have allowed here
                                                        }}
                                                        type='marathon'
                                                        purchasedCourse={purchasedCourse}
                                                        courseProgress={courseProgress}
                                                        displayType={influencer.app__courseCardDisplay||"default"}
                                                    />
                                                )
                                            })}
                                        </Fragment>
                                    }
                                    //TODO: Maybe add other content types later

                                } ) }
                            </ErrorBoundary>
                        ):(

                            <ErrorBoundary>
                                <Styled.PlanInfoWrap> 
                                    <Styled.PlanInfo>
                                        {t("app_tariff:payment_will_be_charged", {deviceStore})}
                                    </Styled.PlanInfo>
                                    <Styled.PlanInfo>
                                        {renderLegalInfo()}
                                    </Styled.PlanInfo>
                                </Styled.PlanInfoWrap> 
                                <Styled.ButtonContainer>
                                    <Styled.BuyButton 
                                        loading={purchaseInProgress} 
                                        icon="bolt"
                                        onPress = {buyIAP} 
                                        title={`${t("app_tariff:Pay")} ${price}`}
                                    />
                                </Styled.ButtonContainer>
                            </ErrorBoundary>

                        )}
                    </Styled.OfferInner>
                        
                </ScrollView>
            ):null}
        </MainLayout>
    );
}

export default compose(
    connect(({ me, influencer, purchasedCourses }) => ({ me, influencer, purchasedCourses })),
    withNamespaces(["app_basic", "app_tariff"], { wait: true })
)(Offer)
