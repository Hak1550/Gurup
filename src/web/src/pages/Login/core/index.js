import React, { Component, Fragment } from "react"
import SignLayout from "containers/Sign";
import {compose} from "redux";
import Input, { InputAdapter } from "components/Input";
import Sign from "components/Sign";
import Logic from "../logic"
import { Title, SubTitle } from 'components/Sign/styles';

const LoginPage = ({t}) => (
       <Sign activeTab="login">
              <Title>{t("login_title")}</Title>
              <SubTitle>{t("login_subtitle")}</SubTitle>
       </Sign>
);

export default compose(Logic, SignLayout)(LoginPage);
