import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { Helmet } from "react-helmet"
import {compose} from 'redux'
import { withNamespaces } from 'react-i18next'

export default (branch, translationNamespace) => WrappedComponent => {

	// branch, принимает функцию чтобы подключиться к ветке через connect
	// Например надо взять название и описание курса
	// ({course} => ({title: course.title, description: course.fullDescription}))

	// translationNamespace принимает namepsace например ['courses']
	// Например: надо получить перевод заголовка Курсов
	// withHelmet(branch: ({course} => ({title: 'courses:courses_heading'}), translationNamespace: ['courses']])

	class withHelmet extends Component {
		render() {
			let {t, title, description} = this.props;

			return (
				<Fragment>
					<Helmet>
						<title>{t(title)}</title>
						<meta name="description" content={t(description)}/>
					</Helmet>
					<WrappedComponent { ...this.props }/>
				</Fragment>
			)
		}
	}

	return compose(
		withNamespaces(translationNamespace),
		connect(branch)
	)(withHelmet)
}
