import React, { Component } from "react";
import { View, Text , Image } from "react-native";
import WelcomeLayout from "../../../../components/WelcomeLayout";
import styles from "../styles";

const About = ({ dimensions: { width, height }, ...rest }) => {
	return (
		<WelcomeLayout image = {false} title={""} style={{ width, height }} {...rest}>
			<View style = {styles["about"]}>
				<View style = {styles['about__steps']}>
					<View style={[styles["about__step"], styles["about__step_3"]]}>
						<Image
							resizeMode={'contain'}
							style={styles["about__step-img"]}
							source={require('../../../../assets/core/step3.png')}
						/>
					</View>
					<View style={[styles["about__step"], styles["about__step_2"]]}>
						<Image
							resizeMode={'contain'}
							style={styles["about__step-img"]}
							source={require('../../../../assets/core/step2.png')}
						/>
					</View>
					<View style={[styles["about__step"], styles["about__step_1"]]}>
						<Image
							resizeMode={'contain'}
							style={styles["about__step-img"]}
							source={require('../../../../assets/core/step1.png')}
						/>
					</View>
				</View>
				<Text style={styles['about__text']}>A few photos describing what this app can do</Text>
			</View>
		</WelcomeLayout>
	)
}

export default About
