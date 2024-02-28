import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { withNamespaces } from 'react-i18next';
import { withTheme } from "styled-components"
import {buyPlan, cancelSubscription, getPlans} from 'actions/plans';

import {editMe} from 'actions/me'
import withHelmet from "hocs/withHelmet"

export default WrappedComponent => {
	class Logic extends Component {

		constructor(props) {
			super(props);
			this.state = {
				settings: {},
				showPassword: false,
				plan_id: ""
			};
			this.plans = React.createRef();
		}

		setPlan = () => {
			console.log("SET PLAN", this.plansRef);
			// if(this.plans.current)
			// 	this.plans.current.buyPlan();
			this.plansRef.buyPlan()
		};

		setPlansRef = (plans) => {
			this.plansRef = plans
		}

		cancelSubscription = () => {
			this.props.dispatch(cancelSubscription())
		}

		componentDidMount() {
			let {me} = this.props;
			this.setState({
				settings: me
			});
		};

		save = () => {
			const {dispatch, me} = this.props
			const {settings} = this.state
			const editableFields = ["name", "email", "avatar", "password"]
			let editedFields = {}
			editableFields.forEach((field) => {
				if (settings[field] && me[field] !== settings[field]) {
					editedFields[field] = settings[field]
				}
			})
			this.setState({
				showPassword: false,
				settings: {...settings, password: ""}
			})
			dispatch(editMe({user: editedFields}))
		}

		render() {
			let {state} = this;
			let {settings, showPassword} = state;
			return (
				<WrappedComponent
					{...this.props}
					state={state}
					setPlan={this.setPlan}
					plansRef={this.plans}
					setPlansRef={this.setPlansRef}
					inputOnChange={({ value, name }) => {
						this.setState({
							settings: { ...settings, [name]: value }
						})
					}}
					unsub={this.cancelSubscription}
					togglePassword={() => {
						this.setState({
							showPassword: !showPassword,
							settings: { ...settings, password: "" }
						})
					}}
					save={this.save}
				/>
			)
		}
	}

	return compose(
		withTheme,
		withHelmet(() => ({title: 'web_layout:settings_title'}), ['web_layout']),
		withNamespaces(["web_settings", "web_layout"]),
		connect(({ me, plans }) => ({ me, plans }))
	)(Logic)
};
