import React, { Fragment } from "react"
import { KeyboardAvoidingView, Platform } from "react-native"
import MainLayout from "../../../components/MainLayout"
import { ScrollView, View } from "react-native"
import Preloader from "../../../components/Preloader"
import Button from "../../../components/Button"
import styles from "../styles"
import Logic from "../logic"
import Block from "../../../components/ArticleLayout"
import ChatSend from "../../../components/ChatSend"
import ProgressBar from "../../../components/ProgressBar"
import { Screen320 } from "../../../utils"

const SingleLesson = ({
	state,
	goToNextLesson,
	finishCourses,
	exercise,
	nextLesson,
	course,
	purchasedExercise,
	toggleReport,
	t,
}) => {
	// LanguageFixNeeded?
	// console.log('nextLesson', nextLesson);
	return (
		<MainLayout screenTitle={exercise.title} screenSubTitle='1 Lesson' getAvatar={false}>
			{!state.loaded && <Preloader />}
			{state.loaded && (
				<ScrollView
					contentContainerStyle={{
						flexGrow: 1,
						justifyContent: "space-between",
					}}>
					{exercise &&
						exercise.blocks.map((block, key) => {
							if (block.type) {
								return <Block key={key} block={block} />
							}
						})}

					{course && course.type == "marathon" ? (
						<Fragment>
							{purchasedExercise && purchasedExercise.complete ? (
								<Text>Задание выполнено</Text>
							) : (
								<View>
									{state.reportOpened ? (
										<KeyboardAvoidingView
											behavior={Platform.OS==="ios"?'padding':null}
											keyboardVerticalOffset={Screen320() ? 94 : 170}>
											<ProgressBar style={styles["marathon__upload-progress"]} progress={0} />
											<ChatSend onUploadEnd={() => {}} onUploadProgress={() => {}} />
										</KeyboardAvoidingView>
									) : (
										<Button title='Отправить отчет' theme='accent' onPress={toggleReport} />
									)}
								</View>
							)}
						</Fragment>
					) : (
						<View style={styles["layout-articles__button"]}>
							{nextLesson ? (
								<Button title={t("app_courses:next_lesson")} theme='accent' onPress={goToNextLesson} />
							) : (
								<Button
									title={t("app_courses:complete_course")}
									theme='accent'
									onPress={() => finishCourses()}
								/>
							)}
						</View>
					)}
				</ScrollView>
			)}
		</MainLayout>
	)
}

export default Logic(SingleLesson)
