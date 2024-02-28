import React from "react"
import { connect } from "react-redux"
import { withNamespaces } from "react-i18next"
import { compose } from "redux"
import {getPaymentConfig} from "../../../actions/plans";
import { purchaseChat } from '../../../actions/chat'
import * as RNIap from "react-native-iap";
import {Platform} from 'react-native';
import { Actions } from "react-native-router-flux"
import {resetPassword} from "../../../actions/me";

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			isLoading: false,
			email: ""
		};
		onEmailChange = (e)=>{
			// console.log("e ",e);
			this.setState({
				email: e.value
			})
		}
		render() {
			return <WrappedComponent
				state={this.state}
				{...this.props}
				onEmailChange={this.onEmailChange}
				buttonAction={async ()=>{
					const {dispatch}  = this.props;
					// console.log("button catcion ",this.props.buttonAction)
					if(this.state.email && this.state.email.length > 3){
						const { status } = await dispatch(resetPassword({email:this.state.email})).then(()=>{
							// console.log("then");
							this.props.buttonAction();
						}).catch(()=>{
							// console.log("catch")
							this.props.buttonAction();
						})
					}
				}}
			/>
		}
	}
	return compose(
		withNamespaces("app_login", { wait: true }),
		connect(({ tags, influencer }) => ({ tags, influencer }))
	)(Logic)
}
