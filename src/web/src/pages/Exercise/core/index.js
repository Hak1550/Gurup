import React, { Fragment } from "react"
import Content from "components/Content"
import Header from "components/Header"
import Logic from "../logic"
import {Link} from "react-router-dom";
import { Title } from "../styles"
import ParseBlocks from "components/ParseBlocks"
import Skeleton from "react-loading-skeleton"
import Button from "components/Button"
import ExerciseNavigation from "components/ExerciseNavigation"
import Report from "components/Report"

import { getLessonProgress, findPurchasedCourse} from 'utils/gurucan-helpers';

const Exercise = ({ exercise, exercises, exerciseIndex, course, nextLesson, loading, createRef, t, purchasedCourses }) => {
	let exerciseCompleted = getLessonProgress(course._id, exercise._id, purchasedCourses)
	let nextTask = exercises[exerciseIndex() + 1] 
	return (
		<Fragment>
			<div style={{ float: "left", clear: "both" }} ref={createRef} />
			<Header
				breadcrumbs={[
					{ to: "/courses", label: t("basic:Courses") },
					{ to: `/courses/${course._id}`, label: course.title },
					{ to: `/courses/${course._id}/exercises/${exercise.type}/${exercise._id}`, label: exercise.title },
				]}
			/>
			<Content bodyWidth={'50%'}>
				{!loading.course && !loading.exercise && !loading.exercises ? (
					<Fragment>
						<ExerciseNavigation exerciseType={t("basic:exercise")} index={exerciseIndex()} exerciseLength={exercises.length} />
						<Title>{exercise.title}</Title>
						<ParseBlocks blocks={exercise.blocks} />
						{(!exercise.reportRequired || (exercise.report && exercise.report.completed) || exerciseCompleted)
							 && (
								/* nextTask && nextTask.allowed || !nextTask ? ( */
								true ? (
									<Button onClick={() => nextLesson()}>
										{!nextTask
											? t("app_basic:to_complete")
											: t("app_basic:next_lesson")}
									</Button>
								) : (
									<Button onClick={() => nextLesson(true)}>
										{t("finish_trial")}
									</Button>
								)
							 )
						}
					</Fragment>
				) : (
					<Skeleton count={20} height={50} />
				)}
				{exercise.reportRequired && (
					<Report/>
				)}
			</Content>
		</Fragment>
	)
}

export default Logic(Exercise)
