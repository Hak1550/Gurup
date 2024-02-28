import React, { Fragment } from "react"
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StatusBar } from "react-native"
import styles from "../styles"
// import * as LinearGradient from "expo-linear-gradient";
import {LinearGradient} from "expo-linear-gradient";
import { gradients } from "../../../styles/variables"
import Avatar from "../../Avatar"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import TopLine from "../../TopLine"
import ChangePassword from "./../ChangePassword"
import PickImageWithUpload from "../../../components/PickImageWithUpload"
import ScreenTitle from "../../ScreenTitle"
import { Screen320 } from "../../../utils"
import EStyleSheet from "react-native-extended-stylesheet"
import { config } from "../../../styles/variables"
import Logic from "../logic"
import CacheImage from "../../CacheImage"
import { Actions } from "react-native-router-flux"
import MainLayout from "../../MainLayout";

const SettingsLayout = ({
	state,
	toggleEditBtn,
	saveUser,
	handleFieldName,
	handleFieldEmail,
	onUploadAvatar,
	onUploadProgress,
	children,
	influencer,
	me,
	statusBarColor="#fff",
	statusBarStyle="light-content",
	toggleLoadingAvatar,
	t
}) => {

	if(influencer && influencer.template =="black"){
		if(statusBarStyle =="dark-content"){
			statusBarStyle="light-content";
		}
	}

	// Вид компонента если профиль редактируется
	const profileEditedView = () => {
		return (
			<View style={styles["layout-settings__head-content"]}>
				<View style={styles["layout-settings__head-avatar"]}>
					<PickImageWithUpload
						onUpload={(avatar) => {
							onUploadAvatar(avatar)
							toggleLoadingAvatar(false);
						}}
						onUploadProgress={onUploadProgress}
						onDrop={()=>{
							toggleLoadingAvatar(true);
						}}
						allowsEditing
					>
						<Avatar
							width={83}
							height={83}
							uri={state.avatar}
							name={me.name}
							fontSize={48}
							loading={state.avatarLoading}
						/>
					</PickImageWithUpload>
				</View>
				<View style={styles["layout-settings__head-content-userbtn"]}>
					<Text style={styles["layout-settings__head-content-label"]}>
						{t("app_basic:username")}
					</Text>
					<TextInput
						value={state.name}
						style={styles["layout-settings__head-content-input-name"]}
						underlineColorAndroid='rgba(0,0,0,0)'
						onChangeText={handleFieldName}
					/>
					<Text style={styles["layout-settings__head-content-label"]}>
						{t("app_basic:email")}
					</Text>
					<TextInput
						value={state.email}
						style={styles["layout-settings__head-content-input-email"]}
						underlineColorAndroid='rgba(0,0,0,0)'
						onChangeText={handleFieldEmail}
					/>
				</View>
			</View>
		)
	}

	// Кнопка редактирования профиля
	const editProfileButton = () => (
		<TouchableOpacity
			style={styles["layout-settings__edit-profile-btn"]}
			onPress={() => {
				// console.log("edit profile pressed ",state.editedProfile );
				state.editedProfile ? saveUser() : toggleEditBtn()
			}}>
			<View style={styles["layout-settings__edit-profile-content"]}>
				{/* <LinearGradient
					style={styles["layout-settings__edit-profile__gradient-overlay"]}
					{...gradients.MainGradient}
				/> */}
				<FontAwesome
					style={styles["edit-profile-btn__icon"]}
					name={state.editedProfile ? "floppy-o" : "pencil"}
				/>
			</View>
		</TouchableOpacity>
	)
	// Внешний вид компонента
	return (
		<Fragment>
			<StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
			<MainLayout skipEmailConfirmation hideProfile>
				<View style={[styles["layout-settings"]]}>
					<SettingsHeader>
						{state.editedProfile && profileEditedView()}
						{!state.editedProfile && (
							<View style={styles["layout-settings__head-content"]}>
								<View style={styles["layout-settings__head-avatar"]}>
									<Avatar
										width={83}
										height={83}
										uri={me.avatar}
										name={me.name}
										fontSize={48}
									/>
								</View>
								<View style={styles["layout-settings__head-content-userbtn"]}>
									<Text style={styles["layout-settings__head-content-label"]}>
										{t("app_basic:username")}
									</Text>
									<Text style={styles["layout-settings__head-content-username"]}>{me.name}</Text>
									<Text style={styles["layout-settings__head-content-label"]}>
										{t("app_basic:email")}
									</Text>
									<Text style={styles["layout-settings__head-content-email"]}>
										{me.email}
									</Text>
									<View style={styles["layout-settings__head-content-coins"]}>
										{(influencer && influencer.coinsEnabled && me.influencerData && me.influencerData.coins != null) ? (
											<Fragment>
												<CacheImage
													source={influencer.coinImage}
													style={{ width: 20, height: 20, marginRight: 10 }}
													resizeMode="contain"
												/>
												<Text style={styles["layout-settings__head-content-coins__count"]}>
													{me.influencerData.coins} {influencer.coinName}
												</Text>
												<TouchableOpacity style={styles['layout-settings__head-content-coins__button']} onPress={Actions.guruCoins}>
													<Text style={styles['layout-settings__head-content-coins__button-icon']}>+</Text>
												</TouchableOpacity>
											</Fragment>
										) : null}
									</View>
								</View>
							</View>
						)}
					</SettingsHeader>

					<View style={styles["layout-settings__body"]}>
						<ScrollView showsVerticalScrollIndicator={false}>
							{/* <ChangePassword /> */}
							{children}
						</ScrollView>
					</View>

					{editProfileButton()}
				</View>
			</MainLayout>
		</Fragment>
	)
}

// Компонент хедерера. Так как в зависимости от размера экрана он менятся
const SettingsHeader = ({ children }) => {
	return (
		<View style={styles["layout-settings__head"]}>
			{children}
		</View>
	)
}

export default Logic(SettingsLayout)
