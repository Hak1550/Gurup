import React, { Component } from "react";
import { Actions } from "react-native-router-flux";
import {withNamespaces } from "react-i18next";

export default WrappedComponent => {
	class Logic extends Component {
		goToCourse = (type, _id) => {
			const {course} = this.props;
			// if (type === "course") {
			// 	Actions.lessons({ _id });
			// } else if (type === "marathon") {
			// 	Actions.marathonMain({ _id });
			// } else if(type === "buy_marathon") {
			// 	Actions.buyMarathon({ _id });
			// } else if(type === "buy_course") {
			// 	Actions.buyCourse({ _id });
			// }
			if(type === "course"  || type === "buy_course"){
				Actions.buyCourse({ _id });
			} else if(type === "marathon") {
				Actions.marathonMain({ _id });
			} else if(type === "buy_marathon"){
				Actions.buyMarathon({ _id });
			}
		};

		render() {
			const {course} = this.props;
			// console.log("COURSE CHAPTERS", course.title, course.chapters);
			return <WrappedComponent 
				formatPrice={this.formatPrice}
				goToCourse={this.goToCourse} 
				{...this.props} 
			/>;
		}
	}

	return withNamespaces(["app_basic"])(Logic);
};
