import React, {Component} from 'react'
import {Actions, } from "react-native-router-flux";
import {connect} from 'react-redux'
import {compose} from 'redux';
import {getExercise, finishExercise, getExercises} from "../../../actions/courses";
import {togglePlansModal} from "../../../actions/plans";
import { withNamespaces } from "react-i18next"
import {getNextLessonPath} from "../../utils";

export default (WrappedComponent) => {
    class Logic extends Component {

        goToNextLesson = async () => {

            // const { dispatch, exercise, exercises, course, navigation } = this.props;
			// const chapter = navigation?.state?.params?.chapter;
			// const course_id = navigation.state.params.course_id;
			// const nextScreenPath = getNextLessonPath({exercise, exercises, chapter, course_id})
			// if(nextScreenPath){
			// 	const {nextLesson, screen, stay} = nextScreenPath;
			// 	if(stay){
			// 		await dispatch(getExercise(nextScreenPath?.nextLesson._id))
			// 	} else if (nextLesson.allowed) {
			// 		Actions.replace(screen, nextLesson);
			// 	}
            // }
            
            const { dispatch, exercise, exercises, course, module, marathon, navigation } = this.props;
            const chapter = navigation?.state?.params?.chapter;
			const course_id = navigation.state.params.course_id;
            const nextScreenPath = getNextLessonPath({exercise, exercises, chapter, course_id});
            
            const marathon_id = marathon._id
            // console.log('course', module)

            if(this.props.module === 'marathon' && marathon_id) {
                await dispatch(finishExercise(marathon_id, exercise._id));
                Actions.pop();
            } else {
                if(!nextScreenPath){
                    // console.log("no next patch", nextScreenPath);
                    await dispatch(finishExercise(course_id, exercise._id));
                    Actions.pop();
                    return;
                }
                let nextAllowed;
                try {
                    const finish_result = await dispatch(finishExercise(course_id, exercise._id));
                    nextAllowed = finish_result.nextAllowed;
                } catch (error) {
                    console.error("ERROR FINISHING TRAINING", error)
                }
                // console.log("Finish", nextAllowed);
                if(nextAllowed && chapter){
                    const {nextLesson, screen} = nextScreenPath;
                    Actions.replace(screen, nextLesson);
                    // dispatch({
                    //     type: 'REST_QUIZ',
                    // });
                }  else {
                    Actions.pop();
                }
            }
        }

        render() {
            return <WrappedComponent
                goToNextLesson={this.goToNextLesson}
                {...this.props}/>
        }
    }
    return compose(
        withNamespaces(["app_courses"], { wait: true }),
        connect(({ exercise, exercises, course, marathon }) => ({ exercise, exercises, course, marathon }))
    )(Logic);
    // return connect(({exercise, exercises, course}) => ({exercise, exercises, course}))(Logic)
}

