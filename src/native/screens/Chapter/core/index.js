import React from "react"
import MainLayout from "../../../components/MainLayout"
import LessonItem from "../../../components/LessonItem"
import Logic from "../logic"
import {FlatList, Text} from "react-native";
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import NoCourses from "../../../assets/core/svg-icon/no_courses";
import {getCourseList, getCourseProgress} from "../../../utils";
import styles from "../styles";

const Chapter = ({ loading, exercises = [], purchasedCourses, course_id, chapter_id, course, t }) => {
	const {chapters} = course;
	const courseProgress = getCourseProgress({purchasedCourses, course_id});    
	const courseList = getCourseList({exercises, chapters, courseProgress});
	const chapter = courseList.find(({_id}) => _id === chapter_id);

	return (
		<MainLayout screenTitle={course.title} getAvatar={false}>
			{!loading && !chapter.exercises.length ? (
				<ScreenPlaceholder
					text={t("app_basic:no_exercises")}
					imageComponent={<NoCourses/>}
				/>
			): null}
			{!loading && chapter.exercises.length ? (
				<>
					<Text style={styles["chapter__title"]}>{chapter.title}</Text>
					<FlatList
						contentContainerStyle={styles["lessons"]}
						data={chapter.exercises}
						keyExtractor={({_id}) => _id}
						renderItem={({item: exercise, index}) => {
							const lessonItemProps = {
								key: index,
								course_id: course_id,
								exercise,
								isAvailable: exercise.allowed,
								withImage: exercise.img,
								complete: exercise.complete,
								chapter
							}
							return (
								<LessonItem
									{...lessonItemProps}
								/>
							)
						}}
					/>
				</>
			) : null }
		</MainLayout>
	)
}

export default Logic(Chapter)
