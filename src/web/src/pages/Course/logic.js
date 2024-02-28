import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getCourse, getExercises, startCourse, purchaseCourse } from "actions/courses"
import { getStripeConfig } from "actions/misc"
import {withRouter} from 'react-router';
// import { config } from "../../styles/variables";
import isLoading from "hocs/isLoading"
import multipleLoading from "hocs/multipleLoading"
import { withTheme } from "styled-components"
import { findPurchasedCourse } from "utils/gurucan-helpers"
import withHelmet from "hocs/withHelmet"
import { withNamespaces } from "react-i18next"
import { isAuthorized, checkValidation } from "hocs/checkAuth"

export default WrapperComponent => {
	class Logic extends Component {
		state = {
			isModalVisible: false,
			charLimit: 400,
			checkoutUrl: null,
		}

		componentDidMount = async() => {
			const { match, dispatch, history } = this.props
			const { course_id } = match.params
			if (course_id) {
				let data = await dispatch(getCourse(course_id))
				if (data && data.code === "USER_EXPELLED") {
					this.setState({
						expelled: true
					})
				} else if (!data || data.status === "error") {
					history.push("/courses")
				} else {
					if (data.course.type === "marathon" && this.isPurchased(course_id)) {
						history.push("/challenges/"+course_id+"/exercises")
					}
					dispatch(getExercises(course_id))
				}
			}
		}

		planOnClick = () => {
			let {history} = this.props
			history.push('/settings/plan')
		}

		exerciseAllowed = exercise_id => {
			const { course, purchasedCourses } = this.props
			if (!course.exercisesAvailableWithoutProgress) {
				const pc = findPurchasedCourse(course._id, purchasedCourses)
				
				if (pc) {
					// console.log("got pc");
					const pcLength = pc.activeExercises.length
					const findExerciseInPurchase = pc.activeExercises.findIndex(aex => aex.exerciseId === exercise_id)
					// console.log("exercise_id", exercise_id,"findExerciseInPurchase", findExerciseInPurchase, "findExerciseInPurchase > -1", findExerciseInPurchase > -1);
					
					return findExerciseInPurchase > -1 || findExerciseInPurchase === null;
				} else {
					// console.log("no pc");
				}
			} else {
				return true
			}
		}

		exercisePermissionErrorToast = (code) => {
			const {dispatch} = this.props;
			console.log("CODE ON COURSE", code);
			dispatch({type: "ERROR", code})
		}

		isPurchased = () => {
			const { course, purchasedCourses } = this.props
			return purchasedCourses.find(pCur => pCur.course === course._id)
		}

		getLessonProgress = id => {
			const isPurchased = this.isPurchased()
			if (isPurchased) {
				const findEx = isPurchased.activeExercises.find(({ exerciseId }) => exerciseId === id)
				// console.log("findEx", findEx);
				if (findEx && findEx.complete) {
					return true
				} else if (findEx && findEx.complete) {
					
					return "in_progress"
				} else {
					return false
				}
			} else {
				// console.log("not purchased");
			}
		}

		startCourse = () => {
			const isPurchased = this.isPurchased()
			const { dispatch, course, history, exercises } = this.props
			dispatch(startCourse(course._id)).then(() => {
				// let coursesType = "courses"
				// if (course.type === "marathon") {
				// 	coursesType = "challenges"
				// }
				if (course.type === "marathon") {
					history.push(`/challenges/${course._id}/exercises/`)
				} else {
					history.push(`/courses/${course._id}/exercises/${exercises[0].type}/${exercises[0]._id}`)
				}
			})
		}

		purchaseCourse = () => {
			const { dispatch, course, influencer } = this.props
			let gateway = influencer.tld === "com" ? "stripe" : "tks";

			console.log("INF ",influencer," course",course);
			if(influencer.defaultPaymentGateway && influencer.defaultPaymentGateway == "cloudpayments" ){
				gateway = "cloudpayments";
			}
			dispatch(purchaseCourse({ _id: course._id, gateway, source: "web" })).then(async res => {
				console.log("res ",res);
				
				if(gateway == "cloudpayments"){
					var widget = new cp.CloudPayments();
					widget.charge({ // options
						publicId: res.merchantId,  //id из личного кабинета
						description: res.title, //назначение
						amount: res.price, //сумма
						currency: res.currency, //валюта
						invoiceId: res.invoiceId, //номер заказа  (необязательно)
						accountId: res.accountId, //идентификатор плательщика (необязательно)
						skin: "mini" //дизайн виджета
					},
					function (options) { // success
						//действие при успешной оплате
						console.log("success ",options)
						// window.location.reload();
						window.location = "/payment/success?PaymentId="+res.invoiceId;
					},
					function (reason, options) { // fail
						//действие при неуспешной оплате
						console.log("fail ",options);
						
					});
					
				}else if (gateway === "tks" && res.url) {
					// this.setState({ checkoutUrl: res.url })
					window.location = res.url
				} else if (gateway === "stripe" && res.session) {
					const { public_key } = await dispatch(getStripeConfig())
					const stripe = Stripe(public_key, {
						stripeAccount: influencer.stripeUserId,
					})
					stripe
						.redirectToCheckout({
							sessionId: res.session.id,
						})
						.then(function(result) {
							console.log("RESULT OF CHECKOUT", result)
						})
				}
			})
			
		}

		render() {
			return (
				this.state.expelled ? (
					<div>here will be expelled page</div>
				) : (
					<WrapperComponent
						getReadMoreContent={this.getReadMoreContent}
						getLessonProgress={this.getLessonProgress}
						isPurchased={this.isPurchased}
						startCourse={this.startCourse}
						state={this.state}
						planOnClick={this.planOnClick}
						exercisePermissionErrorToast={this.exercisePermissionErrorToast}
						exerciseAllowed={this.exerciseAllowed}
						purchaseCourse={this.purchaseCourse}
						{...this.props}
					/>
				)
			)
		}
	}
	return compose(
		withNamespaces(["basic", "app_courses", "web_basic"]),
		withRouter,
		withHelmet(({course}) => ({title: course.title, description: course.fullDescription})),
		multipleLoading({
			branches: ["courses", "course", "exercises", "web_layout"],
		}),
		connect(({ course, exercises, purchasedCourses, influencer }) => ({
			course,
			exercises,
			purchasedCourses,
			influencer,
		}))
	)(Logic)
}
