import React, { Fragment } from "react"
import Content from "components/Content"
import Header from "components/Header"
import Logic from "../logic"
import { AnswerButton, AnswersContainer, Question, QuizResultCount, QuestionContainer, Title } from "../styles"
import ParseBlocks from "components/ParseBlocks"
import Skeleton from "react-loading-skeleton"
import Button from "components/Button"
import ExerciseNavigation from "components/ExerciseNavigation"
import ExerciseFinish from "components/ExerciseFinish"
import {capitalizeFirstLetter} from 'utils'

const Quiz = ({
	exercise,
	exercises,
	course,
	quiz,
	loading,
	createRef,
	t,
	state,
	setAnswer,
	nextQuestion,
	nextLesson,
	restartQuiz,
	exerciseIndex,
}) => {
	const { img, fullDescription, price, title, _id, attachedPlans, type, startDate } = course
	const quisIsComplete =
		!loading.course && !loading.exercise && (quiz.score / exercise.blocks.length) * 100 >= exercise.minPercent
	let coursesType = course.type === "marathon" ? "challenges" : "courses" 
	return (
		<Fragment>
			<div style={{ float: "left", clear: "both" }} ref={createRef} />
			{!loading.course && !loading.exercise ? (
				<Fragment>
					<Header
						breadcrumbs={[
							{ to: "/" + coursesType, label: t("basic:" + capitalizeFirstLetter(coursesType)) },
							{ to: `/${coursesType}/${course._id}`, label: course.title },
							...(course.type === "marathon" ? [{ to: `/${coursesType}/${course._id}/exercises`, label: t("basic:Tasks") }] : []),
							{ to: `/${coursesType}/${course._id}/exercises/${exercise.type}/${exercise._id}`, label: exercise.title },
						]}
					/>
					{exercise.blocks.length ? (
						<Fragment>
							{!(quiz.index + 1 > exercise.blocks.length) ? (
								<Content bodyWidth={"50%"}>
									<ExerciseNavigation exerciseType={t("web_quiz:question_label")} index={quiz.index} exerciseLength={exercise.blocks.length} />
									{exercise.blocks.map((qe, index) => {
										let { meta_data={} } = qe
										return (
											index === quiz.index && (
												<QuestionContainer key={qe._id}>
													{qe.data && (
														<ParseBlocks
															blocks={[{ type: "image", data: qe.data, _id: qe.data }]}
														/>
													)}
													<Question>{meta_data.question ? meta_data.question : null}</Question>
													<AnswersContainer>
														{meta_data.answers && meta_data.answers.map((answer, index) => (
															<AnswerButton
																key={answer.value}
																active={index === state.activeAnswer}
																onClick={() => setAnswer(answer.isTrue, index)}>
																{answer.value}
															</AnswerButton>
														))}
													</AnswersContainer>
												</QuestionContainer>
											)
										)
									})}
									<Button onClick={() => {
										let block = exercise.blocks[quiz.index]
										let needToSkip = !block.meta_data || !block.meta_data.answers || !block.meta_data.answers.length
										nextQuestion(needToSkip)
									}} style={{ marginTop: '100px' }}>
										{quiz.index + 1 === exercise.blocks.length
											? t("web_quiz:finish_quiz")
											: t("web_quiz:next_question")}
									</Button>
								</Content>
							) : (
									<Content style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
										<ExerciseFinish
											title={quisIsComplete ? t('app_quiz:great_text') : t('app_quiz:dont_give_up_text')}
											descr={quisIsComplete ? t('app_quiz:quiz_finish_text') : t('app_quiz:quiz_failed_text')}>
											<QuizResultCount>
												{quiz.score} из {exercise.blocks.length}
											</QuizResultCount>
											{quisIsComplete ? (
												<Button onClick={() => {
													restartQuiz(); 
													nextLesson()
												}}>Следующее задание</Button>
											) : (
													<Button onClick={() => restartQuiz()}>Попробовать снова</Button>
												)}
										</ExerciseFinish>
									</Content>
								)}
						</Fragment>
					) : (
						<Content bodyWidth={'50%'}>
							<ExerciseNavigation exerciseType={t("basic:lesson_button")} index={exerciseIndex()} exerciseLength={exercises.length} />
							<Title>{exercise.title}</Title>
							<Button onClick={() => nextLesson()}>
								{exerciseIndex() + 1 === exercises.length
									? t("app_basic:to_complete")
									: t("app_basic:next_lesson")}
							</Button>
						</Content>
					)}
				</Fragment>
			) : (
				<Skeleton count={10} height={50} />
			)}
		</Fragment>
	)
}

export default Logic(Quiz)
