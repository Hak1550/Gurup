import React, {Fragment} from "react";
import { View, Text} from "react-native";
import styles from "../styles";
import Logic from '../logic'
import CacheImage from "../../CacheImage"
import Preloader from '../../Preloader';
import { useTheme } from "styled-components";

const Avatar = ({ width=35, height=35, fontSize=16, uri="", name="",loading = false}) => {
  const userName = name.replace(/([\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251])/g, '').slice(0, 1).toUpperCase()
  const theme = useTheme();
  return (
  <View style={ styles['avatar'] }>
    <View style={ [styles['avatar__non-image'], { width: width, height: height, borderRadius: width / 2 }] }>
      {!uri || loading ? (
        <Text style={ [styles['avatar__name-text'], { fontSize: fontSize }] }>{userName}</Text>
        ) : null 
      }
    </View>
    { uri && !loading ? (
      <CacheImage
          style={ [styles['avatar__image'], { width: width, height: height, borderRadius: width / 2, overflow: "hidden" }] }
          source={ uri }
      />
    ) : null}
  </View>
  )
};


export default Logic(Avatar)
