import React from "react"
import { Text, View, TouchableOpacity} from "react-native"
import CacheImage from "../../CacheImage";
import styles from "../styles"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FitImage from "react-native-fit-image"
import moment from "moment"
import Logic from "../logic"
import Touchable from '../../Touchable';
const MarathonCard = ({ exercise, marathonStart, t, isCompleteExercise, ...rest }) => {
	// console.log("marathonCard", exercise.title, exercise.allowed)
	// console.log("moment now", moment())
	// console.log("is equal", moment(exercise.startDate).isSame(moment(), "day"))
	const imgSrc = (exercise && exercise.img && exercise.img.length)? exercise.img : null;
	const cardStyles = [styles["marathon-card__container"]];
	if (!exercise.allowed){
		cardStyles.push(styles["marathon-card__disabled"])
	}
	const TouchableProps = {
		disabled: !exercise.allowed
	}
	return (
			<Touchable {...rest} {...TouchableProps}>
				<View style={cardStyles}>
					{imgSrc && <CacheImage source={imgSrc} style={styles["marathon-card__img"]} />}
					<View style={styles["marathon-card__overlay"]} />
					<View style={styles["marathon-card__header"]}>
						<View style={styles["marathon-card__header-block"]}>
							{exercise.duration && (
								<Text style={styles["marathon-card__header-text"]}>
									{moment.duration(exercise.duration, "minutes").format("m _")}
								</Text>
							)}
						</View>

						<View style={styles["marathon-card__header-block"]}>
							{isCompleteExercise(exercise._id) && (
								<>
									<Text style={styles["marathon-card__header-text"]}>{t("app_basic:completed")}</Text>
									<FontAwesome name={"check"} style={styles["marathon-card__icon"]} />
								</>
							)}
						</View>
					</View>
					<View style={styles["marathon-card__content"]}>
						<Text style={styles["marathon-card__content-title"]}>{exercise.title}</Text>
						<Text style={styles["marathon-card__content-text"]}>{exercise.description}</Text>
					</View>
				</View>
			</Touchable>
		)
}

export default Logic(MarathonCard)
