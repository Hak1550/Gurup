import React, { useCallback } from "react"
import { Image, Text, View, TouchableOpacity, FlatList, ScrollView} from "react-native"
import MainLayout from "../../../components/MainLayout"
import ArticleItem from "../../../components/ArticleItem"
import styles from "../styles"
import Logic from "../logic"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FiltersModal from "../../../components/FiltersModal"
import { getArticles } from "../../../../actions/articles"
import Preloader from "../../../components/Preloader"
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import NoArticles from "../../../assets/core/svg-icon/no_articles";

// class Articles extends React.Component {
// 	render() {
// 		const { loading, articles, goToArticle, state, t, _toggleModal, addArticles, navigation} = this.props
// 		// console.log('navigation:', navigation);

const Articles = ({
	loading,
	articles,
	goToArticle,
	state,
	t,
	_toggleModal,
	addArticles,
	navigation
	}) => {

	const renderItem = useCallback(({item: article}) => (
		<ArticleItem withImage={!!article.img} article={article} goToArticle={goToArticle} />
	), [])

	const keyExtractor = useCallback((item) => item._id.toString(), [])

	return (
		<MainLayout screenTitle={t(navigation.state.params.title)} backButton={false} getAvatar={false}>
			{loading && <Preloader />}
			{!loading && (!articles || !articles.length) ? (
				<ScreenPlaceholder
					text={t("app_articles:no_articles")}
					imageComponent={<NoArticles/>}
				/>
			) : null}
			{articles.length ? (
				<FlatList
					data={articles}
					// style={styles["articles"]}
					contentContainerStyle={styles["articles"]}
					keyExtractor={keyExtractor}
					// onEndReached={addArticles}
					// onEndReachedThreshold={0.5}
					// renderItem={({ item: article }) => (
					// 	<ArticleItem withImage={!!article.img} article={article} goToArticle={goToArticle} />
					// )}
					renderItem={renderItem}
					showsVerticalScrollIndicator={false}
				/>
			) : null}
			<View style={styles["articles__filter"]}>
				<TouchableOpacity
					style={styles["articles__filter-button"]}
					onPress={() => {
						_toggleModal()
					}}>
					<FontAwesome style={styles["articles__filter-button-icon"]} name={"sliders"} />
				</TouchableOpacity>
			</View>
			<FiltersModal modalVisible={state.isModalVisible} toggleModal={_toggleModal} fetchData={getArticles} />
		</MainLayout>
	)
}

export default Logic(Articles)
