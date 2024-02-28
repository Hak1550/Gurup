import React from "react";
import {View, Text} from "react-native";
import styles from "../styles";
import Logic from '../logic'

const Tag = ({ title = '', ...rest }) => {
    return (
        <View style={styles['tag']}>
            <Text style={styles['tag-text']}>{title}</Text>
        </View>
    )
};

export default Logic(Tag)
