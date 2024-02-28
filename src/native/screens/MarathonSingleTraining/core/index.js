import React from "react";
import { View, Text, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import MainLayout from "../../../components/MainLayout";
import Article from "../../../components/ArticleLayout";
import styles from "../styles";
import Button from "../../../components/Button";
import ExerciseReport from "../../../components/ExerciseReport";
import Logic from "../logic";
import moment from "moment";
import Preloader from "../../../components/Preloader";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { isTall, Screen320 } from "../../../utils";
import { Actions } from "react-native-router-flux";

const MarathonSingleTraining = ({ exercise,navigation, state, isLastLesson, goToNextLesson, finishExercise, loading, isComplete, marathon, goToChat, me, t, ...props }) => {
	const exerciseToday = moment(exercise.startDate).isSame(moment(), "day");
	const {chapter} = navigation.state.params;

	const renderButton = () => {
		if(chapter){
			if(isComplete){
				if(!isLastLesson) {
					return (
						<Button
							title={t("app_basic:next_lesson")}
							loading={state.finishingExercise}
							onPress={() => {
								goToNextLesson();
							}}
							theme='accent'
						/>
					)
				} else {
					return (
						<Button
							title={t("app_basic:go_back_button")}
							onPress={Actions.pop}
							theme='accent'
						/>
					)
				}
			} else if (!exercise.reportRequired){
				const chapter_title = isLastLesson ? t("app_basic:finish_chapter") : t("app_basic:next_lesson");
				return (
					<Button
						title={chapter_title}
						loading={state.finishingExercise}
						onPress={() => {
							finishExercise();
						}}
						theme='accent'
					/>
				)
			} else {
				return null
			}
		} else {
			if(isComplete) {
				return (
					<Button
						title={t("app_basic:go_back_button")}
						onPress={Actions.pop}
						theme='accent'
					/>
				)
			} else if (!exercise.reportRequired){
				return (
					<Button
						title={chapter ? chapter_title : t("app_marathon:finish")}
						loading={state.finishingExercise}
						onPress={() => {
							finishExercise();
						}}
						theme='accent'
					/>
				)
			} else {
				return null
			}
		}

		// if (isComplete && isLastLesson) {
		// 	return (
		// 		<Button
		// 			title={t("app_basic:go_back_button")}
		// 			onPress={Actions.pop}
		// 			theme='accent'
		// 		/>
		// 	)
		// } else if (isComplete) {
		// 	return (
		// 		<Button
		// 			title={t("app_basic:next_lesson")}
		// 			onPress={goToNextLesson}
		// 			theme='accent'
		// 		/>
		// 	)
		// } else if(!exercise.reportRequired && isLastLesson){
		// 	return (
		// 		<Button
		// 			icon='check'
		// 			title={t("app_marathon:finish")}
		// 			loading={state.finishingExercise}
		// 			onPress={() => {
		// 				finishExercise();
		// 			}}
		// 			theme='accent'
		// 		/>
		// 	)
		// } else if (!exercise.reportRequired) {
		// 	return (
		// 		<Button
		// 			icon='check'
		// 			title={t("app_marathon:finish")}
		// 			loading={state.finishingExercise}
		// 			onPress={() => {
		// 				finishExercise();
		// 			}}
		// 			theme='accent'
		// 		/>
		// 	)
		// } else {
		// 	return null
		// }
	}
	return (
		<MainLayout screenTitle={exercise.title}>
			{loading && <Preloader />}
			{!loading && (
				<KeyboardAwareScrollView
					style={styles["marathon-single"]}
					contentContainerStyle={{ flexGrow: 1 }}
					extraScrollHeight={isTall() ? 10 : 0}
					keyboardShouldPersistTaps={'handled'}
					removeClippedSubviews
				>
					<View style={styles["marathon-single__content-container"]}>
						{exercise &&
							exercise.blocks &&
							exercise.blocks.map((block, key) => {
								return <Article currentScreenType="exercise" key={block._id} block={block} />;
							})}
					</View>
					<View>
						{/*{ !exercise.reportRequired && (*/}
						<View style={styles["marathon-single__buttons"]}>
							{marathon.chat && (
								<Button
									title={t("app_marathon:discuss_in_chat")}
									theme='white'
									onPress={() => {
										goToChat(marathon.chat);
									}}
								/>
							)}
							{renderButton()}
							{/* {isComplete ? (
									<Button
										title={t("app_basic:next_lesson")}
										onPress={goToNextLesson}
										theme='accent'
									/>
								) : (
									<Button
										icon='check'
										title={t("app_marathon:finish")}
										loading={state.finishingExercise}
										onPress={() => {
											finishExercise();
										}}
										theme='accent'
									/>
								)} */}
						</View>
						{/*)}*/}
						{ exercise.reportRequired ? (
							<ExerciseReport
								exercise={exercise}
								reportStatus={isComplete}
								chat={marathon.chat}
								me={me}
								courseType={props.courseType}
								goToChat={() => {
									goToChat(marathon.chat);
								}}
							/>
						) : null}

					</View>
				</KeyboardAwareScrollView>
			)}
		</MainLayout>
	);
};


export default Logic(MarathonSingleTraining);
