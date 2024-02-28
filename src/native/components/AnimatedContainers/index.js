import React, {useEffect, useState, useRef} from "react";
import * as Animatable from 'react-native-animatable';
import {useIsMount} from "../../utils/hooks";

export const HiddenBlock = ({hidden, removeFromView = true, ...props}) => {
    const containerRef = useRef();
    const isMount = useIsMount();
    useEffect(() => {
        if(!isMount){
            if(hidden){
                containerRef.current.fadeOutUp(150).then((endState) => {
                    if(endState.finished && removeFromView){
                        containerRef.current.setNativeProps({ display: "none"});
                    }
                });
            } else {
                containerRef.current.fadeInDown(150).then((endState) => {
                    if(endState.finished && removeFromView){
                        containerRef.current.setNativeProps({ display: "flex"});
                    }
                });
            }
        }
    }, [hidden]);
    return (
        <Animatable.View
            useNativeDriver
            ref = {containerRef}
            {...props}
            style={[
                props.style
            ]}
        />
    )
}