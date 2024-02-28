import styled from "styled-components/native";
import CacheImage from "../../components/CacheImage"
import ThemedButton, {RoundedButton} from "../../components/Button"
import GurucanLogo from "../../assets/core/svg-icon/gurucan-logo";
import CamereFrameDashed from "../../assets/core/svg-icon/camera-frame";
import LottieView from 'lottie-react-native'

import {Dimensions, Platform} from "react-native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import checked from '../../assets/core/animations/checked';
import school_preloader from "../../assets/core/animations/school_preloader";

import styles from "../QuizFinish/styles";
import error from "../../assets/core/animations/error.json";
import _Logo from "../../components/Logo";

export const Screen = styled.View`
    background-color: ${({theme}) => theme.$screenBackgroundColor};
    flex: 1;
`

export const Scanner = styled(BarCodeScanner)`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
`

export const Container = styled.View`
    padding: 0 10%;
`

export const LogoWrap = styled.View`
    flex: ${Dimensions.get('window').height > 568 ? 2 : 1};
    justify-content: center;
    align-items: center;
`

export const Content = styled.View`
    flex: ${Dimensions.get('window').height > 568 ? 5 : 3};
    align-items: center;
    /* padding: 0 10%; */
`

export const Logo = styled(_Logo)`
    width: 240px;
    margin-top: 50px;
`;

export const Title = styled.Text`
    font-size: 24px;
    color: ${({theme}) => theme.$darkBgTextColor};
    margin-bottom: 18px;
    text-align: center;
`;

export const SubTitle = styled.Text`
    font-size: 14px;
    color: ${({theme}) => theme.$additionalTextColor};
    text-align: center;
    margin-bottom: auto;
`

export const BackButton = styled(RoundedButton)`
`

export const CameraFrame = styled(CamereFrameDashed)`
    width: 250px;
    height: 250px; 
`

export const CameraFrameFill = styled.View`
    flex: 1;
    background-color: #000;
    opacity: 0.7;
`

export const CameraFrameWrap = styled.View`
    flex-direction: row;
`

export const CenterFill = styled.View`
    width: 100%;
    height: 250px;
`

export const Preloader = styled(LottieView).attrs((props) => ({
    autoPlay: true,
    loop: true,
    source: school_preloader,
    ...props
}))`
  flex: 1;
`
export const CheckMark = styled(LottieView).attrs((props) => ({
    autoPlay: true,
    loop: false,
    duration: 1000,
    source: checked,
    ...props
}))`
`

export const Overlay = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0.7;
`

export const Link = styled.Text`
    color: ${({theme}) => theme.$screenBackgroundColor};
`

export const NavWrapper = styled.View`
    flex-direction: row;
    align-self: stretch;
    justify-content: space-between;
    flex: 1;
    padding: 15px 10%;
`