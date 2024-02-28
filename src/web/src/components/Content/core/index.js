import React from "react"
import Logic from "../logic"
import { Container, Body, Footer } from "../styles"

const Courses = ({ children, bodyWidth="auto", padding, style, className, verticalCenter, horizontalCenter }) => {
	return (
		<Container padding={padding} style={{...style}} className={className} verticalCenter={verticalCenter} horizontalCenter={horizontalCenter}>
			<Body bodyWidth={bodyWidth} className={className+"__body"}>
				{children}
			</Body>
		</Container>
	)
}

export default Logic(Courses)
