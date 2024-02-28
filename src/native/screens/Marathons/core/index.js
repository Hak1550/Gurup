import React, { useCallback } from "react"
import { FlatList, Image, ScrollView, Text, View } from "react-native"
import MainLayout from "../../../components/MainLayout"
import CourseItem from "../../../components/CourseItem"
import styles from "../styles"
import Logic from "../logic"
import Preloader from "../../../components/Preloader"
import { config } from "../../../styles/variables"
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import NoChallenges from "../../../assets/core/svg-icon/no_challenges";

const Marathons = ({ getProgress, marathons, purchasedCourses, loading, navigation, t, influencer={} }) => {
	// LanguageFixNeeded Fixed

	const renderCourseItem = useCallback(({item}) => (
		<CourseItem
			_id={item._id}
			type='marathon'
			course={item}
			purchasedCourse={(() => {
				return purchasedCourses.find(
					purchasedCourse => purchasedCourse.course === item._id
				)
			})()}
			courseProgress={getProgress(item)}
			displayType={influencer.app__courseCardDisplay || "default"}
		/>
	), [getProgress, purchasedCourses])

	const keyExtractor = useCallback((item) => item._id.toString(), [getProgress, purchasedCourses])

	return (
		<MainLayout
			screenTitle={t(navigation.state.params.title)}
			backButton={false}
			accountButton={true}
			getAvatar={false}>
			{/* Если загружется, то показываем прелоадер */}
			{loading && <Preloader />}

			{/* Если загрузилось и курсов нету, то показываем заглушку */}
			{!loading && (!marathons || !marathons.length) && (
				<ScreenPlaceholder
					text={t("app_marathon:no_marathon")}
					imageComponent={<NoChallenges/>}
				/>
			)}

			{/* Если курсы загрузились, то показываем их */}
			{!loading && marathons.length ? (
				<View style={styles["courses"]}>
					{
						marathons && 
						<FlatList 
							data={marathons}
							keyExtractor={keyExtractor}
							renderItem={renderCourseItem}
							showsVerticalScrollIndicator={false}
						/>
					} 
				</View>
			) : null}
		</MainLayout>
	)
}

export default Logic(Marathons)
