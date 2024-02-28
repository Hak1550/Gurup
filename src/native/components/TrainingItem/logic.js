import React from 'react'
import { withNamespaces } from 'react-i18next'

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    return withNamespaces("app_nutrition", { wait: true })(Logic)
}