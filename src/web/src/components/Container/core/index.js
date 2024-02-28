import React from "react"
import Logic from "../logic"
import { Container } from "../styles"
import { isAuthorized } from "hocs/checkAuth"

const DefaultContainer = ({sidebar, children, className}) => {
	return (
		<Container className={`${className} ${!sidebar || !isAuthorized() ? "big" : ""}`}>
			{children}
		</Container>
	)
}

export default Logic(DefaultContainer)
