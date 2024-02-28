import React, { Fragment } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "../styles"
import CacheImage from "../../CacheImage"
import Logic from "../logic";
import {Actions} from "react-native-router-flux";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ProgressBar from "../../ProgressBar";
import moment from "moment";
import Touchable from '../../Touchable';

const ChapterItem = ({ t, course_id, item = {}, disabled = false, startDate}) => {
	const { img, title, _id: chapter_id, complete, completeExercises, exercises = [], day} = item;
	let cardImage = img;
	const onCardPress = () => {
		if(!disabled){
			Actions.chapter({chapter_id, course_id});
		}
	}
	if(!cardImage && item.exercises[0]){
		cardImage = item.exercises[0].img;
	}
	const itemInner = (
		<Fragment>
			<View style={styles["chapteritem__wrapper"]}>
				<View style={styles["chapteritem__header"]}>
					<Text style={styles["chapteritem__update"]}>
						{item.type === "chapter" && `${item.exercises.length} ${t("app_basic:lessons")}`}
					</Text>
					{disabled && day ? (
						<Text style={styles["chapteritem__update"]}>
							{moment(startDate).clone().add(day, "day").format("DD MMMM")}
						</Text>
					) : complete && (
						<View style={styles["chapteritem__status"]}>
							<Text style={styles["chapteritem__status-text"]}>{t("app_basic:completed")}</Text>
							<FontAwesome name="check" style={styles["chapteritem__status-icon"]} />
						</View>
					)}
				</View>
				<Text style={styles["chapteritem__title"]}>{title}</Text>
			</View>
		</Fragment>
	)
	const viewStyles = [styles["chapteritem"], ...(disabled ? [styles["chapteritem_inactive"]] : [{}])]
	return (
		<Touchable onPress = {onCardPress}>
			<View style={viewStyles}>
				<CacheImage style={styles["chapteritem__image"]} source={cardImage} />
				<View style={styles["chapteritem__overlay"]}/>
				{itemInner}
				{completeExercises > 0 && <ProgressBar progress={completeExercises/exercises.length} style={styles["chapteritem__progress"]}/>}
			</View>
		</Touchable>
	)
}

export default Logic(ChapterItem)
