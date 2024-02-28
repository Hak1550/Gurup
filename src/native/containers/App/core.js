import React, { Fragment } from "react"
import { Scene, Router, Actions, Stack, Tabs, Lightbox } from "react-native-router-flux"
import { StatusBar, Platform, UIManager, TouchableWithoutFeedback, Animated, Easing, BackHandler } from "react-native"
import OneSignal from "react-native-onesignal"
import { connect } from "react-redux"
import { compose } from "redux"
import Lessons from "../../screens/Lessons"
import Intro from "../../screens/Intro"
import Courses from "../../screens/Courses"
import Notification from "../../screens/Notification"
import BuyCourse from "../../screens/BuyCourse"
import Chat from "../../screens/Chat"
import ChatPrivate from "../../screens/ChatPrivate"
import Dialogs from "../../screens/Dialogs"
import ChangePassword from "../../screens/ChangePassword"
import About from "../../screens/About"
import WelcomeVideo from "../../screens/WelcomeVideo"
import SingleLesson from "../../screens/SingleLesson"
import Articles from "../../screens/Articles"
import Article from "../../screens/Article"
import Settings from "../../screens/Settings"
import Quiz from "../../screens/Quiz"
import QuizFinish from "../../screens/QuizFinish"
import NavigationStyles from "../../components/BottomNavigation/styles"
import TabBarIcon from "../../components/TabBarIcon"
import ProblemReport from "../../screens/ProblemReport"
import PricingPlan from "../../screens/PricingPlan"
import GuruCoins from "../../screens/GuruCoins"
import SupportChat from '../../screens/SupportChat'
import AnimationOverlay from "../../components/AnimationOverlay"
import InfluencerSearch from "../../screens/InfluencerSearch"
import InfluencerSelect from "../../screens/InfluencerSelect"
import SingleVideoTraining from "../../screens/SingleVideoTraining"
import Trainings from "../../screens/Trainings"
import MarathonMain from "../../screens/MarathonMain"
import BuyMarathon from "../../screens/BuyMarathon"
import MarathonSingleTraining from "../../screens/MarathonSingleTraining"
import Marathons from "../../screens/Marathons"
import NutritionMain from "../../screens/NutritionMain"
import NutritionMenuSingle from "../../screens/NutritionMenuSingle"
import NutritionRecipeSingle from "../../screens/NutritionRecipeSingle"
import EntryOptions from "../../screens/EntryOptions/core";
import EntryCode from "../../screens/EntryCode";
import EntryQR from "../../screens/EntryQR";
import Chapter from "../../screens/Chapter";
import Offers from "../../screens/Offers";
import Offer from "../../screens/Offer";


import TrainingFinish from "../../screens/TrainingFinish"
import BuyPlanModal from "../../components/BuyPlanModal"
import CustomTabs from "../../components/Tabs"
import { config } from "../../styles/variables"
import { registerPushToken, getMe } from "../../../actions/sign"
import { buyPlan, notifyRecipe,  } from "../../../actions/plans"
import { purchaseCoins } from '../../../actions/coins';

import { initPushToken, identify } from "../../utils/index"
// import { Sentry } from "react-native-sentry"
// import * as Sentry from "@sentry/react-native";

import error from "../../../utils/error"
import Constants from "expo-constants"
// import Branch from 'expo-branch';
import { fromLeft, fromRight, fromTop, fromBottom, fadeIn, fadeOut, zoomIn, zoomOut, flipY, flipX } from 'react-navigation-transitions';
import FullscreenVideo from "../../screens/FullscreenVideo"
import { usePubSub } from "../../hooks";
import * as RNIap from 'react-native-iap';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DefaultPubSubContext } from '../../utils/pubsub';
import moment from "moment";

class Root extends React.Component {
	constructor(props) {
		super(props)
		if (Platform.OS === "android") {
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
		}

		try {
			// if (props && props.influencer && props.influencer.name) {
			// 	console.log("init push token")
			// 	initPushToken(this.props.influencer, this.props.dispatch)
			// }
		} catch (e) {
			console.log("error => ", e)
		}
		this.state = {
			loadingSchool: false
		}
		/*
		 setTimeout(()=>{
		 props.dispatch({
		 type:"START_ANIMATION",
		 name:"checked"
		 })
		 },5000)
		 */

		
	}
	static contextType = DefaultPubSubContext;

	// componentWillMount() {
	// 	BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
	// }

	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton.bind(this));
	}
	handleBackButton = () => {
		// console.log("Actions screen", Actions.currentScene);
		if (["intro"].includes(Actions.currentScene)) {
			if(!this.props.isCustomApp) this.props.setDefaultTheme()
			Actions.pop()
		} else if (["entryOptions"].includes(Actions.currentScene)) {
			BackHandler.exitApp();
		} else if (["influencer"].includes(Actions.currentScene)) {

		} else {
			Actions.pop()
		}
		return true
	}
	async componentDidMount() {
		// console.log("ROOT INIT ")
		const { isAuthorized, dispatch, influencer} = this.props
		// const jwt_token = await AsyncStorage.getItem('jwt_token');
		// if(jwt_token) {
		// Notifications.addListener()
		if (isAuthorized && influencer) {
			// console.log("INFLUENCER MODULES", influencer.editableModules)
			Actions.reset("tabbar")

			if (influencer.editableModules && influencer.editableModules.length){
				const mainModules = ["courses", "marathons", "nutrition", "articles"];
				const module = mainModules.find((module) => influencer.editableModules.includes(module));
				// console.log("First found module", module)
				if(module){
					Actions.jump(`${module}_tab`);
				}
			}
		} else {
			Actions.reset("entryOptions")
		}



		// try{
		// 	Branch.subscribe((bundle) => {
		// 		console.log("GOT A LINK ",bundle);
		// 		if (bundle && bundle.params && !bundle.error) {
		// 		// `bundle.params` contains all the info about the link.
		// 			if(bundle.params && bundle.params.influencer_id){
		// 				if(dispatch){
		// 					dispatch({
		// 						type: "ALERT",
		// 						text: "BRANCH LINK"
		// 					})
		// 				}
		//
		// 			}
		// 		}
		// 	});
		// }catch(e){
		// 	console.log("BRANCH ERROR ",e);
		// }

		try {
			OneSignal.addEventListener("opened", this._handleNotification)
		} catch (e) {}

		if (Constants && !Constants.manifest) {
			// console.log("DEV")
		} else {
			// console.log("PROD")
			console.error = e => {
				// console.log("error ")
				console.log("error ", e)
				// Sentry.captureException(e)
				

				if (dispatch) {
					if (e.description){
						// console.log("FIRE DESCR ERROR", e.description)
						dispatch({
							type: "ERROR",
							descr: e.description,
						})
					} else if (("" + e).indexOf("Warning:") == 0) {

					} else {
						setTimeout(() => {
							dispatch({
								type: "ALERT",
								text: error("" + e, { printAnyMessage: true }),
							})
						}, 100)
					}
				}
			}
			console.log = () => {}
		}

		
		if(config.appDomain && this.props.isCustomApp){
			// console.log("GOT AN APP DOMAIN")
			// this.createPurchaseListner();
			// console.log("getPurchaseHistory")
			await RNIap.initConnection();
			this.createPurchaseListner();
			// let purchaseHistory = await RNIap.getPurchaseHistory()
			// console.log("got purchaseHistory ",purchaseHistory);
			// if(purchaseHistory && purchaseHistory.length){
			// 	await AsyncStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));
			// }
			// let availablePurchases = await RNIap.getAvailablePurchases();
			// console.log("availablePurchases => ",availablePurchases);

			if(Platform.OS == "ios"){
				this.checkIosReceipt();
			}

			// let iosPendingPurchases = await RNIap.getPendingPurchasesIOS();
			// console.log("iosPendingPurchases => ",iosPendingPurchases);
			// let purchaseAttempts = await AsyncStorage.getItem('purchaseAttempts');
			// console.log("purchaseAttempts ",JSON.parse(purchaseAttempts));
		}

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton.bind(this));
	}

	clearOldPurchaseAttempts = async ({hours = 48} = {}) => {
		// console.log("clearOldPurchaseAttempts")
		let purchaseAttempts = await AsyncStorage.getItem('purchaseAttempts');
		const now = moment.now();
		purchaseAttempts = JSON.parse(purchaseAttempts);
		if(purchaseAttempts && purchaseAttempts.length){
			purchaseAttempts = purchaseAttempts.filter(({attemptDate}) => {
				return !(attemptDate && moment(now).diff(attemptDate, "hours") >= hours)
			});
			await AsyncStorage.setItem('purchaseAttempts', JSON.stringify(purchaseAttempts));
		}

		// console.log("clear store")
		// await AsyncStorage.removeItem("lastIosReceipe",null);
		// AsyncStorage.setItem('purchaseAttempts', JSON.stringify([]));
		/*
		RNIap.flushFailedPurchasesCachedAsPendingAndroid().catch((e) => {
			console.error("flushFailedPurchasesCachedAsPendingAndroid ERROR ",e);
			// exception can happen here if:
			// - there are pending purchases that are still pending (we can't consume a pending purchase)
			// in any case, you might not want to do anything special with the error
		}).then(() => {
			console.log("flushFailedPurchasesCachedAsPendingAndroid SUCCESS")
		})
		*/
	}

	checkExpiredPlans = async ()=>{
		const {me} = this.props;
		// console.log("checkExpiredPlans ",this.props);
		if(me){
			// console.log("checkExpiredPlans ",me.purchasedItems);
		}
	}
	checkIosReceipt = async ()=>{
		const {dispatch} = this.props;
		// console.log("checkIosReceipt")
		let lastIosReceipe = await AsyncStorage.getItem("lastIosReceipe");
		if(!lastIosReceipe){
			// console.log("checkIosReceipt no oldRecipe");
			return;
		}
		// console.log("lastIosReceipe => ",lastIosReceipe.substring(0,20))
		let iosReceipt = await RNIap.getReceiptIOS();
		// console.log("new iosReceipt ",iosReceipt.substring(0,20));

		if(!iosReceipt){
			console.log("checkIosReceipt NO new ios receipe")
		}else if(iosReceipt !== lastIosReceipe){
			// console.log("iosReceipt !== lastIosReceipe");
			// console.log("iosReceipt => ",iosReceipt);
			// console.log("lastIosReceipe => ",lastIosReceipe);
			let data = await RNIap.validateReceiptIos({
				'receipt-data':iosReceipt
			},true);
			// console.log("new data ",data);
			let oldData = await RNIap.validateReceiptIos({
				'receipt-data':lastIosReceipe
			},true);
			// console.log("old data ",oldData);

			// console.log("notify backend with recipe change")
			let notifyResult = await dispatch(notifyRecipe(iosReceipt,"apple"));
			// console.log("notifyResult => ",notifyResult);
			if(notifyResult && notifyResult.status == "ok"){
				AsyncStorage.setItem("lastIosReceipe",iosReceipt);
			}
		}else{
			// console.log("checkIosReceipt Recipe ok")
			let data = await RNIap.validateReceiptIos({
				'receipt-data':iosReceipt
			},true);
			// console.log("data ",data);
		}
	}
	createPurchaseListner = async () => {
		// console.log("createPurchaseListner");

		this.clearOldPurchaseAttempts();
		this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
			try{
				await RNIap.initConnection();
				const {publish} = this.context;
				// console.log('purchaseUpdatedListener', purchase);
				const {dispatch} = this.props;
				const receipt = purchase.transactionReceipt;
				let gateway = Platform.OS === "ios" ? "apple" : "google";
				let purchaseAttempts = await AsyncStorage.getItem('purchaseAttempts');
				purchaseAttempts = JSON.parse(purchaseAttempts)
				// console.log("PURCHASE ATTEMPTS", purchaseAttempts)
				const purchase_index = purchaseAttempts.findIndex(( pa) => {
					// console.log("fin index purchase attempts ",pa)
					return pa.productId === purchase.productId
				})
				let product;			
				let purchaseItem;
				if (purchase_index !== -1){
					purchaseItem = purchaseAttempts[purchase_index]
				}

				// console.log("purchaseItem => ",purchaseItem);
				if(!purchaseItem){
					console.log("no purchaseItem");
					return;
				}else{
					console.log("got purchase item");
				}
				// console.log("PURCHASE ID => ",purchaseItem.productId);
				const products = await RNIap.getProducts([purchaseItem.productId]);
				// console.log("products => ",products);

				const subscriptions = await RNIap.getSubscriptions([purchaseItem.productId]);
				// console.log("subscriptions => ",subscriptions);

				if (receipt && purchaseItem) {
					if (purchaseItem.type === "plan") {
						let offerBuyResult = await dispatch(buyPlan({
							plan_id: purchaseItem.offer_id,
							gateway,
							purchase,
							product:purchaseItem,
							productId: purchaseItem.productId
						}));
						
						// console.log("OFFER BUY RESULT", offerBuyResult);
	
						if (
							offerBuyResult
							&& (offerBuyResult.status === "ok" || offerBuyResult.code == "ALREADY_PURCHASED")
						) {				
							try{
								// console.log("going to finish transactiob purchase ====> ",purchase,"<<<<")
								await RNIap.finishTransaction(purchase);
								// console.log("transaction finished ")
	
								purchaseAttempts.splice(purchase_index, 1)
								// console.log("sliced ")
	
							}catch(e){
								console.error("error finish transaction ",e)
								// console.error("error finish transaction ",e.message)
								// console.error("error finish transaction ",e.code)
								return;
							}
							
							//Subscription finished - save recipe
							if(subscriptions && subscriptions.length){
								let activeSubscriptions = [];
								activeSubscriptions = await AsyncStorage.getItem('activeSubscriptions');
								// console.log("activeSubscriptions 1 ",activeSubscriptions);
								try{
									activeSubscriptions = JSON.parse(activeSubscriptions)
								}catch(e){
									activeSubscriptions = [];
								}
								if(!activeSubscriptions){
									activeSubscriptions = [];
								}
								let activeSubIndex = activeSubscriptions.findIndex((as)=>{
									if(as && as.productId == purchase.productId){
										// console.log("FOUND AS ",as.productId)
										return as;
									}else{
										console.log("BAD AS ",as.productId);
									}
								})
								if(activeSubIndex !== -1 && activeSubscriptions[activeSubIndex]){
									// console.log("Changed as")
	
									activeSubscriptions[activeSubIndex] = purchase;
								}else{
									activeSubscriptions.push(purchase);
								}
								// console.log("activeSubscriptions 2 ",activeSubscriptions);
								await AsyncStorage.setItem('activeSubscriptions',JSON.stringify(activeSubscriptions));
								await AsyncStorage.setItem('lastIosReceipe',purchase.transactionReceipt);
							}
							
							// console.log("publish purchaseFinished")
							publish("purchaseFinished", {product:purchaseItem});
							// console.log("PURCHASE SUCCESSFUL PURCHASE="+JSON.stringify(purchase)+"  MID="+purchaseItem.item_id);
						} else {
							// Retry / conclude the purchase is fraudulent, etc...
							//TODO: remove
						}
					} else if (purchaseItem.type === "coin"){
						// coin-purchase-finish
						try{
							// console.log("going to finish transactiob coins ====> ",purchase,"<<<<")
							await RNIap.finishTransaction(purchase);
							// console.log("transaction finished ")
						}catch(e){
							console.error("error finish transaction ",e)
							// console.error("error finish transaction ",e.message)
							// console.error("error finish transaction ",e.code)
							return;
						}
						purchaseAttempts.splice(purchase_index, 1)
	                    const coinsBuyResult = await dispatch(purchaseCoins({ gateway, purchase, productId: purchaseItem.productId}));
						// console.log("Coins buy result", coinsBuyResult);
						if(coinsBuyResult.status === "ok") {
							publish("coinPurchaseFinish", {product:purchaseItem});
						}
						// console.log("PURCHASE COINS SUCCESSFUL PURCHASE="+JSON.stringify(purchase)+"  MID="+purchaseItem.item_id);
					}
					
					// console.log("REMOVE ITEM", purchaseAttempts);

					await AsyncStorage.setItem('purchaseAttempts', JSON.stringify(purchaseAttempts));

					try{
						await dispatch(getMe());
					}catch(e){
						console.log("error getting me... ",e);
					}
				} 
			}catch(e){
				console.error("error in purchaseUpdateSubscription ",e);
			}
		})

		this.purchaseErrorSubscription = !this.props.isCustomApp 
			?	null
			:	RNIap.purchaseErrorListener((error) => {
					// patch for androids w/o play services
					if(error.responseCode === 3) {
						alert('Without google play services some functions are not available (in app purchase etc.)')
						this.purchaseUpdateSubscription.remove();
      					this.purchaseUpdateSubscription = null;
						this.purchaseErrorSubscription.remove();
      					this.purchaseErrorSubscription = null;
						return
					}
					//
					console.warn('purchaseErrorListener', error);
					if (!RNIap || !RNIap.flushFailedPurchasesCachedAsPendingAndroid) return
					RNIap.flushFailedPurchasesCachedAsPendingAndroid().catch((e) => {
						console.error("flushFailedPurchasesCachedAsPendingAndroid ERROR ",e);
						// exception can happen here if:
						// - there are pending purchases that are still pending (we can't consume a pending purchase)
						// in any case, you might not want to do anything special with the error
					}).then(() => {
						console.log("flushFailedPurchasesCachedAsPendingAndroid SUCCESS")
					})
				
					//Return if you're getting you already own this error in debug mode
					/*
					RNIap.consumeAllItemsAndroid().then((p)=>{
						console.log("consumeAllItemsAndroid success ",p)
					}).catch((e) => {
						console.log("consumeAllItemsAndroid ERROR ",e);
					})
					*/
		});
	}

	_handleNotification = ({ notification }) => {
		const { payload } = notification
		// console.log("NOTIFICATION", notification)
		if (payload) {
			console.log("NOTIFICATION PAYLOAD", payload)
			const { additionalData } = payload
			if (additionalData && additionalData.type && additionalData._id) {
				// console.log("NOTIFICATION additionalData", additionalData)
				if (additionalData.type === "message") {
					// console.log("resetting to tabbar");
					Actions.reset("tabbar")
					Actions.jump("chat", { _id: additionalData._id })
				}
			}
		}
	}

	transitionConfig = (currentState) => {
		const currentScene = currentState.scenes[
			currentState.scenes.length - 1
		].route.routeName;
		let config;
		if (currentScene === "fullscreenVideo"){
			config = zoomIn(300);
		} else {
			config = fromRight(300)
		}
		// console.log("transitionConfig", fromRightAnimation, zoomInAnimation)
		return config
	}

	render() {
		const { influencer, toggleTheme, setDefaultTheme } = this.props
		const supportedModules = ["courses", "chats", "articles", "marathons", "nutrition"]
		const availableModules = []
		if (influencer && influencer.editableModules && influencer.editableModules) {
			supportedModules.forEach(module => {
				if (influencer.editableModules.indexOf(module) !== -1) {
					availableModules.push(module)
					// console.log('module', availableModules)
				}
			})
		}
		// console.log("Config theme", config.theme)
		return (
			<TouchableWithoutFeedback
				onPress={() => {
					console.log("clicked")
				}}>
				<Fragment>
					{/* <StatusBar backgroundColor='blue' barStyle='light-content' /> */}
					<BuyPlanModal />
					<AnimationOverlay />
					<StatusBar 
						translucent
						backgroundColor = "transparent"
						barStyle={config.theme === "light" ? "dark-content" : "light-content"} 
					/>
					<Router backAndroidHandler={this.handleBackButton}>
						<Stack
							key='root'
							headerMode='none'
							transitionConfig={this.transitionConfig}
						>
							<Scene key="entryOptions" component={EntryOptions}/>
							<Scene
								key="entryCode"
								component={(sceneProps) => (
									<EntryCode
										toggleTheme={toggleTheme}
										{...sceneProps}
									/>
								)}
							/>
							<Scene
								key="entryQR"
								component={(sceneProps) => (
									<EntryQR
										toggleTheme={toggleTheme}
										{...sceneProps}
									/>
								)}
							/>
							<Scene
								key='influencer'
								component={(sceneProps) => (
									<InfluencerSearch
										toggleTheme={toggleTheme}
										{...sceneProps}
									/>
								)}
							/>
							<Scene
								key='influencerSelect'
								component={(sceneProps) => (
									<InfluencerSelect
										toggleTheme={toggleTheme}
										{...sceneProps}
									/>
								)}
							/>
							<Scene key='intro' component={Intro} />
							<Scene key='welcomeVideo' component={WelcomeVideo} />
							<Scene key='plansModal' component={BuyPlanModal} />
							<Tabs
								key='tabbar'
								// tabBarStyle={NavigationStyles["bottom-navigation-rectangle"]}
								// tabStyle={NavigationStyles["bottom-navigation__tab"]}
								// labelStyle={NavigationStyles["bottom-navigation__tab-text"]}
								tabBarComponent={CustomTabs}
								showLabel={false}>
								<Stack
									initial
									icon={TabBarIcon}
									iconName='ion-reader-outline'
									key='courses_tab'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='courses' initial component={Courses} />
									<Scene key='chapter' component={Chapter} />
									<Scene key='lessons' component={Lessons} />
									<Scene
										key='lesson'
										component={sceneProps => (
											<MarathonSingleTraining
												{...sceneProps}
												courseType={"course"}
											/>
										)}
									/>
									<Scene key='training' component={SingleVideoTraining} />
									<Scene key='trainings' component={Trainings} />
									<Scene
										key='trainingFinish'
										component={sceneProps => (
											<TrainingFinish {...sceneProps} module={"course"} />
										)}
									/>
									<Scene
										key='nutritionMenuSingle'
										inital
										component={NutritionMenuSingle}
									/>
									<Scene
										key='nutritionRecipeSingle'
										inital
										component={NutritionRecipeSingle}
									/>
									<Scene key='article' component={Article} />
									<Scene key='quiz' component={Quiz} />
									<Scene key='quizFinish' component={QuizFinish} />
									<Scene key='buyCourse' component={BuyCourse} />
									<Scene key='offers' component={Offers} />
									<Scene key="offer" component={Offer} />
								</Stack>
								<Stack
									key='chats_tab'
									icon={TabBarIcon}
									iconName='ion-chatbubbles-outline'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='dialogs' initial component={Dialogs} />
									<Scene key='chat' component={Chat} />
									<Scene key='chatPrivate' component={ChatPrivate} />
								</Stack>
								<Stack
									key='articles_tab'
									icon={TabBarIcon}
									iconName='ion-newspaper-outline'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='articles' initial component={Articles} />
									<Scene key='article' component={Article} />
									<Scene
										key='nutritionMenuSingle'
										inital
										component={NutritionMenuSingle}
									/>
									<Scene
										key='nutritionRecipeSingle'
										inital
										component={NutritionRecipeSingle}
									/>
								</Stack>
								<Stack
									key='marathons_tab'
									icon={TabBarIcon}
									iconName='ion-trophy-outline'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='marathons' initial component={Marathons} />
									<Scene key='buyMarathon' component={BuyMarathon} />
									<Scene key='marathonMain' component={MarathonMain} />
									<Scene
										key='marathonSingle'
										component={sceneProps => (
											<MarathonSingleTraining
												{...sceneProps}
												courseType={"marathon"}
											/>
										)}
									/>
									<Scene
										key='quiz'
										component={sceneProps => (
											<Quiz {...sceneProps} module={"marathon"} />
										)}
									/>
									<Scene
										key='quizFinish'
										component={sceneProps => (
											<QuizFinish {...sceneProps} module={"marathon"} />
										)}
									/>
									<Scene key='trainings' component={Trainings} />
									<Scene key='training' component={SingleVideoTraining} />
									<Scene
										key='trainingFinish'
										component={sceneProps => (
											<TrainingFinish {...sceneProps} module={"marathon"} />
										)}
									/>
								</Stack>
								<Stack
									key='nutrition_tab'
									icon={TabBarIcon}
									iconName='ion-nutrition-outline'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='nutritionMain' component={NutritionMain} />
									<Scene
										key='nutritionMenuSingle'
										inital
										component={NutritionMenuSingle}
									/>
									<Scene
										key='nutritionRecipeSingle'
										inital
										component={NutritionRecipeSingle}
									/>
								</Stack>
								<Stack
									key='offers_tab'
									icon={TabBarIcon}
									iconName='ion-flash-outline'
									transitionConfig={() => fromRight(300)}
								>
									<Scene key='offers' component={Offers} />
									<Scene key="offer" component={Offer} />
								</Stack>
							</Tabs>
							<Scene key='report' component={ProblemReport} />
							<Scene key='supportChat' component={SupportChat} />
							<Scene key='changePassword' component={ChangePassword} />
							<Scene key='about' component={About} />
							<Scene key='notification' component={Notification} />
							{this.props.isCustomApp && <Scene key='pricingPlan' component={PricingPlan} />}
							{this.props.isCustomApp && <Scene key='guruCoins' component={GuruCoins} />}
							<Scene
								key='settings'
								component={(sceneProps) => (
									<Settings
										setDefaultTheme={setDefaultTheme}
										{...sceneProps}
									/>
								)}
							/>
							<Scene
								key='fullscreenVideo'
								component={FullscreenVideo}
								gesturesEnabled={false}
							/>		
						</Stack>
					</Router>
				</Fragment>
			</TouchableWithoutFeedback>
		)
	}
}

export default connect(({ isCustomApp }) => ({ isCustomApp }))(Root)
