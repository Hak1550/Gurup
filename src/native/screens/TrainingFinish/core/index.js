import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import styles from "../styles";
import Button from "../../../components/Button";
import Logic from "../logic";
import { paletteNumber } from "../../../styles/variables";
import MainLayout from "../../../components/MainLayout";
import checked from '../../../assets/core/animations/checked';
import LottieView from 'lottie-react-native'

class TrainingFinish extends Component {
	trainingDoneImageForTemplate = () => {
		// console.log(paletteNumber);
		const trainingDoneImage1 = require("../../../assets/core/training-done-tmp1.png");
		const trainingDoneImage2 = require("../../../assets/core/training-done-tmp2.png");
		const trainingDoneImage3 = require("../../../assets/core/training-done-tmp3.png");
		switch (paletteNumber) {
			case 0:
				return trainingDoneImage1;
			case 1:
				return trainingDoneImage2;
			case 2:
				return trainingDoneImage3;
		}
	};

	render() {
		const { goToNextLesson, t, exercise } = this.props;
		// console.log("MARATHON", exercise)
		return (
			<MainLayout getAvatar={false}>
				<View style={styles["marathon-finish__container"]}>
					<View style={styles["marathon-finish__content"]}>
						<Text style={styles["marathon-finish__title"]}>
							{exercise.title}
						</Text>

						<LottieView
							style={styles["marathon-finish__icon"]}
							autoPlay
							loop={false}
							duration={1000}
							ref={(animationRef) => {
								this.animationRef = animationRef
							}}
							source={checked}
						/>

						<Text style={styles["marathon-finish__text"]}>
							{t("app_courses:training_finished")}
						</Text>
						<Button
							title={t("app_courses:finish_training")}
							theme='accent'
							onPress={() => {
								goToNextLesson();
							}}
						/>
					</View>
				</View>
			</MainLayout>
		);
	}
}

export default Logic(TrainingFinish);
