import React, { Component, Fragment } from "react"
import Content from "components/Content"
import Header from "components/Header"
import Logic from "../logic"
import {capitalizeFirstLetter} from 'utils'
import {
	VideoControls,
	VideoWrapper,
	Title,
	TrainingDescription,
	PlayButton,
	PlayButtonIcon,
	NextTrainingName,
	CompleteCheckMark,
	RepeatInstruction,
	RepeatContainer,
	RepeatQuantity,
	RepeatMeasur,
} from "../styles"
import ReactPlayer from "react-player"
import ExerciseNavigation from "components/ExerciseNavigation"
import { StopIcon, NextIcon } from "assets/core/icon"
import Skeleton from "react-loading-skeleton"
import ExerciseFinish from "components/ExerciseFinish"
import Button from "components/Button/core"
import Timer from "components/Timer"
import AnimatedIcon from "components/AnimatedIcon"
import checkMark from "assets/core/animations/checkmark"
const Training = ({
	exercise,
	course,
	loading,
	createRef,
	timerRef,
	trainingIndex,
	state,
	play,
	pause,
	timer,
	repeater,
	goToNextTraining,
	nextLesson,
	onTick,
	onTimerComplete,
	t,
}) => {
	let training = !loading.exercise && exercise.blocks[trainingIndex]
	if (training) {
		training.meta_data = training.meta_data || {}
	}
	let nextTraining = !loading.exercise && exercise.blocks[trainingIndex + 1]
	if (nextTraining) {
		nextTraining.meta_data = nextTraining.meta_data || {}
	}
	let coursesType = course.type === "marathon" ? "challenges" : "courses"
	return (
		<Fragment>
			<div style={{ float: "left", clear: "both" }} ref={createRef} />
			{!loading.course && !loading.exercise && training ? (
				<Fragment>
					<Header
						breadcrumbs={[
							{ to: "/" + coursesType, label: t("basic:" + capitalizeFirstLetter(coursesType)) },
							{ to: `/${coursesType}/${course._id}`, label: course.title },
							...(course.type === "marathon" ? [{ to: `/${coursesType}/${course._id}/exercises`, label: t("basic:Tasks") }] : []),
							{ to: `/${coursesType}/${course._id}/exercises/${exercise.type}/${exercise._id}`, label: exercise.title },
							{ to: `/${coursesType}/${course._id}/exercises/${exercise.type}/${exercise._id}/${training._id}`, label: training.meta_data.title },
						]}
					/>
					{!state.trainingsFinish ? (
						<Content key={training._id} bodyWidth={"50%"}>
							<ExerciseNavigation
								index={trainingIndex}
								exerciseLength={exercise.blocks.length}
								exerciseType={t("web_trainings:single_training")}
							/>
							<Fragment>
								<VideoWrapper>
									{training.data ? (
										<ReactPlayer
											url={training.data}
											fileConfig={{ attributes: { poster: training.meta_data.thumbnail } }}
											width={"100%"}
											height={"100%"}
											playing={state.playing}
											loop
										/>
									) : (
										null
									)}
									{!state.playing && training.data && (
										<PlayButton
											onClick={() => {
												play()
												// console.log("TIMER", timer);
												if (training.type === "time") timer.current.start()
											}}>
											<PlayButtonIcon className='fas fa-play' />
										</PlayButton>
									)}
								</VideoWrapper>
								<VideoControls>
									<button
										onClick={() => {
											if (state.playing) {
												pause()
												if (training.type === "time") timer.current.pause()
											} else {
												play()
												if (training.type === "time") timer.current.start()
											}
										}}>
										{state.playing ? (
											<StopIcon width={"2em"} height={"2em"} />
										) : (
											<PlayButtonIcon className = 'fas fa-play' />
										)}
									</button>
									<Title>{training.meta_data.title}</Title>
									<button onClick={() => goToNextTraining()}>
										<NextIcon width={"2em"} height={"2em"} />
									</button>
								</VideoControls>
							</Fragment>
							<TrainingDescription>{training.meta_data.description}</TrainingDescription>
							{training.type === "time" && (
								<Timer
									progress={state.timerProgress}
									timerRef={timer}
									seconds={training.meta_data.time || 1}
									onTick={onTick}
									autoStart={false}
									onComplete={onTimerComplete}>
									<CompleteCheckMark
										onClick={() => goToNextTraining()}
										options={{ loop: false }}
										animationData={checkMark}
									/>
								</Timer>
							)}
							{training.type === "bench" && (
								<div style={{ margin: "45px auto 0" }}>
									{/* <RepeatInstruction>{t("web_trainings:training_repeat")}</RepeatInstruction> */}
									<RepeatContainer>
										<RepeatMeasur>{t("web_trainings:training_repetitions")}</RepeatMeasur>
										<RepeatQuantity>{training.meta_data.repetitions || 0}</RepeatQuantity>
									</RepeatContainer>
									{/* <RepeatInstruction>
										{t("web_trainings:training_repetitions_desc")}
									</RepeatInstruction> */}
								</div>
							)}
							{nextTraining && nextTraining.meta_data.title && (
								<NextTrainingName>
									{t("web_trainings:training_next")} {nextTraining.meta_data.title.toLowerCase()}
								</NextTrainingName>
							)}
						</Content>
					) : (
						<Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<ExerciseFinish title={t("web_trainings:training_finished")}>
								<Button onClick={nextLesson}>{t("web_trainings:training_next")}</Button>
							</ExerciseFinish>
						</Content>
					)}
				</Fragment>
			) : (
				<Content bodyWidth={"50%"}>
					<Skeleton height={500} />
					<TrainingDescription>
						<Skeleton count={5} />
					</TrainingDescription>
					<NextTrainingName>
						<Skeleton />
					</NextTrainingName>
				</Content>
			)}
		</Fragment>
	)
}

export default Logic(Training)
