import React from "react"
import { ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import MainLayout from "../../../components/MainLayout"
import styles from "../styles"
import Button from "../../../components/Button"
import DismissKeyboard from "../../../components/DismissKeyboard"
import FileInput from "../../../components/FileInput"
import Logic from "../logic"
import testMode from "../../../utils/debug"
import {manifest} from 'expo-updates';

const { id, sdkVersion, revisionId, releaseChannel } = manifest;

const ProblemReport = ({ state, send, onFilePick, onFileRemove, _onChangeText, t }) => {
	// console.log("Expo.Constants.manifest ",Expo.Constants.manifest);
	return (
		<MainLayout screenTitle={ t("app_support:support_heading") } getAvatar={ false }>
			<DismissKeyboard>
				<ScrollView style={ styles["report"] }>
					<View style={ styles["report__inner"] }>
						<Text style={ styles["report__header-text"] }>{ t("app_support:support_title") }</Text>
						<TouchableWithoutFeedback onPress={ () => {
							testMode()
						} }>
							<Text style={ styles["report__body-text"] }>
								{ t("app_support:support_subtitle") }{ "\n\n" }
								{ sdkVersion ? ("Sdk version: " + sdkVersion + "\n") : null }
								{ revisionId ? ("revisionId: " + revisionId + "\n") : null }
								{ id ? ("id: " + id + "\n") : null }
								{ releaseChannel ? ("releaseChannel: " + releaseChannel + "\n") : null }
							</Text>
						</TouchableWithoutFeedback>

						<TextInput
							multiline={ true }
							numberOfLines={ 4 }
							style={ styles["report__input"] }
							placeholder={ t("app_support:textarea_placeholder") }
							underlineColorAndroid='rgba(0,0,0,0)'
							value={ state.text }
							onChangeText={ text => _onChangeText(text) }
						/>
						<View style={ styles["report__input-wrap"] }>
							<FileInput onFilePick={ onFilePick } onFileRemove={ onFileRemove }
							           files={ state.files }/>
						</View>
						<View style={ styles["report__button-wrapper"] }>
							<Button
								onPress={ send }
								title={ t("app_support:send_button") }
								theme="ghost-accent"
							/>
						</View>
					</View>
				</ScrollView>
			</DismissKeyboard>
		</MainLayout>
	)
}

export default Logic(ProblemReport)
