import React, { Component, Fragment } from "react"
import Content from "components/Content"
import ReadMore from "components/ReadMore"
import CardLesson from "components/CardLesson"
import Header from "components/Header"
import Logic from "../logic"
import { FooterGrid, FooterTitle, Image, PageBody, PageFooter, Title, TrainingDescription } from "../styles"
import Skeleton from "react-loading-skeleton"
import Button from 'components/Button';
import {capitalizeFirstLetter} from 'utils'

class Trainings extends Component {
	render() {
		const { loading, course, exercise, nextLesson, exercises, exerciseIndex, t } = this.props
		const coursesType = course.type === "course" ? "courses" : "challenges"
		return (
			<Fragment>
				<Header
					breadcrumbs={ [
						{ to: `/${coursesType }`, label: t("basic:"+capitalizeFirstLetter(coursesType)) },
						{ to: `/${coursesType}/${course._id}`, label: course.title },
						...(course.type === "marathon" ? [{ to: `/${coursesType}/${course._id}/exercises`, label: t("basic:Tasks") }] : []),
						{to: `/${ coursesType }/${ course._id }/exercises/${ exercise.type }/${ exercise._id }`, label: exercise.title},
					] }
				/>
				<Content bodyWidth={ "100%" }>
					{ !loading.exercise && !loading[course.type] ? (
						<Fragment>
							<PageBody>
								{exercise.img && <Image src={exercise.img} />}
								<Title>{ exercise.title }</Title>
								{ exercise.description && exercise.description.length ? (
									<ReadMore>{ exercise.description }</ReadMore>
								) : null }
							</PageBody>
							<PageFooter>
								{exercise.blocks && exercise.blocks.length ? (
									<Fragment>
										<FooterTitle>{t("basic:Trainings")}</FooterTitle>
										<FooterGrid>
											{exercise.blocks.map(({ _id, meta_data={} }) => {
												return meta_data && (
													<CardLesson
														key={_id}
														img={meta_data.thumbnail ? meta_data.thumbnail : null}
														link={`/${coursesType}/${course._id}/exercises/${exercise.type}/${exercise._id}/${_id}`}
														title={meta_data.title}>
														<TrainingDescription>{meta_data.description}</TrainingDescription>
													</CardLesson>
												)
											})}
										</FooterGrid>
									</Fragment>
								) : (
									<Button onClick={() => nextLesson()}>
										{exerciseIndex() + 1 === exercises.length
											? t("app_basic:to_complete")
											: t("app_basic:next_lesson")}
									</Button>
								)}
								
							</PageFooter>
						</Fragment>
					) : (
						// Skeleton preloader
						<Fragment>
							<PageBody>
								<Image><Skeleton height={ 278 }/></Image>
								<Title><Skeleton/></Title>
								<Skeleton count={ 5 }/>
							</PageBody>
							<PageFooter>
								<FooterTitle><Skeleton width={ 150 }/></FooterTitle>
								<FooterGrid>
									<Skeleton width={ 250 } height={ 178 }/>
									<Skeleton width={ 250 } height={ 178 }/>
									<Skeleton width={ 250 } height={ 178 }/>
								</FooterGrid>
							</PageFooter>
						</Fragment>
					) }
				</Content>
			</Fragment>
		)
	}
}

export default Logic(Trainings)
