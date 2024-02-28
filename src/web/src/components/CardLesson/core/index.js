import React from "react"
import Logic from "../logic"
import { CardHeader, Image, CardBody, Card, Title, CardLessonBodyText } from "../styles"

// Контент карточки сделан через children, чтобы можно была переиспользовать компонент. Например карточка курса и рецепта
// идентичны и различаются лишь контентом, который выводиться в теле карточки
// customHeader - сделан для того, чтобы можно делать свой хедер карточки, так все карточки похожи друг на друга,
// кроме карточки на странице курсов у нее заголовок находиться в шапке и изображение с тенью

const CardLesson = ({ img, children, title, link, status, onClick }) => {
	let imageProps = {}
	if(!img) {
		imageProps.img = require('assets/core/card-no-image.png')
		imageProps.resizeMode = 'contain'
	} else {
		imageProps.img = img
	}
	const cardProps = {...(link ? {to: link} : {tag: "div", onClick} )};
	return (
		<Card {...cardProps}>
			<CardHeader status={status} {...imageProps}>
				<Title status={status}>{title}</Title>
			</CardHeader>
			<CardBody><CardLessonBodyText>{children}</CardLessonBodyText></CardBody>
		</Card>
	)
}

export default Logic(CardLesson)
