import React, { Fragment } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "../styles"
import LinearGradientOverlay from "../../LinearGradientOverlay"
import { config } from "../../../styles/variables"
import CacheImage from "../../CacheImage"
import moment from "moment"
import Logic from "../logic";

const ArticleItem = ({ t, article, goToArticle }) => {
	const { img } = article
	const articleInner = (
		<Fragment>
			<View style={styles["articleitem__wrapper"]}>
				<Text style={styles["articleitem__update"]}>
					{t("app_articles:updated")} {moment(article.updatedAt).fromNow()}
				</Text>
				<Text style={styles["articleitem__title"]}>{article.title}</Text>
			</View>
		</Fragment>
	)

	return (
		<TouchableOpacity activeOpacity={0.8} style={styles["articleitem"]} onPress={() => goToArticle(article)}>
			<CacheImage style={styles["articleitem__image"]} source={img} />
			<View style={styles["articleitem__overlay"]}/>
			{articleInner}
		</TouchableOpacity>
	)
}

export default Logic(ArticleItem)
