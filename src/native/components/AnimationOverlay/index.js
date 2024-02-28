import React, { Component } from 'react';
import {Text} from 'react-native';
import { connect } from 'react-redux'
import { compose } from 'redux'
import LottieView from 'lottie-react-native'
import Modal from 'react-native-modal'
import checked from '../../assets/core/animations/checked'
import trash from '../../assets/core/animations/trash'

const animations = {}
animations.checked = checked
animations.trash = trash

class AnimationOverlay extends Component {
	closeModal = () => {
		const { dispatch } = this.props
		dispatch({
			type: 'STOP_ANIMATION',
		})
	}

	render() {
		try {
			const { animation, dispatch } = this.props
			let anim = null;
			let text = null;
			let backdropOpacity
			if (!animation.duration) {
				animation.duration = 1500
			}
			// console.log("animations ",animations)
			if (animation && animation.name && animations[animation.name]) {

				anim = (
					<LottieView
						style={{
							flex:1
						}}
						autoPlay
						loop={false}
						duration={animation.duration ? animation.duration : undefined}
						ref={(animationRef) => {
							this.animationRef = animationRef
						}}
						onAnimationFinish={() => {

							// dispatch({
							// type:"STOP_ANIMATION"
							// })
						}}
						source={animations[animation.name]}
					/>
				)
				if(animation && animation.text){
					text = (<Text style={{
						color:"#fff",
						flex:1,
						position:"absolute",
						bottom:20,
						width:"100%",
						textAlign:"center",
						paddingHorizontal:10,
						fontSize:16
					}}>
						{animation.text}
					</Text>);
				}
				

				setTimeout(() => {

					dispatch({
						type: 'STOP_ANIMATION',
					})
				}, animation.duration)
				if (animation.backdropOpacity != null) {
					backdropOpacity = animation.backdropOpacity
				}
			}

			return (
				<Modal
					style={{
						flex: 1,
						flexDirection: 'column',
						margin: 0,
						backgroundColor: 'rgba(0,0,0,0.4)',
					}}
					backdropOpacity={backdropOpacity}
					isVisible={!!anim}
					onBackButtonPress={this.closeModal}
					onBackdropPress={this.closeModal}
					animationIn={backdropOpacity === 0 ? undefined : 'slideInRight'}
					animationOut={backdropOpacity === 0 ? undefined : 'slideOutRight'}
					animationInTiming={150}
					animationOutTiming={150}
					useNativeDriver>
						{anim}
						{text}
				</Modal>
			)
		} catch (e) {
			return null
		}
	}
}

export default compose(
	connect(({ animation }) => ({ animation })),
)(AnimationOverlay)
