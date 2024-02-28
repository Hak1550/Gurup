import React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import Modal from "react-native-modal"
import styles from "../styles"
import Logic from "../logic"

// {t("app_basic:all_categories")}

const FiltersModal = ({ state, filterData, modalVisible = false, toggleModal, tags, activeClassAll, t }) => {
	return (
		<Modal
			isVisible={modalVisible}
			onBackButtonPress={() => toggleModal()}
			onBackdropPress={() => toggleModal()}
			animationIn={"slideInRight"}
			animationOut={"slideOutRight"}>
			<View style={styles["filter__modal"]}>
				<Text style={styles["filter__modal-title"]}>{t("app_courses:filter_heading")}</Text>
				<ScrollView showsVerticalScrollIndicator={false}>
					<TouchableOpacity style={styles["filter__modal-item"]} onPress={() => filterData()}>
					<Text style={styles[`filter__modal-item-text${activeClassAll}`]}>{t("app_basic:all_categories")}</Text>
					</TouchableOpacity>
					{tags.map(tag => {
						const activeClass = state.activeTag === tag._id ? "-active" : ""
						return (
							<TouchableOpacity
								key={tag._id}
								style={styles["filter__modal-item"]}
								onPress={() => {
									// console.log("tag._id ->", tag._id)
									// console.log("tag clicked")
									filterData(tag._id)
								}}>
								<Text style={styles[`filter__modal-item-text${activeClass}`]}>{tag.name}</Text>
							</TouchableOpacity>
						)
					})}
				</ScrollView>
			</View>
		</Modal>
	)
}

export default Logic(FiltersModal)
