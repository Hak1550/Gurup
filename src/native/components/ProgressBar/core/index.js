import React from "react";
import {View, Animated} from 'react-native';
import styles from '../styles';
import Logic from '../logic'

const ProgressBar = ({ state, style, width }) => {
    return (
        <View style={[styles['progress'], style]}>
            <Animated.View
                style={[styles['progress__line'], { width: width }]}
            />
        </View>
    );
}

export default Logic(ProgressBar);




