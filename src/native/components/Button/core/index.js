import React, { Component } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styles from "../styles"
// import * as LinearGradient from "expo-linear-gradient";
import {LinearGradient} from "expo-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { AnimatedCircularProgress, AnimatedCircularInfinite} from "react-native-circular-progress"
import EStyleSheet from "react-native-extended-stylesheet"
import { gradients } from "../../../styles/variables"
import Logic from "../logic"
import CacheImage from "../../CacheImage"
import Preloader from "../../Preloader"
import Touchable from '../../Touchable';

//TODO: Сделать процентный размер кнопки
const StyledButton = ({
	gradient,
	icon,
	disabled = false,
	title = "",
	coinImage,
	type = "default",
	loading = false,
	theme = "accent",
	size = "medium",
	style={},
	...rest
}) => {
	const combinedStyles = [styles["button"], styles[`button_theme_${theme}`], styles[`button_size_${size}`], style]
	if (disabled) {
		combinedStyles.push(styles["button_status_disabled"])
	}
	const buttonInner = (
		<>
			<View style={[styles["button__inner"], ...(loading ? [{opacity: 0}]: [])]}>
				{
					(type === "coin" && (
						<View style={{ borderRightColor: 'rgba(255, 255, 255, 0.2)', borderRightWidth: 1, paddingRight: 8, marginRight: 8 }}>
							<CacheImage source={coinImage} style={{ width: 23, height: 23 }} resizeMode="contain" />
						</View>
					))
				}
				{icon && <FontAwesome style={[styles[`button__icon`], styles[`button__text_theme_${theme}`]]} name={icon} />}
				<Text style={styles[`button__text_theme_${theme}`]}>{title}</Text>
			</View>	
			{ loading && (
				<Preloader
					style={styles["button__preloader"]} 
					color={EStyleSheet.value('$screenBackgroundColor')} 
				/>
			)}
		</>
	)
	const Wrap = rest.onPress ? Touchable : View;
	if (gradient) {
		return (
			<Wrap {...rest}>
				<LinearGradient style={combinedStyles} {...gradients.MainGradient}>
					{buttonInner}
				</LinearGradient>
			</Wrap>
		)
	} else {
		return (
			<Wrap style={combinedStyles} {...rest}>
				{buttonInner}
			</Wrap>
		)
	}
}

export default Logic(StyledButton)

export const RoundedButton = ({ style = {}, icon, infiniteLoader, iconSize = 14, theme = "accent", size = "small", progress, ...rest }) => {
	const combinedStyles = [styles["round-button"], styles[`round-button_${size}`], styles[`button_theme_${theme}`], style]
	
	return (
		<Touchable style={combinedStyles} {...rest}>
			<View style={styles["round-button__progress"]}>
				{infiniteLoader ? (
					<AnimatedCircularInfinite
						size={55}
						width={4}
						duration={500}
						fill={40}
						tintColor={EStyleSheet.value("$accentBgTextColor")}
						backgroundColor={EStyleSheet.value("$accent")}
					/>
				) : (
					progress && (
						<AnimatedCircularProgress
							size={55}
							width={4}
							fill={Math.floor(progress)}
							// fill={50}
							rotation={360}
							// tintColor={"#000"}
							tintColor={EStyleSheet.value("$screenBackgroundColor")}
							// onAnimationComplete={() => console.log('onAnimationComplete')}
							backgroundColor={EStyleSheet.value("$accent")}
						/>
					)
				)}
			</View>
			{icon && <FontAwesome style={styles[`button__icon_theme_${theme}`]} size={iconSize} name={icon} />}
		</Touchable>
	)

	return (
		<TouchableOpacity style={combinedStyles} {...rest}>
			{progress ? (
				<View style={styles["round-button__progress"]}>
					<AnimatedCircularInfinite
						size={55}
						width={4}
						duration={500}
						prefill={40}
						tintColor={EStyleSheet.value("$accentBgTextColor")}
						backgroundColor={EStyleSheet.value("$accent")}
					/>
				</View>
			) : null}
			{icon && <FontAwesome style={styles[`button__icon_theme_${theme}`]} size={iconSize} name={icon} />}
		</TouchableOpacity>
	)
}
