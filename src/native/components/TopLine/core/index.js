import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "../styles";
import Avatar from "../../Avatar";
import { Actions } from "react-native-router-flux";
import Logic from "../logic";

const TopLine = ({ getAccountButton = true, me, bloggersName, centerTitle = false }) => {
	return (
		<View style={styles["top-line__wrapper"]}>
			<Text style={[styles["top-line__logo"], centerTitle && styles["top-line__logo-center"]]}>{bloggersName}</Text>
			{getAccountButton && (
				<TouchableOpacity style={styles["top-line__user"]} onPress={() => Actions.settings()}>
					<Text style={styles["top-line__user-name"]}>{me.name}</Text>
					<Avatar uri={me.avatar} name={me.name} />
				</TouchableOpacity>
			)}
		</View>
	);
};

export default Logic(TopLine);
