import React, {Fragment} from "react";
import {Platform, Linking, View} from "react-native";
import PricingCard from "../PricingCard";
import * as RNIap from "react-native-iap";
import { purchaseCoins } from '../../../actions/coins';
import {buyPlan, getPlans,cancelSubscription} from "../../../actions/plans";
import { getMe} from "../../../actions/sign";
import {getCourse, purchaseCourse} from '../../../actions/courses'
import {compose} from "redux";
import isLoading from "../../../hocs/isLoading";
import * as app from "../../app.json";
import {connect} from "react-redux";
import _ from 'underscore';
import { withNamespaces } from "react-i18next";
import { Actions } from "react-native-router-flux";
import { config } from "../../styles/variables"
import { DefaultPubSubContext } from "../../utils/pubsub";
import { sub } from "react-native-reanimated";
import { subscribe } from "react-native-extended-stylesheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        state = {
            activePlan: '',
            loading: true,
            item: null,
            itemProduct:null,
            plans:[],
            activeProduct:{},
            userSubscription:null
        };
    
        static contextType = DefaultPubSubContext;

        async updatePlans(){
            this.setState({
                loading:true
            })
            // console.log("updatePlans OS => ",Platform.OS);
    
            const {me,dispatch} = this.props;
            const {item} = this.state;
            // console.log("updateplans item => ",item);
            try{
                // console.log("init connection....")
                let isConnected = await RNIap.initConnection();
                
                // console.log("isConnected ",isConnected);
                const plansResponse = await dispatch(getPlans());
                const { plans,  gateway } = plansResponse;
                let { coinBundles = [] } = plansResponse;
                // console.log("gateway=======> ",gateway);
                let inAppSubscriptions, inAppProducts;
                
                if (config.appDomain) {
                    // RNIap.clearProducts();
                    inAppSubscriptions = await RNIap.getSubscriptions(
                        Platform.select({
                            android: plans.filter(({auto_renewable}) => auto_renewable).map(({product}) => {
                                if(product && product.android_id){
                                    return product.android_id;
                                }
                            }),
                            ios: plans.filter(({auto_renewable}) => auto_renewable).map(({product}) => {
                                if(product && product.ios_id){
                                    return product.ios_id;
                                }
                            })
                        })
                    );
                }
                // console.log("inAppSubscriptions ",inAppSubscriptions)
                let itemProduct;
    
                if(item && item._id && item.product ){
                    // console.log("fetching item product with item => ",item,"  ps => ",Platform.select({ios:[item.product.ios_id] } ));

                    let platformProductId = Platform.select({
                        ios:item.product.ios_id,
                        android:item.product.android_id
                    });
                    let allProducts = await RNIap.getProducts(
                        [platformProductId]
                    );
                    // console.log("all products ",allProducts);
                    if(allProducts && allProducts.length){
                        itemProduct = allProducts.find(({productId})=>{return productId == platformProductId });

                        // console.log("itemProduct FETCHED ",itemProduct)
                        this.setState({
                            itemProduct:{...itemProduct, ...item.product, product:{...item.product}}
                        })
                    }
                }
                // console.log("itemProduct ",itemProduct)
                // console.log("plans list",plans);
                // console.log("ios => ", plans.filter(({auto_renewable}) => !auto_renewable).map(({product}) => {
                //     if(product && product.ios_id){
                //         return product.ios_id;
                //     }
                // }))
                if (config.appDomain) {
                    inAppProducts = await RNIap.getProducts(
                        Platform.select({
                            ios: plans.filter(({auto_renewable}) => !auto_renewable).map(({product}) => {
                                if(product && product.ios_id){
                                    return product.ios_id;
                                }
                            }),
                            android:plans.filter(({auto_renewable}) => !auto_renewable).map(({product}) => {
                                if(product && product.android_id){
                                    return product.android_id;
                                }
                            })

                        })
                    );
                }


                //Coins
                if (!config.appDomain) {
                    // console.log("COINS ", coinBundles);

                    let platformCoins = Platform.select({
                        ios: coinBundles.map( (bundle) => {
                            // console.log("map ", bundle)
                            if (bundle && bundle.ios_id) {
                                return bundle.ios_id;
                            }
                        }),
                        android: coinBundles.map( (bundle) => {
                            // console.log("map ", bundle)
                            if (bundle && bundle.android_id) {
                                return bundle.android_id;
                            }
                        })
                    });
                    // console.log("platformCoins ", platformCoins);
                    coinProducts = await RNIap.getProducts(platformCoins);
                    // console.log("coinProducts ", coinProducts);
                    coinBundles = coinBundles.map((coinBundle) => {
                        // console.log("one cb ",coinBundle);
                        let coinBundleProductId = Platform.select({ ios: coinBundle.ios_id, android: coinBundle.android_id });
                        // console.log("coinBundleProductId ", coinBundleProductId);
                        let cp = coinProducts.find((c)=>{
                            if (coinBundleProductId == c.productId){
                                return c;
                            }
                        });
                        // console.log("cp ",cp);
                        if(cp && cp.price && cp.currency){
                            return {
                                ...coinBundle,
                                productId: cp.productId,
                                price: cp.price,
                                currency: cp.currency,
                                product: cp
                            };
                        }else{
                            return coinBundle;
                        }
                    });
                    this.setState({
                        coinBundles
                    })
                }
    
                // console.log("subscriptions",inAppSubscriptions,inAppProducts);
    
                let inAppPlans = [];
                let autoRenewablePlans = [];
                let nonRenewablePlans = [];
    
                if (config.appDomain && plans.length){
                    plans.forEach((plan) => {
                        if(!plan || !plan.product){
                            // console.log("no product in plan");
                            return;
                        }
                        // RNIap.clearProducts();
                        let planProductId = Platform.select({ios:plan.product.ios_id, android:plan.product.android_id});
                        let price, currency;
                        let pr  = (plan.auto_renewable ? inAppSubscriptions : inAppProducts).find(({productId}) => productId === planProductId);
                        if(!pr){
                            // console.log("NO PRODUCT OR NO PRICE/CURRENCY ",pr)
                            return;
                        }
                        price = pr.price;
                        currency = pr.currency;
                        if(plan.auto_renewable)
                            autoRenewablePlans.push({...plan, price, currency});
                        else
                            nonRenewablePlans.push({...plan, price, currency});
                    });
                }
                // console.log("autoRenewablePlans ",autoRenewablePlans,"   nonRenewablePlans",nonRenewablePlans);
                this.setState({
                    autoRenewablePlans,
                    nonRenewablePlans
                });
                // dispatch({type: "SET_PLANS", plans: inAppPlans});
                
                if(me.plan){
                    // console.log("SET USER PLAN", me.plan);
                    let userSubscription = [...autoRenewablePlans,...nonRenewablePlans].find(({_id}) => {
                        // console.log("find ",_id);
                        return me.plan._id === _id
                    } );
                    // console.log("userSubscription ",userSubscription)
                    this.setState({userSubscription});
                }
    
                if(gateway){
                    this.setState({ gateway});
                }

            }catch(e){
                console.log("error getting products ",e);
            }

            this.setState({
                loading:false
            })
            
        }

        
        setItem = async (itemToSet) => new Promise (async (resolve,reject) => {
            let item = null;
            // console.log("setting item!!!! ",itemToSet);
            if(itemToSet && itemToSet._id){
                if(itemToSet.type === "course"){
                    let {course} = await this.props.dispatch(getCourse(itemToSet._id));
                    item = course;
                } else {
    
                }
            }
            if(item){
                this.setState({
                    item
                });
            }else{
                this.setState({
                    item:null 
                })
            }
            resolve(item);
        });

        onCoinPurchaseFinish = () => {
            // console.log("Coin purchase event");
            const {afterPurchase, dispatch} = this.props;
            dispatch({
                type: "START_ANIMATION",
                name: "checked",
                text: this.props.t("app_tariff:coins_purchased"),
                duration: 1500
            });
            if (afterPurchase){
                afterPurchase();
            }else{
                Actions.pop();
            }
        }

        async componentDidMount(){
            const {subscribe} = this.context;
            subscribe("coinPurchaseFinish", this.onCoinPurchaseFinish);
            await this.setItem(this.props.item);
            this.updatePlans();
        };
    
        async componentWillUnmount(){
            const {unsubscribe} = this.context;
            unsubscribe("coinPurchaseFinish", this.onCoinPurchaseFinish);
        };

        async componentDidUpdate(prevProps){
            if(!prevProps.me.plan && this.props.me.plan){
                this.setState({userSubscription: this.props.me.plan});
            }
    
            if((!prevProps.item && this.props.item) || (prevProps.item && this.props.item && prevProps.item._id !== this.props.item._id)) {
                // console.log("UPDATING PLANS!!!!");
                await this.setItem(this.props.item);
                this.updatePlans();
            }
        }
    
        hasSubscriptionView = ()=>{
            const {userSubscription} = this.state;
            // console.log("userSubscription1 ",userSubscription);
            if(userSubscription && userSubscription.name){
                return (
                    <Fragment>
                        <PricingCard
                            hasSubscription
                            name={userSubscription.name}
                            oldPrice={userSubscription.oldPrice}
                            price={userSubscription.price}
                            banner={userSubscription.banner}
                            currency={userSubscription.currency}
                            recurringPeriodText={userSubscription.recurringPeriodText}
                        />
                        {/* <TouchableOpacity style={styles['pricing-plan__unfollow']} onClick> */}
                        {/* <Text style={styles['pricing-plan__unfollow-text']}>Отписаться</Text> */}
                        {/*</TouchableOpacity>*/}

                        
                    </Fragment>
                )
            }else{
                return null;
            }
        };

        
        toggleActive = async ({productId,product}, type = "subscription")=>{
            // console.log("toggle active ",productId,type);
            this.setState({ activeProduct: {...product, product, productId, type} })
        };

        removeSubscription = async () =>{
            // console.log("GATEWAY", this.state.gateway);


            if(this.state.gateway=="tks" || this.state.gateway == "kassa"){
                // console.log("gateway tks, cancel")
                await this.props.dispatch(cancelSubscription());
                await this.props.dispatch({type: "ALERT", text: this.props.t("app_tariff:subscription_cancelled")});
                // console.log("go init")
                // await this.props.dispatch(getMe());
                Actions.pop();
                // console.log("inited")
            }else{
                if(Platform.OS === "ios"){
                    Linking.openURL("itms-apps://apps.apple.com/account/subscriptions");
                } else if(Platform.OS === "android") {
                    if(app.expo && app.expo.android)
                        Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${app.expo.android.package}`);
                    else
                        Linking.openURL('https://play.google.com/store/account/subscriptions');
                }
            }
        };

        buyProduct = async () => {
            try{
                const {dispatch, plans, afterPurchase, item} = this.props;
                const {activeProduct = {}, itemProduct} = this.state;
                let gateway = Platform.OS==="ios" ? "apple" : "google";
                let product;
                if(!activeProduct ){
                    console.error("no activeproduct ",activeProduct);
                    return;
                }
                let platformProductId = Platform.select({
                    ios:activeProduct.ios_id,
                    android:activeProduct.android_id
                })
                if(!platformProductId && activeProduct.productId){
                    platformProductId = activeProduct.productId;
                }

                // console.log("activeProduct ",activeProduct)
                // console.log("platformProductId ",platformProductId);
                if(!platformProductId){
                    // console.log("no platformProductId ");
                    return;
                }
                if(activeProduct.type === "subscription" || activeProduct.type === "one-time-subscription") {
                    const plan = plans.find((plan) => {
                        // console.log("plan check", plan.productId , activeProduct.productId);
                        return plan.productId === activeProduct.productId
                    });
                    let purchase;
                    // RNIap.clearProducts();
                    if(activeProduct.type === "subscription") {
                        [product] = await  RNIap.getSubscriptions([platformProductId]);
                        purchase = await RNIap.buySubscription(platformProductId);
                    } else if (activeProduct.type === "one-time-subscription") {
                        [product] = await  RNIap.getProducts([platformProductId]);
                        purchase = await RNIap.buyProduct(platformProductId);
                    }
                    await dispatch(buyPlan({plan_id: plan._id, gateway, purchase, product}));
                    // await dispatch(init());
                    if(afterPurchase) afterPurchase();
                } else if (activeProduct.type=="coin"){
                    // console.log("purchase coin")
                    await RNIap.clearTransactionIOS()
                    let purchaseAttempts = await AsyncStorage.getItem('purchaseAttempts');
                    purchaseAttempts = purchaseAttempts ? JSON.parse(purchaseAttempts): [];
                    await AsyncStorage.setItem('purchaseAttempts', JSON.stringify([
                        ...purchaseAttempts, 
                        {
                            ...activeProduct,
                            attemptDate: moment().toDate(),
                            type: "coin",
                        }
                    ]));
                    await RNIap.requestPurchase(platformProductId);

                    //THIS TO HANDLER
                    // await dispatch(getMe());
                   




                    // dispatch({
                    //     type: "START_ANIMATION",
                    //     name: "checked",
                    //     text: this.props.t("app_tariff:coins_purchased"),
                    //     duration: 1500
                    // });

                    
                    // if (afterPurchase){
                    //     console.log("after purchase coin ", afterPurchase, ""+afterPurchase)
                    //     afterPurchase();
                    // }else{
                    //     Actions.pop();
                    // }

                    if (gateway === "google") {
                        await RNIap.consumePurchase(platformProductId);
                    }
                } else if (item) {
                    // console.log("BUY ITEM ",platformProductId)
                    // RNIap.clearProducts();
                    const purchase = await RNIap.buyProduct(platformProductId);
                    product = itemProduct;
                    if (item.type === "course"){
                        await dispatch(purchaseCourse({_id: item._id, gateway, purchase, product}));
                    }
                    if(afterPurchase) afterPurchase();
                    if(gateway === "google"){
                        await RNIap.consumePurchase(platformProductId);
                    }
                }
            } catch(error){
                // console.log("ERROR OF BUY",error)
            }
        };
    

        render(){
            
            return <WrappedComponent
                key={Math.random()}
                state={this.state}
                hasSubscriptionView={this.hasSubscriptionView}
                toggleActive={this.toggleActive}
                buyProduct={this.buyProduct}
                removeSubscription={this.removeSubscription}
                buySubscription={this.buySubscription}
                {...this.props}/>
        }
    }

    return compose(
        withNamespaces('app_tariff', {wait: true}),
        connect(({ me, plans, influencer }) => ({ me, plans, influencer})),
        // isLoading({status_path: ({status}) => ({status: status.plans})})
    )(Logic)
}

