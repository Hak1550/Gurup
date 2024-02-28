import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Modal from "react-native-modal";
import styles from "../styles";
import Logic from "../logic";
import DateTimePicker from "react-native-modal-datetime-picker"
import Button from "../../Button"
import Input from '../../Input';

const ForgotModal = ({ state, modalVisible, onEmailChange, toggleModal, buttonAction,influencer, t }) => {
	let datepciker = true
	// console.log("coinsEnabled ",influencer);
	return (
		<Modal
			isVisible={modalVisible}
			onBackButtonPress={() => toggleModal()}
			onBackdropPress={() => toggleModal()}
			animationIn={"slideInRight"}
			animationOut={"slideOutRight"}>
			<View style={styles["buy-chat__modal"]}>
				
				<Text style={styles["buy-chat__modal_text"]}>{t("forgot_description")}</Text>
				<Input
					icon={'envelope-o'}
					style={styles["forgot-password__input"]}
					placeholder={t('email')}
					name="email"
					onChangeText={onEmailChange}
					value={state.email}
				/>
				<Button
					theme={'accent'}
					title={t("recover_password")}
					onPress={() => buttonAction()}
					type={"default"}
				/>
			</View>
		</Modal>
	);
};

export default Logic(ForgotModal);
