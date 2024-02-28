import React from "react";
import {View} from "react-native";
import styles from "../styles";
// import * as LinearGradient from 'expo-linear-gradient';
import {LinearGradient} from "expo-linear-gradient";
import {gradients} from "../../../styles/variables";

const NStatusBar = ({to = 0.68, style = {}}={}) => (
	<View style={[styles['statusbar-wrapper'], style]}>
		<View
			style={[styles['statusbar-wrapper__status'], style]}
		>
			<View style={[styles["statusbar__line"], { width: `${to * 100}%` }]}/>
		</View>
  	</View>
);


export default NStatusBar
