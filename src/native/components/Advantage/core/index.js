import React from "react"
import { View, Text } from "react-native"
import styles from "../styles"
import Logic from "../logic"
import CacheImage from "../../CacheImage"

const Advantage = ({ data}) => {
	// console.log("data", data)
	return (
		<View style={styles["advantage"]}>
			<CacheImage source={data.photo} style={styles['advantage__img']} />
			<Text style={styles["advantage__text"]}>{data.text}</Text>
		</View>
	)
}

export default Logic(Advantage)
