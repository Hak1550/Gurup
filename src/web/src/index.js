import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import App from "containers/App"
import store from "store"
import GlobalStyle from './styles'
import {config} from 'styles/variables'

export default ReactDOM.render(
	<Provider store={store}>
		<App />
		<GlobalStyle fonts={config.appDomain ? config.fontsCustom : config.fontsCore}/>
	</Provider>,
	document.querySelector("#root")
)
