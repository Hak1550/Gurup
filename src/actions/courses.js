import req, { request } from "../requester"

// const withErrorDispatch = dispatch => (cb = err => err) => err => {
// 	console.log("err", err);
// 	dispatch({
// 		type: 'ERROR',
// 		code: err.code,
// 	});
// 	cb(err);
// }

const permissionHandler = (response, dispatch) => {
	// console.error("PERMISSION HANDLER", response);
	
	dispatch({ type: "PLANS_MODAL_OPEN" })
}

export const getMarathons = () => dispatch =>
	new Promise(async resolve => {
		dispatch({
			type: "SET_STATUS",
			marathons: "is_loading",
		})
		request(req.get("/courses", { params: { type: "marathon" } }))
			.catch(response => permissionHandler(response, dispatch))
			.then(async data => {
				dispatch({
					type: "SET_MARATHONS",
					marathons: data.courses || [],
				})

				dispatch({
					type: "SET_PURCHASED_COURSES",
					purchasedCourses: data.purchasedCourses || [],
				})

				resolve(data)
			})
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					marathons: "is_ready",
				})
			})
	})

export const getMarathon = id => dispatch =>
	new Promise(async (resolve) => {
		dispatch({
			type: "SET_STATUS",
			marathon: "is_loading",
		})
		request(req.get(`/courses/${ id }?populate=true`))
			.then(data => {
				dispatch({
					type: "SET_MARATHON",
					marathon: data.course || [],
				})
				return data
			})
			.then(data => {
				// console.log("PURCHASED COURSE?", data)
				if (data.purchasedCourse){
					dispatch({
						type: "UPDATE_PURCHASED_COURSE",
						purchasedCourse: data.purchasedCourse || {},
					})
				}
				dispatch({
					type: "SET_STATUS",
					marathon: "is-ready",
				})
				resolve(data)
			})
			.catch(err => {
				// console.error("REQUEST getMarathon ERROR", err)
				resolve(err)
			})
			// .finally(() => {
			// 	dispatch({
			// 		type: "SET_STATUS",
			// 		marathon: "is-ready",
			// 	})
			// })
	})

export const getCourse = (id, params) => dispatch =>
	new Promise(resolve => {
		dispatch({
			type: "SET_STATUS",
			course: "is_loading",
		})
		request(req.get(`/courses/${ id }`, { params }))
			.then(data => {
				dispatch({
					type: "SET_COURSE",
					course: data.course || [],
				})
				dispatch({
					type: "UPDATE_PURCHASED_COURSE",
					purchasedCourse: data.purchasedCourse || {},
				})
				dispatch({
					type: "SET_STATUS",
					course: "is_ready",
				})
				resolve(data)
			})
			.catch(err => {
				console.error("REQUEST getCourse ERROR", err)
				resolve(err)
			})
			// .finally((data) => {
				// dispatch({
				// 	type: "SET_STATUS",
				// 	course: "is_ready",
				// })
			// })
	})

export const getCourses = params => dispatch =>
	new Promise(async resolve => {
		let type = null
		let tags = []
		if(params && params.type) {
			type = params.type
		}
		if(params && params.tags) {
			tags = params.tags
		}
		dispatch({
			type: "SET_STATUS",
			courses: "is_loading",
		})
		request(
			req.get("/courses", {
				params: {
					type,
					tags,
				},
			}),
		)
			.catch(response => permissionHandler(response, dispatch))
			.then(async data => {
				if(type && type === "marathon") {
					if(data.courses && data.courses[0]) {
						let course = await dispatch(getCourse(data.courses[0]._id))
						dispatch({
							type: "SET_COURSE",
							course,
						})
					}
				}
				dispatch({
					type: "SET_COURSES",
					courses: data.courses || [],
				})

				dispatch({
					type: "SET_PURCHASED_COURSES",
					purchasedCourses: data.purchasedCourses || [],
				})
				if (data.courseTags) {
					dispatch({
						type: "SET_TAGS",
						tags: data.courseTags
					})
				}
				resolve(data)
			})
			// .catch(err => console.log("CATCH getCourses ERROR ", err))
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					courses: "is_ready",
				})
			})
	})

export const startCourse = _id => dispatch =>
	new Promise((resolve, reject) => {
		dispatch({
			type: "SET_STATUS",
			purchaseCourse: "is_loading",
		})
		request(req.post(`/courses/${ _id }/start`))
			.catch(response => {
				permissionHandler(response, dispatch)
			})
			.then(data => {
				let purchasedCourse = {}
				if(data && data.purchasedCourse) {
					purchasedCourse = data.purchasedCourse
					dispatch({
						type: "ADD_PURCHASED_COURSE",
						purchasedCourse,
					})
					resolve(data)
				} else {
					reject()
				}
			})
			.catch(err => console.error("CATCH purchaseCourse ERROR ", err))
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					purchaseCourse: "is_ready",
				})
			})
	})

export const purchaseCourse = ({ _id, ...rest }) => dispatch =>
	new Promise(resolve => {
		dispatch({
			type: "SET_STATUS",
			purchaseCourse: "is_loading",
		});
		request(req.post(`/courses/${ _id }/buy`, { ...rest }))
			.catch(response => permissionHandler(response, dispatch))
			.then(data => {
				// dispatch({
				// 	type: "ADD_PURCHASED_COURSE",
				// 	purchasedCourse: data.purchasedCourse || []
				// });
				resolve(data)
			})
			.catch(err => console.error("CATCH purchaseCourse ERROR ", err))
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					purchaseCourse: "is_ready",
				})
			})
	});

export const getExercises = id => dispatch =>
	new Promise(resolve => {
		dispatch({
			type: "SET_STATUS",
			exercises: "is_loading",
		})
		request(req.get(`/courses/${ id }/exercises`))
			.then(data => {
				// dispatch({
				//   type: "SET_COURSE",
				//   exercises: data.course || [],
				// });
				dispatch({
					type: "SET_EXERCISES",
					exercises: data.exercises || [],
				})
				resolve(data)
			})
			.catch(err => {
				// console.error("CATCH getExercise ERROR ", err.status)
				console.error((data && data.code) ? data.code : data)
			})
			.finally(() => {
				dispatch({
					type: "SET_STATUS",
					exercises: "is_ready",
				})
			})
	})

export const getExercise = (id, options = {}) => dispatch =>
	new Promise(resolve => {
		const { status = true } = options;
		if(status){
			dispatch({
				type: "SET_STATUS",
				exercise: "is_loading",
			})
		}
		request(req.get(`/exercises/${ id }`))
			.then(data => {
				dispatch({
					type: "SET_EXERCISE",
					exercise: data.exercise || {},
				})
				resolve(data)
			})
			.catch(data => {
				console.error( (data && data.code)?data.code:data)
				resolve(data)
			})
			.finally(() => {
				if (status) {
					dispatch({
						type: "SET_STATUS",
						exercise: "is_ready",
					})
				}
			})
	})

const openNextExercise = ({
	dispatch,
	exercise, 
	course,
	course_id, 
	exercises,
	marathon
}) => {
	const currentExerciseNumber = exercises.findIndex(({ _id }) => _id === exercise);
	// console.log("current course status", course.allowed, course.freeTasks, currentExerciseNumber)
	// Если курс требуется проходить по порядку
	// Костыль чтобы понять на основе какого курса открывать следующий урок: марафона или курса

	let current_course;
	if(course && course._id === course_id){
		current_course = course
	} else if (marathon && marathon._id === course_id){
		current_course = marathon
	}
	console.log("CURRENT COURSE!", current_course)
	if (!current_course.exercisesAvailableWithoutProgress
		&& (
			// Курс полностью куплен
			current_course.allowed ||
			// Или курс не куплен но текущее задание явлется одним из разрешённых (кроме последнего)
			(!current_course.allowed && current_course.freeTasks && currentExerciseNumber < current_course.freeTasks - 1)
		)
	) {
		// Открыть для прохождения следующее задание
		dispatch({
			type: "ALLOW_NEXT_EXERCISE",
			exercise,
		})
		return true
	} else {
		return true
	}
}
export const finishExercise = (course_id, exercise_id, params) => (dispatch, getState) =>
	new Promise(resolve => {
		request(
			req.post(`/courses/${course_id}/progress/${exercise_id}`, {
				action: "finish",
				report: params,
			}),
		)
			.then(data => {
				dispatch({
					type: "UPDATE_PURCHASED_COURSE",
					purchasedCourse: data.purchasedCourse || {},
				})
				const { course, exercises, marathon} = getState();
				const nextAllowed = openNextExercise({
					dispatch,
					exercise: exercise_id,
					course,
					course_id,
					exercises,
					marathon
				});
				resolve({ ...data, nextAllowed})
			})
			.catch(err => console.error("CATCH getExercise ERROR", err))
	})

export const sendReport = (course_id, exercise_id, body) => (dispatch, getState) =>
	new Promise(async (resolve) => {
		// dispatch({
		// 	type: "SET_STATUS",
		// 	exercise: "is_loading",
		// });
		request(
			req.post(`/courses/${ course_id }/exercises/${ exercise_id }/report`, body),
		).then(async data => {
			dispatch({
				type: "UPDATE_PURCHASED_COURSE",
				purchasedCourse: data.purchasedCourse || {},
			});
			const { course, exercise, exercises } = getState();
			const currentExercise = exercise;
			let nextAllowed = false;
			if (currentExercise.reportModeration === "auto" && data.status && data.status === "ok") {
				dispatch({
					type: "SUCCESS",
					code: "SUCCESS_ANSWER",
				});
				nextAllowed = openNextExercise({
					dispatch,
					exercise: exercise_id,
					course,
					course_id,
					exercises
				});
			}
			await dispatch(getExercise(exercise_id, {status: false}));
			resolve({ ...data, nextAllowed})
		}).catch(err => {
			console.log("SEND REPORT ERROR", err)
			dispatch({
				type: "ERROR",
				code: err.code,
			})
		})
	});
