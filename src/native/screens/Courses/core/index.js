import React, { useCallback } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList } from "react-native"
import MainLayout from "../../../components/MainLayout"
import CourseItem from "../../../components/CourseItem"
import styles from "../styles"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FiltersModal from "../../../components/FiltersModal"
import Logic from "../logic"
import Preloader from "../../../components/Preloader"
import { getCourses } from "../../../../actions/courses"
import NoCourses from "../../../assets/core/svg-icon/no_courses";
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";

const Courses = ({ state, _toggleModal, getProgress, courses, purchasedCourses, navigation, loading, t, tags, setActiveTag, influencer={} }) => {
	
	const renderCourseItem = useCallback(({item}) => (
		<CourseItem
			_id={item._id}
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
			{!loading && (!courses || !courses.length) ? (
				<ScreenPlaceholder
					text={t("app_courses:no_courses")}
					imageComponent={<NoCourses/>}
				/>
			): null}

			{/* Если курсы загрузились, то показываем их */}
			{!loading && courses.length ? (
				<View style={styles["courses"]}>
					<FlatList 
						data={courses}
						keyExtractor={keyExtractor}
						renderItem={renderCourseItem}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			) : null}

			<View style={styles["courses__filter"]}>
				<TouchableOpacity
					style={styles["courses__filter-button"]}
					onPress={() => {
						_toggleModal()
					}}>
					<FontAwesome style={styles["courses__filter-button-icon"]} name={"sliders"} />
					{state.activeTag?(
						<View style={styles["courses__filter__number"]}>
							<Text style={styles["courses__filter__number__text"]}>1</Text>
						</View>
					):null}
				</TouchableOpacity>
			</View>
			<FiltersModal modalVisible={state.isModalVisible} toggleModal={_toggleModal} fetchData={getCourses} callback={setActiveTag} />
		</MainLayout>
	)
}

export default Logic(Courses)
