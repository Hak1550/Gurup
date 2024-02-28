import React, {Component} from "react";
import {Actions} from "react-native-router-flux"
import {connect} from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { compose } from "redux";

export default (WrappedComponent) => {
    class Logic extends Component {
        _onPress = async (type) => {
            const { course_id, exercise, chapter = null } = this.props
            // console.log('course id lesson item ->', type, exercise);
            const { _id } = exercise;
            if (type === "training") {
                Actions.trainings({ _id, course_id, chapter })
            } else if (type === "question" || type === "quiz") {
                Actions.quiz({ _id, course_id, chapter })
            } else {
                Actions.lesson({ _id, course_id, chapter })
            }
        }

        render() {
            return <WrappedComponent _onPress={this._onPress} {...this.props}/>
        }
    }

    return compose(
        withNamespaces(["app_basic", "app_marathon"]),
        connect(({ course }) => ({ course })
    ))(Logic)
}

