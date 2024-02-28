import React, { Fragment } from "react"
import Header from "components/Header"
import Logic from "./logic"
import { Redirect } from "react-router-dom"
import {Img, Container, Button, Text} from "./styles"
import Skeleton from "react-loading-skeleton"

const NotValidated = ({t}) => {
	return (
		<Fragment>
			<Header/>
			<Container bodyWidth={"100%"}>
				<Img/>
				<Text>{t("not_validated")}</Text>
				<Button to="/settings/user">{t("basic:settings")}</Button>
			</Container>
		</Fragment>
	)
}

export default Logic(NotValidated)
