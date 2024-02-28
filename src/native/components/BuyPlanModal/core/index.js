import React, { Component, Fragment } from "react"
import Plans from "../../../components/Plans"
import Modal from "react-native-modal"
import { connect } from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { TouchableOpacity, View, Text, SafeAreaView } from "react-native"
import styles from "../styles"
// import * as LinearGradient from "expo-linear-gradient";
import {LinearGradient} from "expo-linear-gradient";
import { gradients, config } from "../../../styles/variables"
import { compose } from "redux"
import { withNamespaces } from "react-i18next"

//TODO: Перенести buyPlansModal
class PlansModal extends Component {
	setOptions = options => this.setState({ ...options })
	closeModal = () => {
		// console.log("CLOSING PLANS MODAL!!!!!!!!")
		this.props.dispatch({ type: "PLANS_MODAL_CLOSE" })
	};

	openModal = () => {
		this.props.dispatch({ type: "PLANS_MODAL_OPEN" })
	};
	afterPurchase = () => {
		// console.log("afterPurchase plan modal ", this.props.plansModal);
		if (this.props.plansModal && this.props.plansModal.afterPurchase) {
			this.props.plansModal.afterPurchase()
		}
		this.closeModal()
	};
	render() {
		const { t, influencer } = this.props;
		// console.log("BUY PLAN MIDA");
		// const topRightButton = (
		//     <TouchableOpacity onPress = {this.closeModal}>
		//         <FontAwesome style={styles["buy-plans__close"]} name={"times"}/>
		//     </TouchableOpacity>
		// );
		// console.error("BUY PLAN MODAL");
		return (
			<Fragment>
				<Modal
					style={styles["plans-modal"]}
					isVisible={this.props.plansModal.isOpen}
					onBackButtonPress={this.closeModal}
					onBackdropPress={this.closeModal}
					animationIn={"slideInRight"}
					animationOut={"slideOutRight"}
					animationInTiming={150}
					animationOutTiming={150}
					// swipeDirection = "right"
					useNativeDriver
				>
					{/*<RoundedLayout>*/}
					<PlansModalHeader headerStyle={config.headerBackgroundStyle}>
						<SafeAreaView style={styles["plans-modal__header"]}>
							<TouchableOpacity style={styles["plans-modal__header-back"]} onPress={this.closeModal}>
								<FontAwesome style={styles["plans-modal__header-back-icon"]} name={"angle-left"} />
							</TouchableOpacity>
							<View style={styles["plans-modal__header-title"]}>
								<Text style={styles["plans-modal__header-title-small"]}>
									{t("app_tariff:access_content_text")}
								</Text>
								<Text style={styles["plans-modal__header-title-big"]}>
									{(influencer && influencer.coinsEnabled)?t("app_tariff:purchase_coins"): t("app_tariff:choose_plan")}
								</Text>
							</View>
						</SafeAreaView>
					</PlansModalHeader>
					<View style={{ flex: 1 }}>
						<Plans {...this.state} afterPurchase={this.afterPurchase} />
					</View>
					<View style={styles["plans-modal__footer"]}>
						<TouchableOpacity style={styles["plans-modal__footer-back"]} onPress={this.closeModal}>
							<FontAwesome style={styles["plans-modal__footer-back-icon"]} name={"angle-left"} />
							<Text style={styles["plans-modal__footer-back-text"]}>{t("app_basic:go_back_button")}</Text>
						</TouchableOpacity>
					</View>
					{/*</RoundedLayout>*/}
				</Modal>
			</Fragment>
		)
	}
}

const PlansModalHeader = ({ headerStyle, children }) => {
	switch (headerStyle) {
		case "gradient":
			return <LinearGradient {...gradients.MainGradient}>{children}</LinearGradient>
		default:
			return <View style={styles["plans_modal__header-overlay"]}>{children}</View>
	}
};

export default compose(
	withNamespaces(["app_basic", "app_tarif"], { wait: true }),
	connect(({ plansModal, influencer }) => ({ plansModal, influencer }))
)(PlansModal)
