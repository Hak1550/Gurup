import React, { Fragment } from 'react'
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, StatusBar } from 'react-native'
import styles, { SettingsHeaderContent, SettingsHeaderTop } from '../styles'
import moment from 'moment'
import { Formik } from 'formik'
import * as yup from 'yup'
import { gradients } from '../../../styles/variables'
import Avatar from '../../Avatar'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import ChangePassword from './../ChangePassword'
import PickImageWithUpload from '../../../components/PickImageWithUpload'
import ScreenTitle from '../../ScreenTitle'
import EStyleSheet from 'react-native-extended-stylesheet'
import { config } from '../../../styles/variables'
import Logic from '../customLogic'
import DatePicker from 'react-native-datepicker'

const editProfileSchema = yup.object().shape({
	name: yup.string().min(2),
	email: yup.string().email(),
	birthDate: yup.string(),
	phone: yup.number().min(8),
})

const SettingsLayout = ({
	state,
	toggleEditBtn,
	saveUser,
	onUploadAvatar,
	children,
	me,
	statusBarColor = '#fff',
	statusBarStyle = 'light-content',
	toggleLoadingAvatar
}) => {
	// LanguageFixNeeded?

	// Вид компонента если профиль редактируетсяf
	const profileEditedView = ({ formProps }) => {
		return (
			<View style={styles['layout-settings__head-content']}>
				<View style={styles['layout-settings__head-content-userbtn']}>
					<View style={styles['layout-settings__head-content-input__container']}>
						<FontAwesome name="user-o" style={styles['layout-settings__head-content-input__icon']} />
						<TextInput
							style={styles['layout-settings__head-content-input']}
							underlineColorAndroid="rgba(0,0,0,0)"
							onChangeText={formProps.handleChange('name')}
							onBlur={() => formProps.setFieldTouched('name')}
							value={formProps.values.name}
							name="name"
						/>
					</View>
					<View style={styles['layout-settings__head-content-input__container']}>
						<FontAwesome name="envelope-o" style={styles['layout-settings__head-content-input__icon']} />
						<TextInput
							style={styles['layout-settings__head-content-input']}
							underlineColorAndroid="rgba(0,0,0,0)"
							onChangeText={formProps.handleChange('email')}
							onBlur={() => formProps.setFieldTouched('email')}
							value={formProps.values.email}
							name="email"
						/>
					</View>
					<View style={styles['layout-settings__head-content-input__container']}>
						<FontAwesome name="phone" style={styles['layout-settings__head-content-input__icon']} />
						<TextInput
							keyboardType="number-pad"
							style={styles['layout-settings__head-content-input']}
							underlineColorAndroid="rgba(0,0,0,0)"
							onChangeText={formProps.handleChange('phone')}
							onBlur={() => formProps.setFieldTouched('phone')}
							value={formProps.values.phone}
							name="phone"
						/>
					</View>
					<View style={styles['layout-settings__head-content-input__container']}>
						<FontAwesome name="instagram" style={styles['layout-settings__head-content-input__icon']} />
						<TextInput
							style={styles['layout-settings__head-content-input']}
							underlineColorAndroid="rgba(0,0,0,0)"
							onChangeText={formProps.handleChange('instagram')}
							onBlur={() => formProps.setFieldTouched('instagram')}
							value={formProps.values.instagram}
							name="instagram"
						/>
					</View>
					<View style={styles['layout-settings__head-content-input__container']}>
						<FontAwesome name="birthday-cake" style={styles['layout-settings__head-content-input__icon']} />
						<DatePicker
							mode="date"
							date={formProps.values.birthDate}
							androidMode="spinner"
							format="DD/MM/YYYY"
							minDate={moment()
								.add(-100, 'years')
								.toDate()}
							maxDate={moment()
								.add(-10, 'years')
								.toDate()}
							showIcon={false}
							confirmBtnText="Подтвердить"
							cancelBtnText="Отменить"
							customStyles={{
								dateInput: {
									borderWidth: 0,
									alignItems: 'flex-start',
									fontFamily: 'Main-Regular',
									height: 'auto',
								},
								dateText: {
									color: '#000',
									fontSize: 16,
								},
								dateTouchBody: {
									height: 'auto',
								},
							}}
							onDateChange={date =>
								formProps.setFieldValue('birthDate', moment(date, 'DD/MM/YYYY').toDate())
							}
						/>
					</View>
				</View>
			</View>
		)
	}

	// Кнопка редактирования профиля
	const editProfileButton = submit => (
		<TouchableOpacity
			style={styles['layout-settings__edit-profile-btn']}
			onPress={() => (state.editedProfile ? submit() : toggleEditBtn())}>
			<View style={styles['layout-settings__edit-profile-content']}>
				<FontAwesome
					style={styles['edit-profile-btn__icon']}
					name={state.editedProfile ? 'floppy-o' : 'pencil'}
				/>
			</View>
		</TouchableOpacity>
	)

	const changeAvatarButton = () => (
		<TouchableOpacity style={styles['layout-settings__edit-profile-btn']}>
			<PickImageWithUpload
				onUpload={avatar => {
					// console.log('onUploadAvatar 2 ', avatar)
					onUploadAvatar(avatar);
					toggleLoadingAvatar(false);
				}}
				onDrop={()=>{
					// console.log("drop");
					toggleLoadingAvatar(true);
				}}
				// onUploadProgress={(progress)=>{
					// console.log("onUploadProgress ",progress)
				// }}
				>
				<View style={styles['layout-settings__edit-profile-content']}>
					<FontAwesome style={styles['edit-profile-btn__icon']} name={'camera'} />
				</View>
			</PickImageWithUpload>
		</TouchableOpacity>
	)

	// Внешний вид компонента
	return (
		<Fragment>
			<StatusBar backgroundColor={statusBarColor} barStyle={statusBarStyle} />
			<View style={[styles['layout-settings__head'], { backgroundColor: EStyleSheet.value('$screenBackgroundColor') }]}>
				{config.headerBackgroundStyle === 'image' && (
					<Image
						style={styles['layout-settings__head-overlay']}
						source={
							config.appDomain
								? require('../../../assets/custom/layout-bg.jpg')
								: require('../../../assets/core/layout-bg.jpg')
						}
					/>
				)}
				<ScreenTitle backButton getAvatar={false} />
			</View>
			<ScrollView style={[styles['layout-settings']]}>
				<SettingsHeaderContent>
					<Formik
						initialValues={{
							email: me.email,
							name: me.name,
							birthDate: me.birthDate,
							phone: me.phone,
							instagram: me.instagram,
						}}
						validationSchema={editProfileSchema}
						onSubmit={values => saveUser(values)}>
						{props => (
							<Fragment>
								<SettingsHeaderTop>
									{changeAvatarButton()}
									<Avatar
										width={112}
										height={112}
										uri={state.avatar || me.avatar}
										name={me.name}
										fontSize={48}
										loading={state.avatarLoading}
									/>
									{editProfileButton(props.handleSubmit)}
								</SettingsHeaderTop>
								{state.editedProfile && profileEditedView({ formProps: props })}
							</Fragment>
						)}
					</Formik>
					{!state.editedProfile && (
						<View style={styles['layout-settings__head-content']}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-between',
								}}
							/>
							<View style={styles['layout-settings__head-content-userbtn']}>
								{me.name && (
									<Text style={styles['layout-settings__head-content-username']}>{me.name}</Text>
								)}
								{me.email && (
									<Text style={styles['layout-settings__head-content-label']}>
										<FontAwesome
											name={'envelope-o'}
											style={styles['layout-settings__head-content-label__icon']}
										/>{' '}
										{me.email}
									</Text>
								)}
								{me.phone && (
									<Text style={styles['layout-settings__head-content-label']}>
										<FontAwesome
											name={'phone'}
											style={styles['layout-settings__head-content-label__icon']}
										/>{' '}
										{me.phone}
									</Text>
								)}
								{me.influencerData && me.influencerData.geolocationAddress ? (
									<Text style={styles['layout-settings__head-content-label']}>
										<FontAwesome
											name={'map-marker'}
											style={styles['layout-settings__head-content-label__icon']}
										/>{' '}
										{me.influencerData.geolocationAddress}
									</Text>
								) : null}
								{me.instagram ? (
									<Text style={styles['layout-settings__head-content-label']}>
										<FontAwesome
											name={'instagram'}
											style={styles['layout-settings__head-content-label__icon']}
										/>{' '}
										{me.instagram}
									</Text>
								) : null}
							</View>
						</View>
					)}
				</SettingsHeaderContent>

				<View style={styles['layout-settings__body']}>
					<ChangePassword />
					{children}
				</View>
			</ScrollView>
		</Fragment>
	)
}

export default Logic(SettingsLayout)
