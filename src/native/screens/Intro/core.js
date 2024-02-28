import React, {Component} from "react";
import {connect} from "react-redux";
import AppIntroSlider from 'react-native-app-intro-slider';
import Introduction from './Introduction';
import About from './About';
import SignUp from './SignUp';
import styles from "./styles";

class Intro extends Component {
	goToSignUp = () => {
		this.introSlider.goToSlide(1);
	};

	goToSignIn = () => {
		this.introSlider.goToSlide(1);
	};

	goToIntroduction = () => {
		this.introSlider.goToSlide(0);
	};

	componentDidMount = () => {
		this.props.dispatch({type: "SET_SCREEN", screen: 2});
	}

	render(){
		const slides = [{key: "introduction"}, {key: "signup"}];
		const renderSlide = ({ item: { key }, ...rest}) => {
			switch (key) {
				case "introduction":
					return <Introduction
						onSignUp = {this.goToSignUp}
						onSignIn = {this.goToSignIn}
						goToIntroduction={this.goToIntroduction}
						{...rest} />
				case "about":
					return <About
						onSignUp = {this.goToSignUp}
						onSignIn = {this.goToSignIn}
						goToIntroduction={this.goToIntroduction}
						{...rest} />
				case "signup":
					return <SignUp
						goToIntroduction={this.goToIntroduction}
						{...rest} />
			}
		};

		return (
			<AppIntroSlider
				dotStyle={styles['intro__dot']}
				activeDotStyle={styles['intro__dot_active']}
				paginationStyle={styles['intro__dots']}
				slides={slides}
				renderItem={renderSlide}
				renderNextButton={() => null}
				renderDoneButton={() => null}
				ref = {(introSlider) => this.introSlider = introSlider}
			/>
		)
	}
}

export default connect(null)(Intro)
