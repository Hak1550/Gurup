import React, { Fragment } from "react"
import { ExerciseResultCount, ExerciseFinishText, ExerciseFinishImage, ExerciseFinishContainer } from "./styles"
import { config } from "styles/variables"
import { withNamespaces } from "react-i18next"
import { compose } from 'redux'
import { withTheme } from "styled-components"

const ExerciseFinish = ({ title, descr, children, t }) => {
	return (
		<ExerciseFinishContainer>
			<ExerciseFinishImage
				src={config.appDomain ? require("assets/custom/cup.png") : require("assets/core/cup.png")}
			/>
			<ExerciseFinishText>{title ? title : t("well_done")}</ExerciseFinishText>
			<ExerciseFinishText>{descr ? descr : t("exercise_finished")}</ExerciseFinishText>
			{children}
		</ExerciseFinishContainer>
	)
}

export default compose(
	withTheme,
	withNamespaces(["web_exercises"])
)(ExerciseFinish)
