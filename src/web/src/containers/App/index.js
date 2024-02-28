import React, { Component, Fragment } from "react"
import routes from "routes"
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom"
import { updateBaseUrl } from "requester"
import { init } from "actions/sign"
import { getTags } from "actions/tags"
import { connect } from "react-redux"
import { config } from "styles/variables"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { getCourses } from "actions/courses"
import { ThemeProvider } from "styled-components"

import PayConsultation from "components/PayConsultation"
import NotAlowed from "components/NotAlowed"
import QuitExercise from "components/QuitExercise"
import Lightbox from 'components/Lightbox';
import Modal from 'components/Modal';
import {Helmet} from "react-helmet";

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fab)

class App extends Component {
	state = {
		loading: true,
	}
	async componentDidMount() {
		const { dispatch } = this.props
		const subdomain = window.location.host.split(".")[0];
		updateBaseUrl({ subdomain });
		await dispatch(init({ config }));



		this.setState({ loading: false })
		//TODO: Костыль. Причина: когда переходишь по url /courses/:id не подгружется purchasedCourse
		// и из-за этого непонятно куплен курс или нет
		// dispatch(getCourses())
	}

	theme = () => {
		const { influencer } = this.props
		if (influencer) {
			switch (influencer.template) {
				case "red":
					return {
						$accent: "#FF4C65",
						$contentPale: "#949CA4",
						$additionLight: "#E1DEEC",
						$mainGradientColorOne: "#FF03A6",
						$mainGradientColorSecond: "#FF7144",
						$additionColor: "#DAE3EE",
						$mainContent: "#462163",
						$textColor: "#57606E",
						$shadowColor: "#868686",
						$greyColor: "#E9E7EE",
						$screenBackgroundColor: "#F1F9FF",
						$successColor: "#65C691",
						// $buttonColor: "#FF4C65",
						$headerColor: "#FF4C65",
						$lessonItemActiveColor: "#FF4C65",
						$marathonHeaderColor: "#4B4B4B",
						$headerTextColor: "#fff",

					}
				case "green":
					return {
						$accent: "#00D681",
						$contentPale: "#949CA4",
						$additionLight: "#25B2D8",
						$mainGradientColorOne: "#00D681",
						$mainGradientColorSecond: "#19B8E3",
						$additionColor: "#DAE3EE",
						$mainContent: "#462163",
						$textColor: "#57606E",
						$shadowColor: "#979797",
						$greyColor: "#E9E7EE",
						$screenBackgroundColor: "#F1F9FF",
						$successColor: "#fff",
						// $buttonColor: "#25B2D8",
						$headerColor: "#25B2D8",
						$lessonItemActiveColor: "#25B2D8",
						$marathonHeaderColor: "#4B4B4B",
						$headerTextColor: "#fff",
					}
				case "black":
					return {
						$accent: "#9671F2",
						$contentPale: "#949CA4",
						$additionLight: "#25B2D8",
						$mainGradientColorOne: "#00D681",
						$mainGradientColorSecond: "#19B8E3",
						$additionColor: "#DAE3EE",
						$mainContent: "#462163",
						$textColor: "#57606E",
						$shadowColor: "#979797",
						$greyColor: "#E9E7EE",
						$screenBackgroundColor: "#F1F9FF",
						$successColor: "#65C691",
						// $buttonColor: "#9671F2",
						$headerColor: "#57606E",
						$lessonItemActiveColor: "#9671F2",
						$marathonHeaderColor: "#343143",
						$headerTextColor: "#fff",
					}
			}
		}
		return { ...config.colors }
	}
	render() {
		const {influencer} = this.props;
		const { loading } = this.state
		return loading ? null : (
			<Fragment>
				<ThemeProvider theme={this.theme()}>
					<BrowserRouter>
						<Helmet>
							<link rel="shortcut icon" href={influencer.web__favicon} type='image/x-icon' />
						</Helmet>
						<Modal/>
						<ToastContainer />
						<QuitExercise />
			            <PayConsultation />
			            <NotAlowed/>
						<Lightbox/>
						<Switch>
							{routes.map((route, i) =>
								route.redirect ? <Redirect key={i} {...route} /> : <Route {...route} key={i} />
							)}
						</Switch>
					</BrowserRouter>
				</ThemeProvider>
			</Fragment>
		)
	}
}

export default connect(({ influencer }) => ({ influencer }))(App)
