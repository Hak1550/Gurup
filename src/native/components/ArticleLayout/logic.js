import React, { Component } from "react"
import * as VideoThumbnails from 'expo-video-thumbnails';
import {withNamespaces} from "react-i18next";
import {Actions} from "react-native-router-flux";
import {getExercise} from "../../../actions/courses";
import {connect} from "react-redux";
import {compose} from "redux";

export default WrappedComponent => {
	class Logic extends Component {
		state = {
			galleryItemIndex: 0,
			activeFaqItem: null,
		}

		setGalleryIndex = index => {
			this.setState({ galleryItemIndex: index })
		}

		setActiveFaqItem = index => {
			this.setState({ activeFaqItem: index })
		}
		setVideoThumbnail = async (src) => {
			try {
				const { uri } = await VideoThumbnails.getThumbnailAsync(
					src,
					{
						time: 1000,
					}
				);
				// console.log("Video thubmnail", uri);
				this.setState({ videoThumbnail: uri });
			} catch (e) {
				console.warn(e);
			}
		}
		componentDidMount(){
			const {block} = this.props;
			if (!block || !block.type || block.length || !block.data) {
				return
			}
			switch (block.type.toLowerCase()){
				case "video":
					this.setVideoThumbnail(block.data)
					break;
			}
		}

		// Actions.trainings({ _id, course_id, chapter })
// } else if (type === "question" || type === "quiz") {
// 	Actions.quiz({ _id, course_id, chapter })
// } else {
// 	Actions.lesson({ _id, course_id, chapter })
		goToInternalLink = (internalLink) => {
			const {currentScreenType, dispatch} = this.props;
			// console.log("Internal link!", internalLink);
			if(internalLink._id){
				switch (internalLink.type){
					case "exercise":
						if(currentScreenType === "exercise"){
							Actions.refresh({ _id: internalLink._id, course_id: internalLink.parent._id});
						} else {
							Actions.push("lesson", { _id: internalLink._id, course_id: internalLink.parent._id});
						}
						break;
					case "course":
						Actions.buyCourse( {  _id: internalLink._id });
						break;
					case "training":
						Actions.replace("trainings", {  _id: internalLink._id, course_id: internalLink.parent._id });
						break;
					case "quiz":
						Actions.replace("quiz", {  _id: internalLink._id, course_id: internalLink.parent._id });
						break;
					case 'menu':
						return Actions.nutritionMenuSingle({id: internalLink._id})
					case 'recipe':
						return Actions.nutritionRecipeSingle({id: internalLink._id})
					case 'article':
						return Actions.article({_id: internalLink._id})
					case 'marathon':
						return Actions.replace("buyMarathon", {_id: internalLink._id})
				}
			}
		}

		render() {
			return (
				<WrappedComponent
					goToInternalLink = {this.goToInternalLink}
					setGalleryIndex={this.setGalleryIndex}
					setActiveFaqItem={this.setActiveFaqItem}
					state={this.state}
					{...this.props}
				/>
			)
		}
	}
	return compose(
		withNamespaces(["app_basic"]),
		connect(null)
	)(Logic)
}
