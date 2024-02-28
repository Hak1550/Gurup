import React, { Fragment } from "react"
import MainLayout from "../../components/MainLayout"
import { Linking } from "react-native"
import Styled from "./styles"
import Logic from "./logic"
import AppInfo from "../../components/AppInfo";

const About = ({ influencer, t }) => {
    return (
        <MainLayout
            screenTitle={t("app_basic:about_page")}
        >   
            <Styled.About>
                <Styled.Link
                    onPress={() => {
                        if (influencer && influencer.termsOfUse) {
                            Linking.openURL(influencer.termsOfUse)
                        } else {
                            Linking.openURL(t('basic:terms_url'))
                        }
                    }}>
                    <Styled.LinkText>{t("app_basic:terms_of_use")}</Styled.LinkText>
                </Styled.Link>

                <Styled.Link
                    onPress={() => {
                        if (influencer && influencer.privacyPolicy) {
                            Linking.openURL(influencer.privacyPolicy)
                        } else {
                            Linking.openURL(t('basic:policy_url'))
                        }
                    }}>
                    <Styled.LinkText>{t("app_basic:privacy_policy")}</Styled.LinkText>
                </Styled.Link>
                <Styled.Separator/>
                <AppInfo/>
            </Styled.About>
       </MainLayout>
    )
}

export default Logic(About)
