import React from "react"
import Logic from "./logic"
import moment from "moment"
import {
	DateContainer,
	DateItemContainer,
	DateItemName,
	DateItemNumber,
	DateItemNumberContainer,
	DateNavButton,
} from "./styles"

// TODO: Привязать moment().locale() к i18n
moment.locale("ru")

const StripCalendar = ({ tmp, formattedDates, nextDay, prevDay, dotCompleteColor = "green", dotFailedColor = "red", startDate, finishDate, i18next }) => {
	console.log('i18next', i18next)
	const prevButtonStatus = moment(tmp.marathonActiveDate).isSame(moment(startDate), "days")
	const nextButtonStatus = moment(tmp.marathonActiveDate).isSame(moment(finishDate), "days")
	return (
		<div>
			<DateNavButton onClick={ prevDay } hide={ prevButtonStatus }>
				<i className='fas fa-chevron-left'/>
			</DateNavButton>
			<DateContainer>
				{ formattedDates().map((event, index) => {
					const isActive = moment(event.date).isSame(tmp.marathonActiveDate, "day")
					const hasDot = event.hasOwnProperty("complete") && {
						dotColor: event.complete ? dotCompleteColor : dotFailedColor,
					}
					return (
						<DateItemContainer key={ index } disable={ event.disabled }>
							<DateItemName active={ isActive }>{ moment(event.date).format("dd") }</DateItemName>
							<DateItemNumberContainer
								disable={ event.disabled }
								first={ moment(event.date).isSame(startDate, "days") }
								last={ moment(event.date).isSame(finishDate, "days") }>
								<DateItemNumber disable={ event.disabled } active={ isActive } { ...hasDot }>
									{ moment(event.date).format("DD") }
								</DateItemNumber>
							</DateItemNumberContainer>
						</DateItemContainer>
					)
				}) }
			</DateContainer>
			<DateNavButton hide={ nextButtonStatus } onClick={ nextDay }>
				<i className='fas fa-chevron-right'/>
			</DateNavButton>
		</div>
	)
}

export default Logic(StripCalendar)
