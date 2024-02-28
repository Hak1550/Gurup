import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Dimensions, BackHandler, Platform} from "react-native";
import Video from "../../components/VideoTraining";
import Styled from "./styles"
import {useDeviceOrientation} from "../../utils/hooks";
import * as ScreenOrientation from 'expo-screen-orientation';
import Orientation from 'react-native-orientation-locker';

const FullscreenVideo = (props) => {

    const orientation = useDeviceOrientation();

    const videoStyle = orientation === "portrait" ? videoStyles.fullscreenVideoPortrait : videoStyles.fullscreenVideoLandscape;
    const videoProps = {
        style: videoStyle,
        ...props,
        isLooping: true,
        // ...(
        //     meta_data && meta_data.thumbnail 
        //     ? {
        //         poster: meta_data.thumbnail
        //     } : {}
        // )
    }


    const setInitialOrientation = async () => {
        try {
            Orientation.unlockAllOrientations();
            // await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        } catch (e){
            console.error("INITIAL ORIENTAION ERROR", e);
        }
    }

    const resetOrientation = () => {
        StatusBar.setHidden(false);
        // console.log("lock orientation");
        try {
            Orientation.lockToPortrait();
        } catch (error) {
            console.error("can't set orientation lock", error)
        }
        // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }

    const handleBackButton = () => {
        // console.log("HANDLE BACK BUTTON")
        resetOrientation()
    }
    
    useEffect(() => {
        StatusBar.setHidden(true);
        setInitialOrientation();
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButton
        );
        return () => {
            resetOrientation();
            backHandler.remove()
        }
    }, []);
    return (
        <Styled.Container>
            <Video 
                {...videoProps} 
                shouldPlay
                screenResize
                fullscreenButton={false}
                onClose={resetOrientation}
            />
        </Styled.Container>
    );
}


const videoStyles = StyleSheet.create({
    fullscreenVideoLandscape: {
        height: Dimensions.get('window').width,
        width: Dimensions.get('window').height,
        backgroundColor: 'black',
    },
    fullscreenVideoPortrait: {
        backgroundColor: 'black',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },
})

export default FullscreenVideo