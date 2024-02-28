import React, { Fragment } from "react"
import Content from "components/Content"
import ModulePlaceholder from "components/ModulePlaceholder"
import CardLesson from "components/CardLesson"
import Header from "components/Header"
import Logic from "../logic"
import { PageFooter, FooterGrid } from "../styles"
import Skeleton from "react-loading-skeleton"
import moment, { isDate } from "moment"

const ChallengeExercises = ({ marathon, exercisePermissionErrorToast, exerciseAllowed, exercises, getLessonProgress, loading, filterExerciseByDate, stripCalendar, tmp, t }) => {
	exercises = !loading.marathon && filterExerciseByDate(exercises, tmp.marathonActiveDate)
	return (
		<Fragment>
			<Header breadcrumbs={[
				{ to: "/challenges", label: t("basic:Challenges") },
				{ to: `/challenges/${marathon._id}`, label: marathon.title },
				{ to: `/challenges/${marathon._id}/exercises`, label: t("basic:Tasks") },
			]} />
			<Content verticalCenter horizontalCenter>
				{stripCalendar()}
			</Content>
			<Content bodyWidth={"100%"} style={{marginTop: '32px'}}>
				<PageFooter>
					{!loading.marathon ? (
						<Fragment>
							{exercises && exercises.length ? (
								<FooterGrid>
									{exercises.map(({ _id: exercise_id, img, title, type, startDate, allowed }) => {
										if(!allowed) {
											return <CardLesson key={exercise_id} img={img} title={title} />
										} else if (exerciseAllowed(exercise_id) && allowed) {
											return (
												<CardLesson
													key={exercise_id}
													img={img}
													link={`/challenges/${marathon._id}/exercises/${type}/${exercise_id}`}
													title={title}
													status={getLessonProgress(exercise_id)}
												/>
											)
										} else {
											console.log("allowed", allowed, "exerciseAllowed(exercise_id)", exerciseAllowed(exercise_id))
											return (
												<CardLesson
													key={exercise_id}
													img={img}
													onClick={() => {
														// !allowed ? (
														// 	exercisePermissionErrorToast("BUY COURSE")
														// ) : (
														allowed && !exerciseAllowed(exercise_id) && exercisePermissionErrorToast("DO_EXERCISE_CONSISTENTLY")
														// )
													}}
													title={title} />
											)
										} 

									})}
								</FooterGrid>
							) : (
								<Content bodyWidth="100%"  horizontalCenter>
									<ModulePlaceholder maxWidth="195px" img={require("assets/core/placeholders/day-of-rest.png")} text={t("web_marathons:day_of_rest")} />
								</Content> 
							)}
						</Fragment>
					) : (
						<Fragment>
							<FooterGrid>
								<Skeleton width={300} height={170} />
								<Skeleton width={300} height={170} />
								<Skeleton width={300} height={170} />
							</FooterGrid>
						</Fragment>
					)}
				</PageFooter>
			</Content>
		</Fragment>
	)
}

export default Logic(ChallengeExercises)
