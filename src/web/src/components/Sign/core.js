import React, { Component, Fragment } from "react"
import { compose } from "redux";
import Input, { InputAdapter } from "components/Input";
import Logic from "./logic"
import { Form, Field } from 'react-final-form'
import Button from "components/Button"
import { Trans } from "react-i18next";
// import { SignForm, Title, SubTitle, FormRow, LinksContainer, SignLink } from 'components/SignForm';
import { Sign, Header, SignForm, FormRow, SignLink, PaymentMethods, Tab, Price, Tabs, Forgot, Socials, Submit, Conditions} from './styles';

const SignComponent = ({className, state, switchTab, buttonText, influencer, submit, t, validate, children}) => {
    let {activeTab} = state
    return (
        <Sign className={className}>
            {children}
            <Tabs>
                <Tab className={`${activeTab === "signup" ? "active" : ""}`} onClick={() => switchTab("signup")}>{t("signup_link")}</Tab>
                <Tab className={`${activeTab === "login" ? "active" : ""} right`} onClick={() => switchTab("login")}>{t("login_link")}</Tab>
            </Tabs>
            <Form
                validate={validate}
                onSubmit={submit}
                render={({ handleSubmit, submitting, pristine, values }) => (
                    <SignForm onSubmit={handleSubmit}>
                        <FormRow>
                            {activeTab === "signup" && (
                                <Field
                                    name="name"
                                    component={InputAdapter}
                                    shape="round"
                                    label={t("name_label")}
                                    withError
                                />
                            )}
                            <Field
                                name="email"
                                component={InputAdapter}
                                shape="round"
                                label={t("email_label")}
                                withError
                            />
                            {activeTab !== "forgotpassword" && (
                                <Field
                                    name="password"
                                    type="password"
                                    component={InputAdapter}
                                    shape="round"
                                    label={t("password_label")}
                                    withError
                                />
                            )}
                        </FormRow>
                        {activeTab === "login" && (
                            <Forgot type="button" onClick={() => switchTab("forgotpassword")}>{t("forgot_pass")}</Forgot>
                        )}
                        {/* <SocialsTitle>or</SocialsTitle>
                        <Socials>socials</Socials> */}
                        <Submit>{
                            activeTab === "forgotpassword" ? (
                                t("send")
                            ) : buttonText || t(activeTab + "_button")
                        }</Submit>
                        {influencer.privacyPolicy && influencer.termsOfUse && activeTab === "signup" ? (
                            <Conditions>
                                <Trans
                                    i18nKey={"basic:conditions"}
                                    components={[
                                        ...[<a style={{ textDecoration: "underline" }} target="_blank" href={influencer.termsOfUse}>termsOfUse</a>],
                                        ...[<a style={{ textDecoration: "underline" }} target="_blank" href={influencer.privacyPolicy}>privacyPolicy</a>],
                                        ...[<br/>]
                                    ]}
                                />
                            </Conditions>
                        ) : null}
                    </SignForm>
                )}
            />
        </Sign>
    )
};

export default compose(Logic)(SignComponent);
