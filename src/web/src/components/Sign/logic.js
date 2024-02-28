import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { signIn, signUp } from "actions/sign";
import { resetPassword } from "actions/me";
import { withNamespaces } from "react-i18next";
import { email } from "utils/validator";
import { withRouter } from "react-router-dom";

export default WrapperComponent => {
    class Logic extends Component {
        
        state = {
            activeTab: this.props.activeTab || "signup"
        };

        handleChange = ({ name, value }) => {
            this.setState({ [name]: value });
        };

        submit = async (user) => {
            try {
                const { dispatch, history, afterSign } = this.props;
                let {activeTab} = this.state
                if (activeTab !== "forgotpassword") {
                    if (activeTab === "signup") {
                        await dispatch(signUp({ user, nocookie: false }));
                        
                    } else if (activeTab === "login") {
                        await dispatch(signIn({ user, nocookie: false }));
                    } 
                    if (afterSign) {
                        afterSign()
                    } else {
                        history.push("/")
                    }
                } else {
                    const data = await dispatch(resetPassword(user))
                    if (data && data.status === 'ok') {
                        this.switchTab("login")
                    } 
                }
            } catch (e) {
                console.error("Error during login", e);
            }
        };

        validate = (values) => {
            const { t } = this.props;
            let {activeTab} = this.state
            let errors = {};
            if (!values.name && activeTab === "signup") {
                errors.email = t("name_error");
            }
            if (!email(values.email)) {
                errors.email = t("email_error");
            }
            if (!values.password && activeTab !== "forgotpassword") {
                errors.password = t("password_error");
            }
            return errors;
        };

        switchTab = (activeTab) => {
            let { changeUrl=true, history } = this.props;
            this.setState({ activeTab })
            if (changeUrl) {
                history.push("/" + activeTab)
            }
        } 

        render() {
            
            return (
                <WrapperComponent
                    state={this.state}
                    validate={this.validate}
                    submit={this.submit}
                    handleChange={this.handleChange}
                    switchTab={this.switchTab}
                    {...this.props}
                />
            )
        }
    }

    return compose(
        withRouter,
        withNamespaces(["web_sign"]),
        connect(({ me, influencer }) => ({ me, influencer }))
    )(Logic)
};
