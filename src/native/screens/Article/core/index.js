import React, {useRef, useCallback} from "react"
import MainLayout from "../../../components/MainLayout"
import Block from "../../../components/ArticleLayout"
import Button, { RoundedButton } from "../../../components/Button"

import { Text, View, FlatList } from "react-native"
import Preloader from "../../../components/Preloader"
import Logic from "../logic"
import moment from "moment"
import styles from "../styles"

const Article = ({ state, article, articleNavigation, t}) => {

	const renderItem = useCallback(({item: block}) => (
		<Block currentScreenType = "article" block={block} />
	), [article])

	const renderHeader = useCallback(() => (
		<>
			<Text style={styles['article__update-time']}>
				{t("app_articles:updated")} {moment(article.updatedAt).fromNow()}
			</Text>
			<Text style={styles['article__title']}>{article.title}</Text>
		</>
	), [article])

	const renderFooter = useCallback(() => (
		<View style={styles['article__navigation']}>
			{articleNavigation.prev && (
				<Button
					style={styles['article__navigation_prev']}
					icon="chevron-left"
					theme="ghost-accent"
					title={t("app_articles:prev_article")}
					onPress={articleNavigation.prev}
				/>
			)}
			{articleNavigation.next && (
				<RoundedButton
					style={styles['article__navigation_next']} 
					icon="chevron-right" 
					theme="accent"
					onPress={articleNavigation.next}
				/>
			)}
		</View>
	), [article])
 
	const keyExtractor = useCallback((item) => item._id.toString(), [article])

	return (
		<MainLayout screenSubTitle='1 Lesson'>
			{!state.loaded 
			?	<Preloader />
			:	article?.blocks && 
					<FlatList 
						keyExtractor={keyExtractor}
						data={article.blocks.filter(block => block.type)}
						renderItem={renderItem}
						ListHeaderComponent={renderHeader}
						ListFooterComponent={renderFooter}
						showsVerticalScrollIndicator={false}
					/>
				
			}
				
		</MainLayout>
	)
}

export default Logic(Article)
