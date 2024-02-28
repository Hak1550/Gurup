import React from "react"
import { connect } from "react-redux"
import { getCourses } from "actions/courses"
import { getArticles } from "actions/articles"
import { compose } from "redux"
import multipleLoading from "hocs/multipleLoading"
import { findCoursesInProgress } from "utils/gurucan-helpers"
import { withTheme } from "styled-components"
import withHelmet from "hocs/withHelmet"
import { withNamespaces } from "react-i18next";

export default WrappedComponent => {
	class Logic extends React.Component {
		componentDidMount() {
			const { dispatch, courses, articles, influencer } = this.props
			console.log("articles", !articles, !articles.length)
			if (!courses || !courses.length) dispatch(getCourses())
			dispatch(getArticles({ limit: influencer.web__dashboardArticleLimit }))
		}

		startedCourses = () => {
			// Логика продолжения курса с последнего урока
			const { courses, purchasedCourses, loading } = this.props
			let filteredCourses = []
			if (!loading.courses) {
				const courseInProgress = findCoursesInProgress(courses, purchasedCourses)
				courseInProgress.map(course => {
					if (course.exercisesAvailableWithoutProgress) {
						// Если уроки в курсе можно проходить в любом порядке, то просто возвращаем курс
						filteredCourses.push(course)
					} else {
						// Если уроки в курсе надо проходить по порядку, то необходимо вернуть id
						// последнего урока

						// Находим курс среди купленных
						const courseInPurchasedIndex = purchasedCourses.findIndex(pcur => pcur.course === course._id)
						const purchCourse = purchasedCourses[courseInPurchasedIndex]

						// Получаем длину массива законченных уроков, чтобы получить последний урок, который не был завершен
						const aexLength = purchasedCourses[courseInPurchasedIndex].activeExercises.length

						// Находим урок этот последний урок в курсе, чтобы получить тип урока и возможность сформировать
						// правильную ссылку
						const lastExerciseType = course.exercises.findIndex(
							ex => ex._id === purchCourse.activeExercises[aexLength - 1].exerciseId
						)

						// Возвращаем обьект курса, с данными о последнем уроке. Его id и type
						filteredCourses.push({
							...course,
							lastExercise: {
								_id: purchCourse.activeExercises[aexLength - 1].exerciseId,
								type: course.exercises[lastExerciseType].type,
							},
						})
					}
				})
			}
			return filteredCourses
		}

		render() {
			return <WrappedComponent startedCourses={this.startedCourses} {...this.props} />
		}
	}
	return compose(
		multipleLoading({
			branches: ["courses", "articles", "purchasedCourses"],
		}),
		withHelmet(({ influencer }) => ({
			title: influencer.appName,
			description: influencer.app__welcomeDescription,
		})),
		withTheme,
		withNamespaces(["basic", "web_welcome"]),
		connect(({ courses, articles, purchasedCourses, influencer }) => ({
			courses,
			articles,
			purchasedCourses,
			influencer,
		}))
	)(Logic)
}
