import React, { Component, Fragment } from "react"
import SignLayout from "containers/Sign";
import {compose} from "redux";
import Input,{InputAdapter} from "components/Input";
import Logic from "../logic"
import { Form, Field } from 'react-final-form'
import Button from "components/Button"
import Sign from "components/Sign"
import {Title, SubTitle} from 'components/Sign/styles';


const ForgotPassword = ({t}) => (
        <Sign activeTab="forgotpassword">
            <Title>{t("forgot_pass_title")}</Title>
            <SubTitle>{t("forgot_pass_subtitle")}</SubTitle>
        </Sign>
);

export default compose(Logic, SignLayout)(ForgotPassword);
