import React, { Component } from "react"
import { connect } from "react-redux"
import { compose } from "redux"
import { getCourse, getExercises } from "../../../actions/courses"
import isLoading from "../../../hocs/isLoading"
import {setPlansModalOptions} from '../../../actions/plans'
import { getMe} from '../../../actions/sign';
import { startCourse } from "../../../actions/courses"
import { withNamespaces } from "react-i18next"
import { Actions } from "react-native-router-flux";
import {getCourseList} from "../../utils";
import { DefaultPubSubContext } from '../../utils/pubsub';

export default WrappedComponent => {
	class Logic extends Component {
		constructor(props){
			super(props);
			this.state = {
				loading: true,
				course: {},
				exercises: []
			}
		}
		static contextType = DefaultPubSubContext;

		updateCourse = async () => {
			this.setState({loading: true});
			const { navigation, dispatch } = this.props;
			const {exercises} =  await dispatch(getExercises(navigation.state.params._id));
			const {course} = await dispatch(getCourse(navigation.state.params._id, {populate: true}));
			this.setState({exercises, course, loading: false})
		}

		async componentDidMount() {
			const {subscribe} = this.context;
			this.updateCourse();
			subscribe("purchaseFinished", this.updateCourse);
		}

		componentWillUnmount() {
			const {unsubscribe} = this.context;
			unsubscribe("purchaseFinished", this.updateCourse);
		}

		checkAllowedExercisesUpdate = () => {
			const { exercises = [] } = this.props;
			const {exercises: localExercises} = this.state;
			let exercisesMap = {};
			let isPermUpdated = false;
			for (const ex of exercises) {
				exercisesMap[ex._id] = ex;
			}

			let updatedExercises = localExercises.map((ex) => {
				if(!ex.allowed && exercisesMap[ex._id].allowed){
					isPermUpdated = true;
					return {...ex, allowed: true}
				} else {
					ex
				}
			});

			if(isPermUpdated){
				this.setState({exercises: updatedExercises})	
			}
		}

		async componentDidUpdate(prevProps, prevState, snapshot) {
			const { navigation} = this.props;
			const { navigation: prevNavigation } = prevProps;
			if(navigation.state.params._id !== prevNavigation.state.params._id){
				this.updateCourse();
			}
			this.checkAllowedExercisesUpdate();
		}

		goToFirstLesson = async () => {
			const { navigation } = this.props
			const {exercises, course} = this.state;
			const {chapters} = course;
			const course_id = navigation.state.params._id;

			const courseList = getCourseList({exercises, chapters});
			let lessonToOpen = {
			};
			if(courseList[0].type === "chapter"){
				const firstChapterLesson = courseList[0]?.exercises[0];
				lessonToOpen = {
					_id: firstChapterLesson._id,
					type: firstChapterLesson.type,
					chapter: courseList[0],
					course_id
				}
			} else {
				lessonToOpen = {
					_id: courseList[0]._id,
					type: courseList[0].type,
					course_id
				};
			}
			Actions.push("lessons", { _id: course_id, title: course.title })
			if(lessonToOpen.chapter){
				Actions.push("chapter", {chapter_id: lessonToOpen.chapter._id, course_id})
			}
			if (lessonToOpen.type === "training") {
				Actions.push("trainings", lessonToOpen)
			} else if (lessonToOpen.type === "question" || lessonToOpen.type === "quiz") {
				Actions.push("quiz", lessonToOpen)
			} else {
				Actions.push("lesson", lessonToOpen)
			}
		}

		_buyCourse = () => new Promise(async (resolve)=>{
			let {navigation, dispatch } = this.props;
			let {course} = this.state;
			if(course.allowed || course.startAllowed || course.startTrialAllowed){
				dispatch(startCourse(navigation.state.params._id)).then(this.goToFirstLesson)
			} else if(course.attachedPlans) {
				Actions.offers({offers: course.attachedPlans});
			}
		})

		render() {
			let { purchasedCourses, navigation} = this.props;
			const {course} = this.state;
			const courseStarted = purchasedCourses.some(pc => pc.course === course._id);
			return (
				<WrappedComponent 
					courseStarted = {courseStarted} 
					loading={this.state.loading} 
					_buyCourse={this._buyCourse}
					course = {this.state.course}
					exercises = {this.state.exercises}
					course_id = {navigation.state.params._id}
					{...this.props} 
				/>
			)
		}
	}



	return compose(
		withNamespaces(["app_courses"], { wait: true }),
		// isLoading({
		// 	status_path: ({ status }) => ({ status: status.course }),
		// }),
		connect(({ exercises, influencer, me, purchasedCourses, isCustomApp }) => ({ exercises, influencer, me, purchasedCourses, isCustomApp }))
	)(Logic)
}
