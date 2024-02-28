import React, {Fragment, useCallback} from "react";
import {View, ScrollView, Text, Image, Platform, FlatList} from "react-native";
import MainLayout from "../../../components/MainLayout";
import styles from "../styles";
import Button from "../../../components/Button";
import Article from "../../../components/ArticleLayout";
import {Actions} from "react-native-router-flux";
import Preloader from "../../../components/Preloader"
import Logic from '../logic'
import CacheImage from "../../../components/CacheImage";
import InnerShadow from "../../../assets/core/svg-icon/inner_shadow.js"
import { config } from "../../../styles/variables";
import EStyleSheet from "react-native-extended-stylesheet";
import BuyCourseHead from "../BuyCourseHead";
import CourseListItem from "../../../components/ChapterItem";
import LessonItem from "../../../components/LessonItem";

import {getCourseList, getCourseProgress} from "../../../utils";

const BuyCourse = ({ _buyCourse, course_id, course, exercises, loading, influencer, courseStarted, purchasedCourses, t, isCustomApp }) => {
    const {chapters} = course;
    const pc = purchasedCourses.find(pc => pc.course === course_id) || {};
    const courseProgress = getCourseProgress({purchasedCourses, course_id});  
    const courseList = getCourseList({exercises, chapters, courseProgress});

    const renderCourseItem = useCallback(({item}) => {
        if(item.type === "chapter"){
            const chapterItemProps = {
                disabled: !(courseStarted && item.allowed),
                item,
                startDate: pc.purchaseDate,
                course_id,
                complete: item.completeExercises != 0 && item.exercises && item.completeExercises === item.exercises.length
            }
            return (
                <View style = {styles["buy-course__chapters"]}>
                    <CourseListItem {...chapterItemProps}/>
                </View>
            )
        } else {
            const lessonItemProps = {
                key: item._id,
                course_id: course._id,
                exercise: item,
                isAvailable: courseStarted && item.allowed,
                withImage: item.img,
                complete: item.complete
            }
            return (
                <View style = {styles["buy-course__chapters"]}>
                    <LessonItem {...lessonItemProps}/>
                </View>
            )
        }    
    }, [pc, courseProgress, courseList])

    const renderHeaderComponent = useCallback(() => {
        return (
            <View style={styles["buy-course__head"]}>
            <BuyCourseHead course={course}/>
                {
                    (!course.allowed && course.price) 
                      ? (
                            <Fragment>
                                {!influencer.coinsEnabled && config.appDomain 
                                    ? (<Article block={{ type: "price", data: course.price, currency: course.currency }} />)
                                    : null
                                }
                            </Fragment>
                        )
                      : null
                }
                        
                        
                {/* <Article.Price price={course.price}/> */}

                {course.blocks && course.blocks.map((block, key) => {
                    return (<Article key={key} block={block}/>);
                })}


                {
                    (!isCustomApp && !course.allowed && !course.startAllowed)
                    ? (
                        <Article block={{
                            type: "text",
                            data: t("purchase_not_available")
                        }} />
                      ) 
                    : (     
                        (courseProgress && Object.keys(courseProgress).length)?null:(
                            <View style={styles['buy-course__button']}>
                                <Button
                                    title={
                                        course.allowed || course.startAllowed ? t(['app_courses:start_course_button']) : t(['app_courses:buy_course_button'])
                                    }
                                    theme="accent"
                                    type={(influencer.coinsEnabled && !course.allowed)?"coin":"default"}
                                    icon="lock"
                                    coinImage={influencer.coinImage}
                                    onPress={_buyCourse}
                                /> 
                            </View>
                        )
                        )
                }

                    {(course.startTrialAllowed) 
                        ? (
                            <View style={styles['buy-course__button']}>
                                <Button
                                    title={t('basic:start_trial_tasks')}
                                    theme="accent"
                                    type="default"
                                    onPress={() => _buyCourse().then(() => {
                                        // Actions.replace('lessons', {
                                        //     _id: course._id,
                                        //     title: course.title
                                        // })
                                    })}
                                />
                            </View>
                          ) 
                        : null
                    }
            </View>
        )
    }, [pc, courseProgress, courseList])

    const keyExtractor = useCallback((item) => item._id.toString(), []) 

    
    // console.log("courseProgress => ",courseProgress,"  course=>",course);
    return (
        <MainLayout getAvatar={false}>
            {loading && <Preloader/>}
            {!loading && (
                <View style={styles['buy-course']}>
                    <FlatList 
                        keyExtractor={keyExtractor}
                        data={courseList}
                        renderItem={renderCourseItem}
                        ListHeaderComponent={renderHeaderComponent}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            )}
        </MainLayout>
    )
}

export default Logic(BuyCourse)
