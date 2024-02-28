import React, {Component, Fragment} from "react";
import {View, Text, TouchableOpacity, ImageBackground} from "react-native";
// import * as LinearGradient from 'expo-linear-gradient';
import {LinearGradient} from "expo-linear-gradient";
import {gradients} from "../../styles/variables";
import MainLayout from "../../components/MainLayout";
import NStatusBar from "../../components/Statusbar"
import {connect} from 'react-redux'
import {compose} from 'redux';
import {getExercise} from '../../../actions/courses'
import isLoading from "../../../hocs/isLoading";
import Preloader from "../../components/Preloader"
import {Actions} from "react-native-router-flux"

export default (WrappedComponent) => {
    class Logic extends Component {
        state = {
            loaded: false,
            showFinish: false 
        };

        async componentDidMount() {
            const { navigation, dispatch, quiz } = this.props;
            const { _id } = navigation.state.params;
            dispatch({
                type: "REST_QUIZ",
            })
            // console.log("quiz dm ",_id);
            if (_id){
                setTimeout(async() => {
                    await dispatch(getExercise(_id))
                    dispatch({
                        type: "REST_QUIZ",
                    })
                    this.setState({ loaded: true })
                    // console.log("loaded quiz");
                }, 1000);
            }
        }

        _clickAnswer = (answer) =>{
            let { dispatch, exercise, quiz={}, navigation } = this.props;
            const { index = 0 } = quiz;
            if (this.state.showResult) {
                return
            }
            // console.log("ANSWER ", answer);
            // console.log("exercise ", exercise);
            this.setState({
                showResult: answer,
            })
            setTimeout(() => {
                dispatch({
                    type: 'ANSWER_QUESTION',
                    score: answer.isTrue ? 1 : 0
                });
                if (!((index + 1) < exercise.blocks.length)) {
                    // Actions.replace("quizFinish", { id: exercise._id, course_id: navigation.state.params.course_id })
                    this.setState({showFinish: true});
                }
                this.setState({
                    showResult: false,
                })
            }, 1000)
            // let questionsLength = 1 / exercise.questions.length
        }
        resetTest = () => this.setState({showFinish: false})
        //TODO: Подумать как сделать нормальное состояние загрузки при быстрой смене экранов
        render() {
            // console.log("render quiz ",this.props.exercise)
            const {navigation} = this.props

            return <WrappedComponent
                state={this.state}
                chapter={navigation.state.params.chapter}
                courseId={navigation.state.params.course_id}
                _clickAnswer={this._clickAnswer}
                resetTest={this.resetTest}
                {...this.props}/>
        }

    };

    return compose(
        isLoading({
            status_path: ({ status }) => ({ status: status.exercise }),
        }),
        connect(({ exercise, quiz }) => ({ exercise, quiz }))
    )(Logic)
}