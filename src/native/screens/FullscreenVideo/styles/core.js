import styled, {css} from "styled-components/native";
import { Dimensions, Platform } from "react-native";

const getOrientationStyles = (orientation) => {
    // console.log("ORIENTATION", orientation)
    let style = {
        height: `${Dimensions.get('screen').height}px`,
        width: `${Dimensions.get('screen').width}px`
    };

    if(Platform.os === "android"){
        style = orientation === "landscape"
            ? {
                height: `${Dimensions.get('window').width}px`,
                width: `${Dimensions.get('window').height}px`
            }
            : {
                height: `${Dimensions.get('window').height}px`,
                width: `${Dimensions.get('window').width}px`
            }
    }
   
    return {
        height: `${Dimensions.get('window').height}px`,
        width: `${Dimensions.get('window').width}px`
    }
}
export const Container = styled.View`
    background-color: #000;
    flex: 1;
    elevation: 1;
`

/* height: ${ ({ orientation }) => getOrientationStyles(orientation).height};
width: ${ ({ orientation }) => getOrientationStyles(orientation).width }; */
