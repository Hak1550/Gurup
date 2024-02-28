import LottieView from 'lottie-react-native'
import { Wrap, LoadingText } from "./styles"
import React from "react"
import {withNamespaces} from "react-i18next";

const SchoolPreloader = ({t}) => (
    <Wrap>
        <LottieView
            style={{width: "100%"}}
            autoPlay
            loop={true}
            speed={1.5}
            source={require('../../assets/core/animations/school_preloader')}
        />
        <LoadingText>{t("app_basic:loading_school")}</LoadingText>
    </Wrap>
)
export default withNamespaces(["app_basic"])(SchoolPreloader)