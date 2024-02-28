import React, { Fragment } from "react"
import Content from "components/Content"
import Header from "components/Header"
import Logic from "../logic"
import { Title } from "../styles"
import ParseBlocks from "components/ParseBlocks"
import Skeleton from "react-loading-skeleton"

const Article = ({ article, loading, t }) => {
	return (
		<Fragment>
			<Header
				breadcrumbs={[
					{ to: "/articles", label: t("basic:Articles") },
					{ to: "/articles/"+article._id, label: article.title },
				]}
			/>
			<Content bodyWidth={'50%'}>
				{!loading.article ? (
					<Fragment>
						<Title>{article.title}</Title>
						<ParseBlocks blocks={article.blocks} />
					</Fragment>
				) : (
					<Skeleton count={20} height={50} />
				)}
			</Content>
		</Fragment>
	)
}

export default Logic(Article)
