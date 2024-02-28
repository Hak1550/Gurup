import React, { Fragment } from "react"
import Button from "components/Button"
import ReadMore from "components/ReadMore"
import CardLesson from "components/CardLesson"
import Header from "components/Header"
import Logic from "./logic"
import { isAuthorized, checkValidation } from "hocs/checkAuth"

import {
	FooterGrid, FooterTitle, Image, ImagePlaceholder, Or, PriceLabel, SignTitle, 
	PaymentMethod, PageBody, PriceWrap, PageFooter, PaymentMethods, Price, Title, 
	Container, Wrap, Block, SubTitle, Sign, Sidebar, Start, SubscribeWrap, CloseBlock, BlockImage, DownloadApp } from "./styles"
import Skeleton from "react-loading-skeleton"
import { courseIsPurchased } from "utils/gurucan-helpers"
import ModulePlaceholder from "components/ModulePlaceholder"
import CheckoutHeader from "components/CheckoutHeader"
import { Helmet } from "react-helmet"
import getSymbolFromCurrency from 'currency-symbol-map'
import moment from 'moment';
import {capitalizeFirstLetter} from "utils"

const Course = ({
	course,
	exercises,
	state,
	getLessonProgress,
	loading,
	startCourse,
	purchasedCourses,
	exerciseAllowed,
	purchaseCourse,
	planOnClick,
	influencer,
	exercisePermissionErrorToast,
	t,
}) => {
	const { img, fullDescription, price, title, _id, attachedPlans, type, startDate } = course
	let canStart = course.freeTasks && isAuthorized() && !courseIsPurchased(course._id, purchasedCourses) || course.allowed && isAuthorized() || course.isFree
	if (startDate) {
		canStart = canStart && moment().isAfter(moment(startDate))
	}
	let coursesType = course.type === "marathon" ? "challenges" : "courses" 
	let sign = {
		buttonText: "",
		afterSign: false
	}
	if (price && !course.allowed || !isAuthorized() && !course.isFree) {
		sign.buttonText = t("basic:label_checkout")
		sign.afterSign = purchaseCourse
		sign.pay = true
		sign.price = `${price} ${getSymbolFromCurrency(course.currency)}`
		sign.title = t("web_basic:checkout_title")
	} 
	if (canStart) {
		sign.buttonText = t("app_courses:start_course_button")
		sign.afterSign = startCourse
		// sign.title = t("app_courses:start_title")
	}
	let changeDirection
	if ((!(price && !course.allowed) && isAuthorized()) || !img) {
		changeDirection = "column"
	}
	return (
		<Fragment>
			<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=0.2"></meta>
			
			<Container bodyWidth={"100%"}>
				<Wrap className={changeDirection ? changeDirection : ""}>
					<PageBody>
						{!loading.course ? (
							<Fragment>
								<Header breadcrumbs={[
									{ to: "/" + coursesType, label: t("basic:" + capitalizeFirstLetter(coursesType)) },
									{ to: `/${coursesType}/${_id}`, label: title }
								]} />
								{img && <Image src={img} />}
								<Title>{title}</Title>
								{fullDescription && fullDescription.length ? <ReadMore>{fullDescription}</ReadMore> : null}
								
							</Fragment>
						) : (
							<Fragment>
								<ImagePlaceholder>
									<Skeleton height={278} />
								</ImagePlaceholder>
								<Title>
									<Skeleton />
								</Title>
							</Fragment>
						)}
					</PageBody>
					<Sidebar className={changeDirection ? changeDirection : ""}>
						{!isAuthorized() ? (
							<Sign changeUrl={false} afterSign={sign.afterSign} buttonText={sign.buttonText}>
								{sign.title && <Title style={{ textAlign: "center" }}>{sign.title}</Title>}
								{sign.pay && (
									<CheckoutHeader price={sign.price}/>
								)}
							</Sign>
						) : !courseIsPurchased(course._id, purchasedCourses) || !course.allowed ? (
							state.checkoutUrl ? (
								<a href={state.checkoutUrl} style={{ marginTop: "32px" }}>
									<Button>{t("basic:go_to_payment")}</Button>
								</a>
							) : (
								<Fragment>
									{price && !course.allowed ? (
										<Fragment>
											<CheckoutHeader title={t("web_basic:checkout_title")} price={sign.price} />
											<Button
												style={{
													borderRadius: "10px",
													width: "100%",
												}}
												onClick={purchaseCourse}>
												{t("basic:label_checkout")}
											</Button>
										</Fragment>
									) : null}
									{!course.allowed && attachedPlans && attachedPlans.length > 0 ? (
										<SubscribeWrap>
											{price ? (<Or>{t("basic:or")}</Or>) : null}
											<Button
												theme='white'
												style={{
													width: "100%",
													borderRadius: "10px",
												}}
												onClick={planOnClick}
											>
												{t("basic:subscribe")}
											</Button>
										</SubscribeWrap>
									) : null}
									{canStart && (
										<Start
											onClick={startCourse}>
											{!course.allowed ? t("basic:start_trial_tasks") : t("app_courses:start_course_button")}
										</Start>
									)}
									{startDate && moment().isBefore(moment(startDate)) ? (
										<p style={{ marginTop: "10px" }}>
											{t("app_courses:marathon_starts_on")} {moment(startDate).format("DD MMM YYYY")}
										</p>
									) : null}
								</Fragment>
							)
						):null}
					</Sidebar>
				</Wrap>
				<PageFooter>
					{!loading.exercises && !loading.course ? (
						<Fragment>
							<FooterTitle>{t("basic:Tasks")}</FooterTitle>
							{exercises.length > 0 ? (
								<FooterGrid>
									{exercises.map(({ _id: exercise_id, img, title, type, description, allowed }) => {
										if (courseIsPurchased(course._id, purchasedCourses)) {
											if (exerciseAllowed(exercise_id) && allowed) {
												return (
													<CardLesson
														key={exercise_id}
														img={img}
														link={`/courses/${_id}/exercises/${type}/${exercise_id}`}
														title={title}
														status={getLessonProgress(exercise_id)}>
														{description}
													</CardLesson>
												)
											} else {
												console.log("exerciseAllowed(exercise_id)", exerciseAllowed(exercise_id), "allowed", allowed)

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
														title={title}>
														{description}
													</CardLesson>
												)
											}
										} else {
											return <CardLesson key={exercise_id} img={img} title={title} />
										}
									})}
								</FooterGrid>
							) : (
									<ModulePlaceholder text={t("basic:no_exercises")} alignItems={"flex-start"} />
								)}
						</Fragment>
					) : (
						<Fragment>
							<FooterTitle>
								<Skeleton width={150} />
							</FooterTitle>
							<FooterGrid>
								<Skeleton width={300} height={170} />
								<Skeleton width={300} height={170} />
								<Skeleton width={300} height={170} />
							</FooterGrid>
						</Fragment>
					)}
				</PageFooter>
			</Container>
		</Fragment>
	)
}

export default Logic(Course)