import React, {Component} from "react";
import {View} from "react-native";
import {Actions} from 'react-native-router-flux'

import Button from "../../components/Button";
import Logic from './logic'
import * as Styled from "./styles";

class WelcomeVideo extends Component {
	render() {
		return (
			<View style={{flex: 1, alignItems: 'center'}}>
				{/* <Styled.VideoView
					source={require('../../assets/core/test_video.mp4')}
					muted={false}
					resizeMode={"cover"}
					shouldPlay
				/> */}
				<Styled.ControlContainer>
					<Button
						onPress={() => Actions.replace('tabbar')}
						title="Skip"
						theme="white"
						size="medium"
					/>
				</Styled.ControlContainer>
			</View>
		)
	}
}

export default Logic(WelcomeVideo)
