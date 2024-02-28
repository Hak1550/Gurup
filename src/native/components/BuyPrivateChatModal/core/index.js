import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Modal from "react-native-modal";
import styles from "../styles";
import Logic from "../logic";
import DateTimePicker from "react-native-modal-datetime-picker"
import Button from "../../Button"
import { config } from "../../../styles/variables";

const BuyPrivateChatModal = ({ modalVisible, toggleModal, buttonAction,influencer, t }) => {
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
				
				<Text style={styles["buy-chat__modal_text"]}>{t("buy_description")}</Text>
				{(influencer.coinsEnabled && !influencer.privateChatCoinPrice )?(
					null
				):(
					<Button
						theme={'accent'}
						title={
							
							!influencer.coinsEnabled?
								t("buy_button",{
								price:influencer.privateChatPrice,
								currency: influencer.privateChatCurrency
							})
							: t("buy_with_coins", {
								coinPrice: influencer.privateChatCoinPrice,
								coinName: influencer.coinName
							})
						}
						onPress={() => buttonAction()}
						type={influencer.coinsEnabled?"coin":"default"}
						coinImage={influencer.coinImage}
					/>
				)}
			</View>
		</Modal>
	);
};

export default Logic(BuyPrivateChatModal);
