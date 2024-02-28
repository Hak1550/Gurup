import React, { Fragment } from "react"
import Card from "components/Card"
import Header from "components/Header"
import Logic from "../logic"
import { Redirect } from "react-router-dom"
import { CoursesContainer, CardDescription, CardTitle, CardBackground, CardPrice } from "../styles"
import ModulePlaceholder from "components/ModulePlaceholder"
import Container from "components/Container"
import getSymbolFromCurrency from 'currency-symbol-map'

const Courses = ({ courses, marathons, coursesType, loading, filter, state, t}) => {
	// courseType ставиться по умолчанию courses в логике на componentDidMount,
	// менять его можно в routes/index.js

	// Переменная чтобы мапать данные в зависимости от типа курса
	let data = courses

	// Это для HOC loading, т.к. в redux марафоны называться marathons
	let nameForLoading = "courses"

	if (coursesType === "challenges") {
		data = marathons
		nameForLoading = "marathons"
	}

	console.log('data courses', data)
	console.log('coursesType', coursesType)
	console.log('nameForLoading', nameForLoading)

	const isDataLoading = (
		<Fragment>
			<Card loading />
			<Card loading />
			<Card loading />
			<Card loading />
		</Fragment>
	)
	return (
		<Fragment>
			<Header filter={filter} breadcrumbs={[
				{ 
					label: coursesType === 'courses' ? t("basic:Courses") : t("basic:Challenges"), 
					to: coursesType === 'courses' ? "/courses" : "/challenges",  
				}
			]} />
			{!loading[nameForLoading] && !state.loading ? (
				data.length > 1 ? (
					<CoursesContainer>
						{data.map(({ _id, title, description, price, img, allowed, currency }) => {
							let imageProps = {}
							if(img) {
								imageProps.img = img
							} else {
								imageProps.img = require('assets/core/card-no-image.png')
								imageProps.resizeMode = 'contain'
							}
							return (
								<Card
									key={_id}
									link={`/${coursesType}/${_id}`}
									customHeader={() => (
										<CardBackground {...imageProps}>
											<CardTitle>{title}</CardTitle>
										</CardBackground>
									)}>
									<CardDescription>{description}</CardDescription>
									{!allowed && <CardPrice>{price ? `${price} ${getSymbolFromCurrency(currency)}` : t("basic:available_with_plan")}</CardPrice>}
								</Card>
							)
						})}
					</CoursesContainer>
				) : data.length === 1 ? (
					<Redirect to={`${coursesType}/${data[0]._id}`} />
				) : (
					<Container verticalCenter horizontalCenter>
						<ModulePlaceholder text={t(`web_basic:no_${coursesType}`)}/>
					</Container>
				)
			) : (
				<CoursesContainer>{isDataLoading}</CoursesContainer>
			)}
		</Fragment>
	)
}

export default Logic(Courses)
