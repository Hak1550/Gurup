import React, {Component, useEffect} from "react";
import { Dimensions } from "react-native";
import { connect } from "react-redux";
import { compose } from "redux";
import { getCourses } from "../../../actions/courses";
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { config } from "../../styles/variables";
import isLoading from "../../../hocs/isLoading";
import { withNamespaces } from "react-i18next";
import { DefaultPubSubContext } from '../../utils/pubsub';

export default WrapperComponent => {
	class Logic extends Component {
		constructor() {
			super();
			this.state = {
				isModalVisible: false,
				activeTag:null
			};
		}
		static contextType = DefaultPubSubContext;

		onPurchaseFinish = () => {
			const { dispatch } = this.props;
			// console.log("Purchase finished in courses");
			dispatch(getCourses());
		}

		componentDidMount() {
			const { dispatch } = this.props;
			const {subscribe} = this.context;
			dispatch(getCourses());
			subscribe("purchaseFinished", this.onPurchaseFinish);
		}

		componentWillUnmount() {
			const {unsubscribe} = this.context;
			unsubscribe("purchaseFinished", this.onPurchaseFinish)
		}

		setActiveTag = ({tagId}) => {
			// console.log("setActiveTag ",tagId)
			if(tagId){
				this.setState({
					activeTag:tagId
				})
			}else{
				this.setState({
					activeTag:null
				})
			}
		}
		getProgress = course => {
			const { purchasedCourses } = this.props;
			const purchasedCourse = purchasedCourses.find(
				purchasedCourse => purchasedCourse.course === course._id
			);
			if (purchasedCourse && purchasedCourse.activeExercises) {
				return (
					purchasedCourse.activeExercises.filter(({ complete }) => complete).length /
					course.exercises.length
				);
			} else {
				return 0;
			}
		};

		_toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

		render() {
			return (
				<WrapperComponent
					getProgress={this.getProgress}
					_toggleModal={this._toggleModal}
					setActiveTag={this.setActiveTag}
					state={this.state}
					{...this.props}
				/>
			);
		}
	}
	return compose(
		withNamespaces(["courses", "app_courses"], { wait: true }),
		isLoading({
			status_path: ({ status }) => ({ status: status.courses }),
		}),
		connect(({ courses, purchasedCourses, tags, influencer }) => ({ courses, purchasedCourses, tags, influencer }))
	)(Logic);
};
