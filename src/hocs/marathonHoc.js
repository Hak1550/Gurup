import React, { Component, Fragment } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import multipleLoading from "hocs/multipleLoading"
import StripCalendar from "components/StripCalendar"
import { sortEvents } from "utils/gurucan-helpers"
import { getMarathon } from "actions/courses"
import _ from "underscore"
import Skeleton from "react-loading-skeleton"
import moment from "moment"
import Modal from "react-modal"
import Calendar from "react-calendar"
import styled from "styled-components"
import { CloseIcon } from "assets/core/icon"

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			modalVisible: false,
		}

		componentDidMount = async() => {
			const { marathon, match, dispatch, history, exercise } = this.props
			const { course_id } = match.params
			if(_.isEmpty(marathon)) {
				let data = await dispatch(getMarathon(course_id))
				if (!data || data.status === "error") {
					history.push("/challenges/"+course_id)
				}
			}
		}

		componentDidUpdate(prevProps) {
			// if(prevProps.exercise._id === prevProps.match.params.exercise_id) {
				// const { exercise, history, match, dispatch } = this.props
				// if(moment().isBefore(exercise.startDate, "day")) {
				// 	history.replace(`/challenges/${ match.params.course_id }`)
				// 	dispatch({ type: "SUCCESS" })
				// }
			// }
			
			if (!this.props.tmp.init && !moment(prevProps.tmp.marathonActiveDate).isSame(this.props.tmp.marathonActiveDate)) {
				const { match, history } = this.props
				if(match.path.includes(":exercise_id")) {
					history.replace(`/challenges/${ match.params.course_id }/exercises`)
				}
			}
		}


		stripCalendar = () => {
			const { loading, marathon, purchasedCourses } = this.props
			if(!loading.marathon) {
				return (
					<StripCalendarContainer>
						<OpenModalCalendar onClick={ this.toggleModal }>
							<i className="far fa-calendar-alt"/>
						</OpenModalCalendar>
						<StripCalendar
							startDate={ marathon.startDate }
							finishDate={ marathon.finishDate }
							events={ sortEvents(marathon, purchasedCourses) }
						/>
					</StripCalendarContainer>
				)
			}
			return <Skeleton width={ 420 } height={ 62 }/>
		}

		toggleModal = () => {
			const { modalVisible } = this.state
			this.setState({ modalVisible: !modalVisible })
		}

		render() {
			return (
				<Fragment>
					<WrapperComponent stripCalendar={ this.stripCalendar } { ...this.props } />
					<Modal isOpen={ this.state.modalVisible }
					       style={ {
						       overlay: { backgroundColor: "rgba(0, 0, 0, 0.7)", zIndex: 9999 },
						       content: {
							       maxWidth: "460px",
							       width: "90%",
							       top: "49%",
							       left: "50%",
							       bottom: "10%",
							       right: 0,
							       transform: "translate(-50%, -50%)",
						       },
					       } }>
						<CloseModalButton onClick={ this.toggleModal }><CloseIcon/></CloseModalButton>
						<CalendarContainer>
							{ !this.props.loading.marathon ? (
								<Calendar
									className={ "StyledCalendar" }
									value={ new Date(this.props.tmp.marathonActiveDate) }
									onChange={ (val) => {
										this.setState({
											modalVisible: false,
										})
										console.log("val", val)
										this.props.dispatch({ type: "SET_MARATHON_DATE", marathonActiveDate: val })
									} }
									tileClassName={ "StyledCalendarDay" }
									maxDate={ new Date(this.props.marathon.finishDate) }
									minDate={ new Date(this.props.marathon.startDate) }/>
							) : <Skeleton width={ "100%" } height={ 230 }/> }
						</CalendarContainer>
					</Modal>
				</Fragment>
			)
		}
	}

	return compose(
		multipleLoading({
			branches: ["marathon", "exercises", "exercise"],
		}),
		connect(({ marathon, purchasedCourses, exercise, tmp }) => ({
			marathon,
			purchasedCourses,
			exercise,
			tmp,
		})),
	)(Logic)
};

const CalendarContainer = styled.div`
	.StyledCalendar {
		border: none;
		width: auto;
		& abbr {
			text-decoration: none;
		}
		.react-calendar__navigation button[disabled] {
			visibility: hidden;
		}
	}
	.StyledCalendarDay {
		position: relative;
		&:enabled:focus:hover {
			background-color: transparent!important;
		}
		&.react-calendar__tile--active,
		&.react-calendar__tile--active:enabled:hover {
			background: transparent!important;
			color: #fff;
			z-index: 100;
			&:after {
				border-radius: 2em;
    			content: ' ';
        		position: absolute;
        		background-color: ${ props => props.theme.$accent };
        		width: 50%;
        		height: 100%;
        		top: 0;
                transform: translateX(50%);
        		left: 0;
        		z-index: -1;
			}
		}
		&.react-calendar__tile {
			background-color: transparent!important;
			position: relative;
			z-index: 100;
			&:enabled:hover,
			&:enabled:focus {
				color: #fff!important;
				&:after {
					border-radius: 2em;
		            content: ' ';
		            position: absolute;
		            background-color: ${ props => props.theme.$accent };
		            width: 50%;
		            height: 100%;
		            top: 0;
		            transform: translateX(50%);
		            left: 0;
		            z-index: -1;
				}
			}
		}
	}
`

const StripCalendarContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const OpenModalCalendar = styled.button`
	align-self: flex-end;
	& i {
		transition: color ease .15s;
		font-size: 14px;
		&:hover {
			color: ${ props => props.theme.$accent }
		}
	}
`

const CloseModalButton = styled.button`
	margin-left: auto;
`
