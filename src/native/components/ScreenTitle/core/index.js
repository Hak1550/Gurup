import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import styles from "../styles"
import Avatar from "../../Avatar"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { Actions } from "react-native-router-flux"
import { isTall } from "../../../utils"
import { config } from "../../../styles/variables"
import Logic from "../logic"

const ScreenTitle = ({
	title,
	subtitle,
	getAvatar = true,
	backButton = true,
	onBackButtonClick = Actions.pop,
	filterButton,
	avatarUri,
	me,
	influencer = {},
	hideProfile = false,
	...rest
}) => {
	const WrapComponent = backButton ? TouchableOpacity : View;
	return (
		<View style={styles["screen-title__wrapper"]}>
			{isTall() ? (
				<WrapComponent
					style={styles["screen-title__navigation-left"]}
					onPress={() => onBackButtonClick()}>
					{backButton && (
						<FontAwesome
							style={styles["screen-title__navigation-arrow-icon"]}
							name={"angle-left"}
						/>
					)}
					<Text style={styles["screen-title__logo"]}>{title}</Text>
				</WrapComponent>
			): (
				<>
					<WrapComponent
						style={styles["screen-title__navigation-left"]}
						onPress={() => onBackButtonClick()}>
						{backButton ? (
							<FontAwesome
								style={styles["screen-title__navigation-arrow-icon"]}
								name={"angle-left"}
							/>
							) : <View style={styles["screen-title__navigation-arrow-icon"]}/>}
					</WrapComponent>
					{/* <View style={styles["screen-title__logo"]}> */}
					<Text style={styles["screen-title__logo"]}>
						{title}
					</Text>
					{/* </View> */}
				</>
			)}
			{!hideProfile ? (
				<TouchableOpacity style={styles["screen-title__user"]} onPress={() => Actions.settings()}>
					{/* {isTall() && <Text style={styles["screen-title__user-name"]}>{me.name}</Text>} */}
					<Avatar uri={me.avatar} name={me.name} />
				</TouchableOpacity>
			) : <View style={styles["screen-title__user"]}/>}
		</View>
	);
}

export default Logic(ScreenTitle)
