import React, { Fragment } from "react";
import {LinearGradient} from "expo-linear-gradient";
import { View } from "react-native";
import { gradients } from "../../styles/variables";
import EStyleSheet from "react-native-extended-stylesheet";

const LinearGradientOverlay = ({ width = "100%", height = "100%", opacity = 1, gradient="MainGradient", type="gradient" }) => {
	// console.log("LinearGradient ",LinearGradient);
	const overlayStyles = {
		width,
		height,
		position: "absolute",
        opacity,
    };
    switch (type) {
		case "gradient":
			return (
				<Fragment>
					<LinearGradient style={overlayStyles} {...gradients[gradient]} />
				</Fragment>
			);
		case "color":
			return (
				<Fragment>
					<View style={{...overlayStyles, backgroundColor: EStyleSheet.value("$lessonItemActiveColor")}} />
				</Fragment>
			);
		default:
			return (
				<Fragment>
					<LinearGradient style={overlayStyles} {...gradients[gradient]} />
				</Fragment>
			);
	}
};

export default LinearGradientOverlay;
