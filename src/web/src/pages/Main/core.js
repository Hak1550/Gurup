import React from "react"
import Skeleton from "react-loading-skeleton"
import { CardDescription, CardTitle, Grid, SectionContainer, SectionTitle } from "./styles"
import Header from "components/Header"
import Card from "components/Card"
import Logic from "./logic"
import SchoolDescription from "components/SchoolDescription"
import RichText from "components/ParseBlocks/Blocks/RichText"

const MainPage = ({ loading, articles, startedCourses, influencer, t }) => {
	// Скелетон для отображения загрузки
	const isDataLoading = (
		<SectionContainer>
			<Skeleton width={120} />
			<Grid>
				<Card loading />
				<Card loading />
				<Card loading />
			</Grid>
		</SectionContainer>
	)

	const courses = startedCourses()

	return (
		<div>
			<Header breadcrumbs={[{ label: t("basic:Welcome"), to: "/" }]} />

			{/* Описание школы */}
			<SectionContainer>
				<SchoolDescription
					banner={influencer.lp__banner}
					links={{
						socials: influencer.legal__socials
					}}>
					{influencer.logo && <SchoolDescription.Logo src={influencer.logo} />}
					{influencer.description && (
						<SchoolDescription.Title>{influencer.description}</SchoolDescription.Title>
					)}
					{influencer.fullDescription && (
						<RichText data={influencer.fullDescription} />
					)}
				</SchoolDescription>
			</SectionContainer>

			{/* Начатые курсы */}
			{!loading.courses
				? courses.length > 0 && (
						<SectionContainer>
							<SectionTitle>{t("web_welcome:started_courses")}</SectionTitle>
							<Grid>
								{courses.map(({ _id, title, description, img, lastExercise }) => {
									let link = `/courses/${_id}`
									if (lastExercise) {
										link = `/courses/${_id}/exercises/${lastExercise.type}/${lastExercise._id}`
									}
									return (
										<Card key={_id} link={link} img={img}>
											<CardTitle>{title}</CardTitle>
											<CardDescription>{description}</CardDescription>
										</Card>
									)
								})}
							</Grid>
						</SectionContainer>
				  )
				: isDataLoading}

			{/* Последние статьи */}
			{!loading.articles
				? articles.length > 0 && (
						<SectionContainer>
							<SectionTitle>{t("web_welcome:last_articles")}</SectionTitle>
							<Grid>
								{articles.map(({ _id, title, img }) => {
									return (
										<Card key={_id} link={`/articles/${_id}`} img={img}>
											<CardTitle>{title}</CardTitle>
										</Card>
									)
								})}
							</Grid>
						</SectionContainer>
				  )
				: isDataLoading}
		</div>
	)
}

export default Logic(MainPage)
