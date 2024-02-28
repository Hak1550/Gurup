import React, { Fragment } from "react"
import { Image, ScrollView, Text, View } from "react-native"
import MainLayout from "../../../components/MainLayout"
import NStatusBar from "../../../components/Statusbar"
import styles from "../styles"
import MarathonCard from "../../../components/MarathonCard"
import CalendarStrip from "react-native-calendar-strip"
import moment from "moment"
import EStyleSheet from "react-native-extended-stylesheet"
import Logic from "../logic"
import { paletteNumber } from "../../../styles/variables"
import { languageDetector } from "../../../i18n"
import Preloader from "../../../components/Preloader"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import RestDay from "../../../assets/core/svg-icon/rest_day";
import MarathonFailed from "../../../assets/core/svg-icon/marathon_failed";
import MarathonDone from "../../../assets/core/svg-icon/marathone_done";

let locales = [
	{
		name: "en",
		config: {
			weekdaysShort: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
			weekdaysMin: ["sun", "mon", "tue", "wed", "thu", "fri", "sat" ],
		},
	},
	{
		name: "ru",
		config: {
			weekdaysShort: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
			weekdaysMin: ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
		},
	},
	{
		name: "fr",
		config: {
			weekdaysShort: ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"],
			weekdaysMin: ["di", "lu", "ma", "me", "je", "ve", "sa"],
		}
	}
]

class MarathonMain extends React.Component {
	state = {
		locale: locales && locales.length && locales[0] ? locales[0] : null,
	}
	async componentDidMount() {
		try{
			let locale
			languageDetector.detect(lng => {
				try {
					lng = lng.split("-")[0]
				} catch (e) {}
				if (
					locales &&
					locales.length &&
					locales.find(l => {
						return l.name == lng
					})
				) {
					locale = locales.find(l => {
						return l.name == lng
					})
				} else if (locales && locales.length) {
					locale = locales[0]
				}
				this.setState({ locale })
			})
		}catch(e){
			locale = locales[0]
			this.setState({ locale })
		}
	}

	render() {
		const {
			state,
			marathon,
			dailyExercises,
			_onSelectDate,
			t,
			markedDays,
			progress,
			goToLesson,
			isCompleteExercise,
			isCompleteMarathon,
			loading
		} = this.props

		const { locale } = this.state
		const noMarathon = !marathon || !marathon._id
		// console.log("SELECTED DATE", state.selectedDate);
		return (
			<MainLayout
				screenTitle={noMarathon ? t("app_marathon:marathon_heading") : false}
				backButton={false}
				withProgress
				progress={progress}
				calendar={
					noMarathon ? null : (
						<CalendarStrip
							minDate={moment(marathon.startDate)}
							maxDate={moment(marathon.finishDate)}
							selectedDate={state.selectedDate}
							markedDates={markedDays}
							datesWhitelist={[
								{
									start: moment(marathon.startDate),
									end: moment(marathon.finishDate),
								},
							]}
							key={ (locale && locale.name)?locale.name: Math.random() }
							calendarAnimation={{ type: "sequence", duration: 30 }}
							style={{ height: 60 }}
							showMonth={false}
							onDateSelected={date => {
								_onSelectDate(date)
							}}
							shouldAllowFontScaling={false}
							useIsoWeekday
							// updateWeek
							rightSelector={<FontAwesome style={styles["marathon-calendar__right"]} name="angle-right" />}
							leftSelector={<FontAwesome style={styles["marathon-calendar__left"]} name="angle-left"/>}
							startingDate={moment().toDate()}
							// startingDate={(moment(marathon.startDate).add(7, 'days').toDate() >= moment().toDate() ) ? marathon.startDate : Date.now()}
							dateNameStyle={{
								color: EStyleSheet.value("$additionalTextColor"),
								fontSize: 12,
								marginBottom: 4
							}}
							dateNumberStyle={{ color: EStyleSheet.value("$textColor"), fontSize: 16 }}
							disabledDateNameStyle={{ color: EStyleSheet.value("$additionalTextColor") }}
							disabledDateNumberStyle={{ color: EStyleSheet.value("$additionalTextColor") }}
							highlightDateNameStyle={{ color: EStyleSheet.value("$textColor"), fontSize: 12}}
							highlightDateNumberStyle={{
								color: EStyleSheet.value('$screenBackgroundColor'),
								fontSize: 16,
								backgroundColor: EStyleSheet.value('$accent'),
								borderRadius: 13,
								width: 26,
								paddingTop: 2,
								height: 26,
								textAlign: 'center',
								overflow: 'hidden',
							}}
							locale={(locale)?locale:locales[0]}
						/>
					)
				}
			>
				{loading ? <Preloader /> : (
					<>
						{noMarathon ? (
							// TODO: Сделать картинкой, когда будет готово
							<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
								<Image
									source={require("../../../assets/core/no-messages.png")}
									style={{ width: 300, height: 300 }}
								/>
								<Text style={{ width: "100%", textAlign: "center", fontSize: 20 }}>
									{t("app_marathon:no_marathon")}
								</Text>
							</View>
						) : (
								<Fragment>
									{/* <NStatusBar to={progress} /> */}
									{isCompleteMarathon === "marathon_not_finish" && dailyExercises && dailyExercises.length ? (
										<ScrollView contentContainerStyle={styles["marathon-content"]}>
											{dailyExercises.map(ex => (
												<MarathonCard
													t={t}
													exercise={ex}
													key={ex._id}
													marathonStart={marathon.startDate}
													exercises={dailyExercises}
													isCompleteExercise={isCompleteExercise}
													onPress={() => goToLesson(ex)}
												/>
											))}
										</ScrollView>
									) : (
											isCompleteMarathon === "marathon_not_finish" && (
												<ScreenPlaceholder
													text={t("app_marathon:day_rest_title")}
													imageComponent={<RestDay/>}
												/>
											)
										)}
									{(isCompleteMarathon === "complete" || isCompleteMarathon === "fail") && <MarathonResult t={t} status={isCompleteMarathon} />}
								</Fragment>
							)}
					</>
				)}
				
			</MainLayout>
		)
	}
}

const MarathonResult = props => {
	const { t, status } = props
	return (
		<View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
			{status === "fail" && (
				<ScreenPlaceholder
					text={t("app_marathon:marathon_failed")}
					imageComponent={<MarathonFailed/>}
				/>
			)}
			{status === "complete" && (
				<ScreenPlaceholder
					text={t("app_marathon:marathon_finished")}
					imageComponent={<MarathonDone/>}
				/>
			)}
		</View>
	)
}


export default Logic(MarathonMain)
