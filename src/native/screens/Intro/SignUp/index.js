import React, { Component } from "react";
import { Text  } from "react-native";
import WelcomeLayout from "../../../components/WelcomeLayout";
import styles from "./styles";
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import {connect} from "react-redux";
import {config} from "../../../styles/variables";
import {withNamespaces} from "react-i18next";
import {compose} from "redux";
import { View } from "react-native-animatable";

const defaultRules = {
  numbers: /^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/,
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  required: /\S+/,
  date(format="YYYY-MM-DD", value) {
    const d = moment(value, format);
    if(d == null || !d.isValid()) return false;
    return true;
  },
  minlength(length, value) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your minlength settings.';
    } else if(value.length > length) {
      return true;
    }
    return false;
  },
  maxlength(length, value) {
    if (length === void(0)) {
      throw 'ERROR: It is not a valid length, checkout your maxlength settings.';
    } else if (value.length > length) {
      return false;
    }
    return true;
  }
};

class SignUp extends Component{
    render(){
      const { dimensions: { width, height }, welcomeScreen, t, influencer, ...rest} = this.props;
        let form, title;
        if(welcomeScreen.screen === 1) {
        	title = t('app_login:sign_up');
          form = <SignUpForm rules={defaultRules} influencer={influencer}/>
		} else if (welcomeScreen.screen === 2){
            title = t('app_login:sign_in');
          form = <SignInForm rules={defaultRules} influencer={influencer}/>
		}
        return (
			<WelcomeLayout withKeyboardAware style={{ width, height }} showBottomLinks={true} {...rest} title={config.appName}>
				<Text style={styles['signup__title']}>{title}</Text>
				{form}
			</WelcomeLayout>
		)
    }
}

export default compose(
    withNamespaces(['app_login'], {wait: true}),
    connect(({welcomeScreen, influencer})=>({welcomeScreen, influencer}))
)(SignUp)
