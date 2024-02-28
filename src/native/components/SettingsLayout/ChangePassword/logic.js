import React from "react";
import { LayoutAnimation } from "react-native";
import { connect } from "react-redux";
import { changePassword } from "../../../../actions/me";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import {Actions} from "react-native-router-flux";
import * as Yup from "yup";

export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			password: "",
			confirmPassword: "",
			activeAccordion: false,
		};

		handleFieldChange = ({ name, value }) => {
			this.setState({ [name]: value });
		};

		validationSchema = Yup.object({
			current_password: Yup.string().required(this.props.t('errors:CURRENT_PASSWORD_REQUIRED')),
			new_password: Yup.string().required(this.props.t('errors:NEW_PASSWORD_REQUIRED')),
			repeat_password: Yup.string()
				.oneOf([Yup.ref('new_password'), null], this.props.t('errors:REPEAT_PASSWORD_MISMATCH'))
				.required(this.props.t('errors:REPEAT_NEW_PASSWORD'))
		})
		
		changePassword = async (values) => {
			const { new_password, current_password } = values;
			const { dispatch, t } = this.props
			// this.setState({ waitResponse: true })
			try {
				await dispatch(changePassword({ new_password, current_password }))
				dispatch({ type: 'ALERT', text: t('alerts:password_successfully_changed') })
				Actions.pop()
			} catch (error) {
				console.log("CATCH ERROR", error)
			}
		}

		toggleAccordion = () => {
			const CustomLayoutAnimation = {
				duration: 100,
				create: {
					type: LayoutAnimation.Types.linear,
					property: LayoutAnimation.Properties.opacity,
				},
				update: {
					type: LayoutAnimation.Types.linear,
				},
			};
			LayoutAnimation.configureNext(CustomLayoutAnimation);
			this.setState({ activeAccordion: !this.state.activeAccordion });
		};

		render() {
			return (
				<WrappedComponent
					state={this.state}
					handleFieldChange={this.handleFieldChange}
					changePassword={this.changePassword}
					toggleAccordion={this.toggleAccordion}
					validationSchema = {this.validationSchema}
					{...this.props}
				/>
			);
		}
	}

	return compose(
		withNamespaces(['errors','app_basic', 'basic', 'alerts']),
		connect(({ me }) => ({ me }))
	)(Logic);
};
