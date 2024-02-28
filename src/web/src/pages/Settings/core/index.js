import React, { Component, Fragment } from "react"
import Logic from "../logic"
import { Route,Redirect, Link, Switch, NavLink} from "react-router-dom";
import Header from "components/Header"
import FileUploader from 'components/FileUploader';
import Plans, {PlanCard} from 'components/Plans';

import {Wrapper, Save, Container, Button, NavBar, ChangePassword, ChangePasswordWrap, Unsub,
	Input, Title, NavItem, Content, InfoHeader, Avatar, Name} from '../styles'

const Settings = ({ state, inputOnChange, plansRef, avatarOnChange, save, togglePassword, setPlan, setPlansRef, me, unsub, t}) => {
	let {settings, showPassword} = state;
	let {email, name, password, avatar} = settings;
	return (
		<Fragment>
			<Header breadcrumbs={[{ label: t("web_layout:settings_title"), to: "/settings" }]} />
			<Container bodyWidth={100}>
				<Wrapper>
					<NavBar>
						<Title>{t("title")}</Title>
						{nav.map((item,i)=>
							<NavItem key={i} to={item.to} activeClassName="active">{t(item.text)}</NavItem>
						)}
					</NavBar>
					<Fragment>
	                    <Switch>
							<Route path="/settings/user" render={()=>
								<Content>
									<div>
										<InfoHeader>
											<FileUploader
												accept="image/*"
												name="avatar"
												onChange={inputOnChange}>
												<Avatar img={avatar}/>
											</FileUploader>
											<Name>{name}</Name>
										</InfoHeader>
										<Input onChange={inputOnChange} name="name" value={name} label={t("name_label")} placeholder={t("name_placeholder")}/>
										<Input onChange={inputOnChange} name="email" value={email} label={t("email_label")} placeholder={t("email_placeholder")}/>
										{showPassword ? (
											<Input type="password" cancel={togglePassword} onChange={inputOnChange}
												name="password" value={password} label={t("password_label")}
												placeholder={t("password_placeholder")}/>
										) : (
											<ChangePasswordWrap onClick={togglePassword}>
												<Button size="circle" theme="white"/>
												<ChangePassword>{t("change_password")}</ChangePassword>
											</ChangePasswordWrap>
										)}
									</div>
									<Save onClick={save}>{t("save")}</Save>
								</Content>
							}/>
							<Route path="/settings/plan" render={()=>
								<Content>
									<div>
										{me.plan ? (
											<Fragment>
												<Title>{t("plan_title")}</Title>
												<PlanCard plan={me.plan} active={true}/>
												<Unsub onClick={unsub}>{t("unsub")}</Unsub>
											</Fragment>
										) : (
											<Fragment>
												<Title>{t("plans_title")}</Title>
												<Plans setRef={setPlansRef} ref={plansRef}/>
											</Fragment>
										)}
									</div>
									{!me.plan && <Save onClick={setPlan}>{t("subscribe")}</Save>}
								</Content>
							}/>
	                    </Switch>
					</Fragment>
				</Wrapper>
			</Container>
		</Fragment>
	)
}

export default Logic(Settings)

const nav = [
	{to: "/settings/user", text: "nav_user"},
	{to: "/settings/plan", text: "nav_plan"}
	// {to: "/settings/notifications", text: "nav_notifications"},
	// {to: "/settings/help", text: "nav_help"},
];
