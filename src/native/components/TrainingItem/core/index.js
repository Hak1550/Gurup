import React from 'react'
import {Text, View, Image, TouchableOpacity} from 'react-native'
import styles from '../styles'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Logic from "../logic"
import Touchable from '../../Touchable'
const TrainingItem = ({ t, workout, onPress }) => {
    if(!workout) {
        return null
    }
    return (
        <Touchable activeOpacity={1} style={styles['training-item__container']} onPress={() => onPress(workout)}>
            {workout.meta_data && workout.meta_data.thumbnail  ? (
                <Image
                    source={{ uri: workout.meta_data.thumbnail}}
                    style={styles['training-item__img']}
                />
            ) : null}
            <View style={styles['training-item__overlay']}/>
            <View style={styles["training-item__info"]}>
                {workout.duration ? (
                    <View style={styles["training-item__info-block"]}>
                        <FontAwesome style={styles["training-item__info-icon"]} name={"clock-o"} /> 
                        <Text style={styles["training-item__info-text"]}>{5}</Text>
                        <Text style={[styles["training-item__info-unit"]]}>
                            {t("app_nutrition:minute")}
                        </Text>
                    </View>
                ) : null}

                {workout.kcal ? (
                    <View style={styles["training-item__info-block"]}>
                        <FontAwesome style={styles["training-item__info-icon"]} name={"leaf"} /> 
                        <Text style={styles["training-item__info-text"]}>{5}</Text>
                        <Text style={styles["training-item__info-unit"]}>
                            {t("app_nutrition:kcal")}
                        </Text>
                    </View>
                ) : null} 
            </View>
            {workout.meta_data && workout.meta_data.title  ? (
                <Text style={styles['training-item__title']}>{workout.meta_data.title}</Text>
            ):null}
        </Touchable>
    )
}

export default Logic(TrainingItem)