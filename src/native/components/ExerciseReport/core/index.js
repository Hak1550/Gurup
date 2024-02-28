import React from "react"
import { Text, View, TouchableOpacity } from "react-native"
import styles from "../styles"
import ReportSend from "../../ReportSend"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Logic from "../logic"
import ChatMessage from "../../../components/ChatMessage"

const ExerciseReport = ({ reportStatus, goToChat, chat, exercise, me, t, ...props }) => {
	return (
		<View style={{ flex: 1 }}>
			<View style={styles["report__buttons"]}>
				<TouchableOpacity>
					{exercise && exercise.report && exercise.report.status ? (
						<Text style={styles["report__button-send"]}>
							{t("app_marathon_status_" + exercise.report.status)}
							{reportStatus && <FontAwesome style={styles["report__button-send-icon"]} name={"check"} />}
						</Text>
					) : null}
				</TouchableOpacity>
				{chat ? (
					<TouchableOpacity onPress={goToChat}>
						<Text style={styles["report__button-discuss"]}>
							{t("app_marathon:discuss_in_chat") + " "}
							<FontAwesome style={styles["report__button-discuss-icon"]} name={"commenting"} />
						</Text>
					</TouchableOpacity>
				) : null}
			</View>
			{exercise &&
			exercise.report &&
			exercise.report.chat &&
			exercise.report.chat.messages &&
			exercise.report.chat.messages.length ? (
				<View style={{ flex: 1, padding: 20 }}>
					{exercise.report.chat.messages.map(message => (
						<ChatMessage
							_id={message._id}
							key={message._id}
							active={me._id === message.user._id}
							user={message.user.name}
							message={message.text}
							attachments={message.attachments}
							userAvatar={message.user.avatar}
							date={message.createdAt}
						/>
					))}
				</View>
			) : null}

			{!reportStatus && <ReportSend inputPlaceholder={t("app_marathon:report_input_placeholder")} courseType={props.courseType}/>}
		</View>
	)
}

export default Logic(ExerciseReport)
