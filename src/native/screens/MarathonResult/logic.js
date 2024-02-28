import React, {Component} from 'react'
import { withNamespaces } from 'react-i18next';

export default (WrappedComponent) => {
    // LanguageFixNeeded Fixed
    class Logic extends Component {
        render() {
            const {t} = this.props;
            const marathonResult = 'done'
            const marathonResultTitle = marathonResult && marathonResult === 'fail' ? t("app_marathon:marathon_failed") : t("app_marathon:marathon_finished")
            const marathonResultText = marathonResult && marathonResult === 'fail' ? t("app_marathon:marathon_failed_text") : t("app_marathon:marathon_finished_text")
            return <WrappedComponent
                marathonResultTitle={marathonResultTitle}
                marathonResultText={marathonResultText}
                {...this.props}/>
        }
    }

    return withNamespaces(['app_courses', 'app_marathon'], {wait: true})(Logic)
}

