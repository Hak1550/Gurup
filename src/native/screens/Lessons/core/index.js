import React from "react"
import { ScrollView, FlatList } from "react-native"
import MainLayout from "../../../components/MainLayout"
import LessonItem from "../../../components/LessonItem"
import styles from "../styles"
import Logic from "../logic"
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import NoCourses from "../../../assets/core/svg-icon/no_courses";

const Lessons = ({ loading, exercises = [], purchasedCourses, navigation, course, t }) => {

	const currentPurchasedCourse = purchasedCourses.find(
		purchasedCourse => purchasedCourse.course === navigation.state.params._id
	)

	let activeExercises = {}
	// console.log("currentPurchasedCourse ",currentPurchasedCourse);
	if (
		currentPurchasedCourse &&
		currentPurchasedCourse.activeExercises &&
		currentPurchasedCourse.activeExercises.length
	) {
		for (const activeExercise of currentPurchasedCourse.activeExercises) {
			activeExercises[activeExercise.exerciseId] = activeExercise;
		}
	}
	return (
		<MainLayout screenTitle={course.title} getAvatar={false} loading={loading}>
			{!loading && !exercises.length ? (
				<ScreenPlaceholder
					text={t("app_basic:no_exercises")}
					imageComponent={<NoCourses/>}
				/>
			): null}
			{!loading && exercises.length ? <FlatList
				contentContainerStyle={styles["lessons"]}
				data={exercises}
				keyExtractor={({_id}) => _id}
				renderItem={({item: exercise, index}) => {
					const lessonItemProps = {
						key: index,
						course_id: navigation.state.params._id,
						exercise,
						isAvailable: exercise.allowed,
						withImage: exercise.img
					}
					if (exercise.allowed && activeExercises[exercise._id] && activeExercises[exercise._id].complete) {
						lessonItemProps.complete = true;
					}

					return (
						<LessonItem
							{...lessonItemProps}
						/>
					)
				}}	
				/> : null
			}
		</MainLayout>
	)
}

export default Logic(Lessons)
