import React from "react"
import { Link, Redirect, Route, Switch } from "react-router-dom"
import { isAuthorized } from "hocs/checkAuth"

import { dashboardRoutes } from "routes"

import Logic from "../logic"

import _ from 'underscore';
import Footer from "components/Footer";
import Header from "components/Header";

import {
	Container,
	Content,
	ContentWrap,
	Dashboard,
	// Footer,
	FooterWrap,
	Info,
	InfoItem,
	InfoList,
	Item,
	MainLink,
	Mastercard,
	Menu,
	Sidebar,
	SubItem,
	SubLink,
	SubMenu,
	Visa,
} from "../styles"

export default Logic(({ me, influencer, t, sidebar}) => {
	const modules = ["courses", "chats", "articles", "marathons", "nutrition", "settings"]
	const activeInfluencerModules = modules.filter(module => {
		const influencerModules = influencer.editableModules
		return influencerModules.includes(module)
	})
	return (
		<Dashboard>
			<Header />
			{isAuthorized() && sidebar ? (
				<Sidebar>
					<Menu>
						{menu.map((item, i) => {
							if (activeInfluencerModules.includes(item.id) || item.id === 'settings') {
								return (
									<Item key={i}>
										<MainLink activeClassName='active' to={item.to}>
											{influencer[item.field] || t(item.label)}
										</MainLink>
										{item.pages && (
											<SubMenu>
												{item.pages.map((page, i) => (
													<SubItem key={i}>
														<SubLink exact={true} activeClassName='active' to={page.to}>
															{t(page.name)}
														</SubLink>
													</SubItem>
												))}
											</SubMenu>
										)}
									</Item>
								)
							}
						})}
					</Menu>
				</Sidebar>
			) : null}
			<ContentWrap className={sidebar && isAuthorized() ? "with-sidebar" : ""}>
				<Content>
					<Switch>
						{_.map(dashboardRoutes, _.clone).map((route, i) => {
                            let PublicPage = route.publicPage;
							if (!isAuthorized()) {
								if (PublicPage) {
									if (route.props) {
										route.render = (props) => <PublicPage {...props} {...route.props}/>
									} else {
										route.component = PublicPage
									}
								} else {
									{/* console.log("REDIRECT IN ROUTER", route); */}
									{/* history.push("/login"); */}
									route.redirect = true
									route.to = "/login"
								}
							} else {
								if (influencer.useEmailValidation && me.status === "not_validated" && !route.ignoreValidate) {
									{/* route.component = checkValidation(route.component); */}
									route.redirect = true
									route.to = "/not-validated"
								} else if (route.props && route.use) {
									let Page = route.use;
									route.render = (props) => <Page {...props} {...route.props}/>
								}
							}
							{/* console.log("route", route); */}
                            return (route.redirect ? <Redirect key={i} {...route} /> : <Route {...route} key={i}/>)
                        })}
					</Switch>
				</Content>
				<Footer/>
			</ContentWrap>
		</Dashboard>
	)
})

const menu = [
	{ label: "basic:Courses", to: "/courses", id: "courses", field: "app__menuCoursesText" },
	{ label: "basic:Challenges", to: "/challenges", id: "marathons", field: "app__menuMarathonText" },
	{
		label: "basic:Nutrition",
		to: "/nutrition",
		id: "nutrition",
		field: "app__menuNutritionText",
		pages: [{ name: "basic:Menu", to: "/nutrition/menu" }, { name: "basic:Recipes", to: "/nutrition/recipes" }],
	},
	{ label: "basic:Articles", to: "/articles", id: "articles", field: "app__menuArticlesText" },
	{ label: "basic:Chats", to: "/chats", id: "chats", field: "app__menuChatsText" },
	{ label: "basic:Settings", to: "/settings/user", id: "settings"}
]
