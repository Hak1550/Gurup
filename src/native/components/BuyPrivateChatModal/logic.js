import React from "react"
import { connect } from "react-redux"
import { withNamespaces } from "react-i18next"
import { compose } from "redux"
import {getPaymentConfig} from "../../../actions/plans";
import { purchaseChat } from '../../../actions/chat'
import * as RNIap from "react-native-iap";
import {Platform} from 'react-native';
import { Actions } from "react-native-router-flux"

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			isDateTimePickerVisible: false,
			product:{},
			isLoading: false
		};

		showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

		hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

		handleDatePicked = date => {
			// console.log("A date has been picked: ", date);
			this.hideDateTimePicker();
		};

		render() {
			return <WrappedComponent
				state={this.state}
				hideDateTimePicker={this.hideDateTimePicker}
				showDateTimePicker={this.showDateTimePicker}
				handleDatePicked={this.handleDatePicked}
				{...this.props}
				buttonAction={async ()=>{
					if(this.state.isLoading){
						return;
					}
					this.setState({
						isLoading:true
					})


					let { influencer, dispatch, toggleModal, t} = this.props;
					// console.log("go RNIap");
					let isConnected = await RNIap.initConnection();
					// console.log("isConnected ",isConnected);
					
					// console.log("buttonAction  => ",influencer.privateChatProductId)

					// console.log("go ",getPaymentConfig);


					if (influencer.coinsEnabled){
						// console.log("coinsEnabled gooo");

						// let purchaseChatResult = await dispatch(purchaseChat({}));
						// console.log("purchaseChatResult ",purchaseChatResult);
						if (! purchaseChatResult || purchaseChatResult.status!=="ok"){
							// console.log("close modal");
							toggleModal();
							setTimeout(()=>{
								dispatch({
									type: "PLANS_MODAL_OPEN"
								})

							},1000)
							
						}else{
							let { chat } = purchaseChatResult;
							// console.log("got chat!!!!");
							if (chat) {
								toggleModal();
								Actions.chatPrivate({ _id: chat._id, dialogName: chat.title })
								if (gateway === "google") {
									await RNIap.consumePurchase(platformProductId);
								}
							}
							
						}
						this.setState({
							isLoading: false
						})

					}else{
						const {config} = await dispatch(getPaymentConfig());
						const product = config.find((p)=>{
							if(p.id == influencer.privateChatProductId){
								return p;
							}
						});
						// console.log("product ",product)
						if(!product){
							// console.log("No product found....");
							return;
						}

						let platformProductId = Platform.select({
							ios:product.ios_id,
							android:product.android_id
						})

						// console.log("platformProductId ",platformProductId);
						let allProducts = await RNIap.getProducts(
							[platformProductId]
						);
						// console.log("allProducts ",allProducts);
						try {
							// console.log("going to buy a chat ", platformProductId);
							const purchase = await RNIap.buyProduct(platformProductId);
							// console.log("purchase ", purchase);

							let { chat } = await dispatch(purchaseChat({
								gateway,
								purchase,
								productId: platformProductId
								// product
							}));
							if (chat) {
								toggleModal();
								Actions.chatPrivate({ _id: chat._id, dialogName: chat.title })
								if (gateway === "google") {
									await RNIap.consumePurchase(platformProductId);
								}

							}
							this.setState({
								isLoading: false
							})

						} catch (e) {
							console.error("purchase error ", e);
							this.setState({
								isLoading: false
							})
						}

					}
					// this.props.buttonAction();
				}}
			/>
		}
	}
	return compose(
		withNamespaces("app_chats","app_courses", { wait: true }),
		connect(({ tags, influencer }) => ({ tags, influencer }))
	)(Logic)
}
