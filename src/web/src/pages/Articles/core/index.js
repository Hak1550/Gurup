import React, { Fragment } from "react"
import Card from "components/Card"
import Header from "components/Header"
import Logic from "../logic"
import { ArticlesContainer, CardTitle} from "../styles"
import Container from "components/Container"
import ModulePlaceholder from "components/ModulePlaceholder"
import PaginatedContent from "components/PaginatedContent";


export default Logic(({ articles, filter, pages, loading, t, fetchArticles}) => {
	return (
		<Fragment>
			<Header filter={filter} breadcrumbs={[{ label: t("basic:Articles"), to: "/articles" }]} />
			<PaginatedContent
				items = {articles}
				fetchItems = {fetchArticles}
				renderItem = {({_id, title, img}) => (
					<Card key={_id} link={`/articles/${_id}`} img={img}>
						<CardTitle>{title}</CardTitle>
					</Card>
				)}
				renderPlaceholder = {() => <Card loading />}
				placeholderNumber = {10}
				paginationType = "numbers"
				pages = {pages}
			/>
			{/*<ArticlesContainer>*/}
			{/*{!loading.articles ? (*/}
				{/*articles.length ? (*/}
					{/*<PaginatedContent*/}
						{/*branch = "articles"*/}
						{/*fetchItems = {fetchArticles}*/}
						{/*renderItem = {({_id, title, img}) => (*/}
							{/*<Card key={_id} link={`/articles/${_id}`} img={img}>*/}
								{/*<CardTitle>{title}</CardTitle>*/}
							{/*</Card>*/}
						{/*)}*/}
					{/*/>*/}
				{/*) : (*/}
				    {/*<Container>*/}
					    {/*/!* Заглушка если нет статей *!/*/}
					    {/*<ModulePlaceholder verticalCenter horizontalCenter img={require('assets/core/placeholders/articles.png')} text={t('web_basic:no_articles')} />*/}
                    {/*</Container>*/}
				{/*)*/}
			{/*) : (*/}
					{/*<Card loading />*/}
					{/*<Card loading />*/}
					{/*<Card loading />*/}
					{/*<Card loading />*/}
			{/*)}*/}
			{/*</ArticlesContainer>*/}
		</Fragment>
	)
})
