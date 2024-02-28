import React from "react"
import { View, TouchableOpacity, Text} from "react-native"
import styles from "../styles"
import Logic from "../logic"
import EStyleSheet from "react-native-extended-stylesheet"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CacheImage from "../../CacheImage"

const NutritionRecipesCard = ({ kcal, img, type, id, cookingTime, title, onPress, t}) => {
	return (
		// Этот View нужен только для тени
		<TouchableOpacity activeOpacity={0.9} style={styles["recipes-card"]} onPress={() => onPress(type, id)}>
			<CacheImage
				source={img}
				style={styles["recipes-card__image"]}
			/>
			<View style={styles["recipes-card__overlay"]}/>
			<View style={[styles["recipes-card__content"]]}>	
				<View style={[styles["recipes-card__content-top"]]}>
					{cookingTime ? (
						<Text style={[styles["recipes-card__content-info"]]}>
							<FontAwesome name={"clock-o"} /> {cookingTime}
							<Text style={[styles["recipes-card__content-info-unit"]]}>
								{" "}
								{t("app_nutrition:minute")}
							</Text>
						</Text>
					) : null}

					{kcal ? (
						<Text style={[styles["recipes-card__content-info"]]}>
							<FontAwesome name={"leaf"} /> {kcal}
							<Text style={[styles["recipes-card__content-info-unit"]]}>
								{" "}
								{t("app_nutrition:kcal")}
							</Text>
						</Text>
					) : null}
				</View>
				{title ? <Text style={[styles["recipes-card__content-title"]]}>{title}</Text> : null}
			</View>
		</TouchableOpacity>
	)
}

export default Logic(NutritionRecipesCard)
