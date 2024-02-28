import React from "react"
import { ExerciseCount } from "../styles"
import PropsTypes from 'prop-types'
import { compose } from "redux";
import { withNamespaces } from "react-i18next";

const ExerciseNavigation = ({ index, exerciseLength, exerciseType, t }) => {
	// return (
	// 	<ExerciseCount>
	// 		{t("exercise_navigation", { current: index, total: exerciseLength, extype: exerciseType })}
	// 	</ExerciseCount>
	// )
	return (
		<ExerciseCount>{exerciseType} {index + 1} {t("basic:of")} {exerciseLength}</ExerciseCount>
	)
}

ExerciseNavigation.propTypes = {
	exerciseType: PropsTypes.string.isRequired,
	exerciseLength: PropsTypes.number.isRequired,
	index: PropsTypes.number.isRequired
}

export default compose(
	withNamespaces("basic")
)(ExerciseNavigation)
