import React, { Fragment } from "react"
import MainLayout from "../../components/MainLayout"
import styles from "./styles"
import Logic from "./logic"
import LegacyChangePassword from "../../components/SettingsLayout/ChangePassword"
const ChangePassword = ({ t }) => {
    return (
        <MainLayout
            screenTitle={t("app_basic:change_password")}
        >
            <LegacyChangePassword/>
       </MainLayout>
    )
}

export default Logic(ChangePassword)
