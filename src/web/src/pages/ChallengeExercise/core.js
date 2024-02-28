import React, { Fragment } from "react"
import {Link} from 'react-router-dom';

import Logic from "./logic"
import Header from "components/Header"
import Content from "components/Content"
import ParseBlocks from "components/ParseBlocks"
import Skeleton from "react-loading-skeleton"
import Button from "components/Button/core"
import Report from "components/Report"
import styled from "styled-components"
import moment from "moment";

import { getLessonProgress } from 'utils/gurucan-helpers';

import { ReturnLink} from './styles';

const ChallengeExercise = ({ stripCalendar, exercise, loading, exercises, nextLesson, exerciseIndex, marathon, t, purchasedCourses }) => {
	let exerciseCompleted = getLessonProgress(marathon._id, exercise._id, purchasedCourses)
	let nextTask = exercises[exerciseIndex()+1]
	return (
		<div>
			<Header breadcrumbs={[
					{ to: "/challenges", label: t("basic:Challenges") },
					{ to: `/challenges/${marathon._id}`, label: marathon.title },
					{ to: `/challenges/${marathon._id}/exercises`, label: t("basic:Tasks") },
					{ to: `/challenges/${marathon._id}/exercises/${exercise.type}/${exercise._id}`, label: exercise.title},
			]} />
			<Content verticalCenter horizontalCenter>
				{stripCalendar()}
			</Content>
			<Content bodyWidth={"50%"} style={{ marginTop: "25px" }}>
				<ReturnLink to={"/challenges/"+marathon._id+"/exercises/"}>
					<i className="fas fa-chevron-left" style={{ marginRight: "3px", fontSize: "12px"}}></i>
					{t("web_marathons:day_tasks_link")}
				</ReturnLink>
				{!loading.marathon && !loading.exercise && !loading.exercises && !loading.course ? (
					<Fragment>
						<ParseBlocks blocks={exercise.blocks} />
						{(!exercise.reportRequired || (exercise.report && exercise.report.completed) || exerciseCompleted) && (
							<Button onClick={() => nextLesson()}>
								{nextTask && nextTask.allowed
									? t("app_basic:next_lesson")
									: t("app_basic:to_complete")}
							</Button>
						)}
						{exercise.reportRequired && (
							<Report />
						)}
					</Fragment>
				) : (
					<Skeleton />
				)}
			</Content>
		</div>
	)
}

export default Logic(ChallengeExercise)
