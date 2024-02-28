import React from "react"
import { PlaceholderContainer, PlaceholderImage, PlaceholderText } from "./styles"

const ModulePlaceholder = ({ text, img, alignItems, display, justifyContent, direction, maxWidth }) => {
	return (
		<PlaceholderContainer alignItems={alignItems} display={display} justifyContent={justifyContent} direction={direction}>
			<PlaceholderImage maxWidth={maxWidth} src={img ? img : require("assets/core/placeholders/course.png")} />
			<PlaceholderText>{text ? text : ""}</PlaceholderText>
		</PlaceholderContainer>
	)
}

export default ModulePlaceholder
