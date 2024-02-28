import React from "react"
import { View, Text, Image } from "react-native"
import styles from "../styles"
import ScreenTitle from "../../../components/ScreenTitle"
import NStatusBar from "../../../components/Statusbar"
import { gradients } from "../../../styles/variables"
// import * as LinearGradient from "expo-linear-gradient";
import {LinearGradient} from "expo-linear-gradient";
import Logic from "../logic"
import checked from '../../../assets/core/animations/checked';
import error from '../../../assets/core/animations/error';

import LottieView from 'lottie-react-native'

const QuizFinish = ({ quiz, exercise, isSuccess, buttons, t }) => {
	let total = 0;
	// isSuccess = true
	if(exercise && exercise.blocks && exercise.blocks.length){
		total = exercise.blocks.length
	}
	return (
		<View style={styles["test-finish"]}>
			<Text style={styles["test-finish__title"]}>{exercise.title}</Text>
			<View style={styles["test-finish__icon"]}>
				<LottieView
					style={isSuccess ? styles["test-finish__icon_success"] : styles["test-finish__icon_fail"]}
					autoPlay
					loop={false}
					duration={1000}
					source={isSuccess ? checked : error}
				/>
			</View>
			<Text style={styles["test-finish__answers"]}>{`${quiz.score}/${total} ${t("app_quiz:correct")}`}</Text>
			<Text style={styles["test-finish__result"]}>{isSuccess ? t("app_quiz:quiz_finish_text") : t("app_quiz:quiz_failed_text")}</Text>
			<View style={styles["test-finish__button"]}>
				{buttons(isSuccess)}
			</View>
		</View>
	)
}

export default Logic(QuizFinish)
