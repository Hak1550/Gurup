import React from "react"
import { withTheme } from "styled-components"
import moment from "moment"
import { compose } from "redux"
import { connect } from "react-redux"

export default WrappedComponent => {
	class Logic extends React.Component {

		nextDay = () => {
			const { dispatch, tmp } = this.props
			const newDay = moment(tmp.marathonActiveDate)
				.add(1, "day")
				.format()

			dispatch({
				type: "SET_MARATHON_DATE",
				marathonActiveDate: newDay,
			})
		}

		prevDay = () => {
			const { dispatch, tmp, startDate } = this.props
			const newDay = moment(tmp.marathonActiveDate)
				.subtract(1, "day")
				.format()

			const isStart = moment(tmp.marathonActiveDate).isSame(startDate, "day")
			if(!isStart) {
				dispatch({
					type: "SET_MARATHON_DATE",
					marathonActiveDate: newDay,
				})
			}
		}

		// Функция чтобы получить массив дней с аргументами начало - конец
		datesRange = (start, end) => {
			let dates = [moment(start).format()]
			let d = moment(start).format()
			while(moment(d).isBefore(moment(end), "day")) {
				d = moment(d).add(1, "day").format()
				dates = [...dates, moment(d).format()]
			}
			return dates
		}

		formattedDates = () => {
			const { startDate, finishDate, events, tmp } = this.props
			const dates = this.datesRange(startDate, finishDate)
			let sortedEvents = []
			dates.map(d => {
				// Ищем event совпадающие с датой
				const findEvents = events.filter(e => moment(e.date).isSame(d, "day"))

				// Если нашли
				if(findEvents.length) {
					// Ищем хотябы одно НЕ выполнененное событие,
					// чтобы сделать красную точку над датой
					const findCompletedEvent = findEvents.filter(event => !event.complete)

					// Если 0 значить на этот день все задания выполнены
					// Иначе есть не выполненное задание
					const eventsComplete = findCompletedEvent.length

					// Соединяем все в один обьект
					return sortedEvents = [...sortedEvents, {
						date: d,
						events: [...findEvents],
						complete: !eventsComplete,
					}]
				} else {
					// Если событий нету, то просто вовращаем объект с датой
					return sortedEvents = [...sortedEvents, { date: d }]
				}
			})
			const findActiveDay = sortedEvents.findIndex(se => moment(se.date).isSame(moment(tmp.marathonActiveDate), "days"))
			if(findActiveDay === 0) {
				sortedEvents = [{
					date: moment(sortedEvents[0].date).subtract(1, "day").format(),
					disabled: true,
				}, ...sortedEvents]
				return sortedEvents.slice(0, findActiveDay + 3)
			}
			if(sortedEvents.length - 1 === findActiveDay) {
				sortedEvents = [...sortedEvents, {
					date: moment(sortedEvents[findActiveDay].date).add(1, "day").format(),
					disabled: true,
				}]
			}
			return sortedEvents.slice(findActiveDay - 1, findActiveDay + 2)
		}

		render() {
			return (
				<WrappedComponent
					nextDay={ this.nextDay }
					prevDay={ this.prevDay }
					formattedDates={ this.formattedDates }
					state={ this.state }
					{ ...this.props }
				/>
			)
		}
	}

	return compose(
		withTheme,
		connect(({ tmp }) => ({ tmp })),
	)(Logic)
}
