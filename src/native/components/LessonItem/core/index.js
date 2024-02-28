import React, { Fragment } from "react"
import { View, Text, TouchableOpacity, ImageBackground } from "react-native"
import styles from "../styles"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Logic from "../logic"
import CacheImage from "../../CacheImage"
import moment from "moment"
import FastImage from "react-native-fast-image"
import Touchable from "../../Touchable";

const LessonItem = ({ t, exercise, complete = false, _onPress, isAvailable=false }) => {
    const renderLessonStatus = () => {
        let text, icon, style;
        if(complete){
            text = t("app_basic:completed")
            icon = "check"
        } else if (exercise.report && exercise.report.status !== "done"){
            switch(exercise.report.status){
                case "in_review":
                    text = t(`app_marathon:app_marathon_status_in_review`);
                    icon = "question-circle";
                    break;
                case "failed":
                    text = t(`app_marathon:app_marathon_status_failed`);
                    icon = "times-circle";
                    style = styles["lesson-card__icon_failed"]
                    break;
                case "waiting":
                    icon = "comment";
                    style = styles["lesson-card__icon_waiting"]
                    break;
            }
        } else {
            return null
        }
        return (
            <>
                <Text style={[styles["lesson-card__header-text"], style]}>{text}</Text>
                <FontAwesome name={icon} style={[styles["lesson-card__icon"], style]} />
            </>
        )
    }
    const LessonInner = (
        <>
        <View style={styles["lesson-card__header"]}>
            <View style={styles["lesson-card__header-block"]}>
                {/* <Text style={styles["lesson-card__header-text"]}>
                    {exercise.duration && moment.duration(exercise.duration, "minutes").format("m _")} 
                </Text> */}
            </View>

            <View style={styles["lesson-card__header-block"]}>
                {renderLessonStatus()}
            </View>
        </View>
        <View style={styles["lesson-card__content"]}>
            <Text style={styles["lesson-card__content-title"]}>{exercise.title}</Text>
            <Text style={styles["lesson-card__content-text"]}>{exercise.description}</Text>
        </View>
        </>
    )
    let TouchableProps = {
        ...(isAvailable ? {
            onPress: () => _onPress(exercise.type)
        }: {})
    }

    let viewStyles = [
        styles["lesson-card__container"],
        ...(!isAvailable ? [styles["lesson-card__container_inactive"]] : [])
    ]

    // console.log("ImageBackground => ",exercise.img)
    return (
        <Touchable {...TouchableProps} style={{ marginBottom: 14, borderRadius: 10}}>
            <CacheImage style={viewStyles} source={exercise.img}>
                <View style={styles["lesson-card__overlay"]}/>
                {LessonInner}
            </CacheImage>
        </Touchable>
    )
}

export default Logic(LessonItem)
