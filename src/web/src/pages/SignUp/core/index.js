import React, { Component, Fragment } from "react"
import SignLayout from "containers/Sign";
import {compose} from "redux";
import Sign from "components/Sign";
import Logic from "../logic"
import { Title, SubTitle } from 'components/Sign/styles';

const SignUp = ({t}) => (
    <Sign activeTab="signup">
        <Title>{t("signup_title")}</Title>
        <SubTitle>{t("signup_subtitle")}</SubTitle>
    </Sign>
);

export default compose(Logic, SignLayout)(SignUp);
