import React, { Fragment } from "react"
import Logic from "../logic"
import { CardHeader, Image, CardBody, Card } from "../styles"
import { CardDescription, CardTitle } from "pages/Main/styles"
import Skeleton from "react-loading-skeleton"
import { Link } from "react-router-dom"

// Контент карточки сделан через children, чтобы можно была переиспользовать компонент. Например карточка курса и рецепта
// идентичны и различаются лишь контентом, который выводиться в теле карточки
// customHeader - сделан для того, чтобы можно делать свой хедер карточки, так все карточки похожи друг на друга,
// кроме карточки на странице курсов у нее заголовок находиться в шапке и изображение с тенью

// Указывайте в props loading если нужно сделать preloader для карточки

const MainCard = ({ img, children, customHeader, link, loading, onClick }) => {
	let imageProps = {}
	if(!img && !loading) {
		imageProps.src = require('assets/core/card-no-image.png')
		imageProps.resizeMode = 'contain'
	} else {
		imageProps.src = img
	}

	return (
		<Card to={link} onClick={(e)=>{
			if (onClick) {
				onClick(e)
			}
		}} tag={loading && 'div'} loading={loading}>
			<CardHeader>{customHeader ? customHeader() : <Image {...imageProps} />}</CardHeader>
			<CardBody>
				{!loading ? (
					children
				) : (
					<Fragment>
						<CardTitle>
							<Skeleton />
						</CardTitle>
						<CardDescription>
							<Skeleton />
						</CardDescription>
					</Fragment>
				)}
			</CardBody>
		</Card>
	)
}

export default Logic(MainCard)
