import React, {Component, Fragment} from "react";
import { BrowserRouter as Router, Route,Redirect, Link, Switch, NavLink} from "react-router-dom";

import {dashboardRoutes} from "routes";

import Logic from "../logic";

import {Container,Dashboard,Sidebar,Menu,Item,MainLink,SubMenu,SubItem,SubLink,ContentWrap,Content,Footer,
    FooterWrap,Icon,Info,InfoList,InfoItem,Visa,Mastercard,
} from '../styles'

export default Logic(({
    t
})=>{
    const info = [
        [
            {label: "Столкнулись с трудностями?", to: "/help"},
            {label: "Политика конфиденциальности", href: t("basic:policy_url")},
            {label: "Условия пользования", href: t("basic:terms_url")}
        ],
    ];
    return (
        <ContentWrap>
            <Content className={!sidebar ? "big" : ""}>
                <Switch>
                    {dashboardRoutes.map((route, i) => (
                        route.redirect ? <Redirect key={i} {...route} /> : <Route {...route} key={i}/>
                    ))}
                </Switch>
            </Content>
            <Footer>
                <Container className={!sidebar ? "big" : ""}>
                    <FooterWrap>
                        <Info>
                            {info.map((list, i)=>
                                <InfoList key={i}>
                                    {list.map((link,i)=>
                                        <InfoItem key={i}>
                                            {link.to ? (
                                                <Link to={link.to}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a target="_blank" href={link.href}>
                                                    {link.label}
                                                </a>
                                            )}
                                        </InfoItem>
                                    )}
                                </InfoList>
                            )}
                        </Info>
                        <Visa/>
                        <Mastercard/>
                    </FooterWrap>
                </Container>
            </Footer>
        </ContentWrap>
    )
});

const menu = [
    {label: "Курсы", to: "/courses", pages: [
        {name: "Онлайн курсы", to: "/courses/online"},
        {name: "Онлайн курсы Pro", to: "/courses/online/pro"},
    ]},
    {label: "Чаты", to: "/chats"},
    {label: "Марафон", to: "/challenges"},
    {label: "Питание", to: "/nutrition", pages: [
        {name: "Меню", to: "/nutrition/menu"},
        {name: "Рецепты", to: "/nutrition/recipes"},
    ]},
    {label: "Статьи", to: "/articles"},
    {label: "Настройки", to: "/settings"},
]
