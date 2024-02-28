// Поиск купленыых курсов
export const findPurchasedCourses = (courses, purchasedCourse) => {
	return courses.filter(course => {
		return purchasedCourse.find(pcur => pcur.course === course._id)
	})
}

// Поиск одного купленного курса
export const findPurchasedCourse = (course_id, purchasedCourse) => {
	return purchasedCourse.find(pcur => pcur.course === course_id)
}

export const findCoursesInProgress = (courses, purchasedCourse) => {
	return courses.filter(course => {
		return purchasedCourse.find(pcur => {
			if(pcur.course === course._id) {
				const courseExercisesLength = course.exercises.length
				const activeExercisesLength = pcur.activeExercises.length
				if(courseExercisesLength === activeExercisesLength) {
					return (pcur.activeExercises[activeExercisesLength - 1] && !pcur.activeExercises[activeExercisesLength - 1].complete)
				} else if(courseExercisesLength > activeExercisesLength) {
					return true
				}
			}
		})
	})
}

export const courseIsPurchased = (course_id, purchasedCourse) => {
	const findResult = purchasedCourse.findIndex(pc => pc.course === course_id)
	if(findResult > -1 || findResult == null) {
		return true
	} else {
		console.log('false')
		return false
	}
};

export const getLessonProgress = (course_id, lesson_id, purchasedCourse) => {
	const findCourse = findPurchasedCourse(course_id, purchasedCourse)
	if(findCourse) {
		const findExercise = findCourse.activeExercises.find(aex => aex.exerciseId === lesson_id)
		return !(!findExercise || !findExercise.complete);
	}
}

export const sortEvents = (marathon, purchasedCourses) => {
	const events = []
	marathon.exercises.map((ex) => {
		const exProgress = getLessonProgress(marathon._id, ex._id, purchasedCourses)
		if(exProgress) {
			events.push({name: ex.title,  date: ex.startDate, complete: true})
		} else {
			events.push({name: ex.title,  date: ex.startDate, complete: false})
		}
	})
	return events
}

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
