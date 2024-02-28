import React from 'react'
import PropTypes from 'prop-types'
// import {Slider} from 'react-native';
import Slider from "react-native-slider";
import Logic from './logic'
import {
	PlayerContainer,
	PlayerControlButton,
	PlayerControlButtonIcon,
	PlayerDurationContainer,
	PlayerDuration,
	RateButton,
	RateButtonText,
} from './styles'
import Preloader from '../Preloader/core'

const AudioPlayer = props => {
	const { playingStatus, soundCurrentDuration, soundDuration} = props.state
	let playingProgress = (soundCurrentDuration * 100) / soundDuration || 0;

	return (
		<PlayerContainer>
			<PlayerControlButton onPress={props.playAndPause} active={playingStatus === 'playing'} activeOpacity={0.9}>
				{playingStatus === 'loading' ? (
					<Preloader size="small" color="#000" />
				) : (
					<PlayerControlButtonIcon
						active={playingStatus === 'playing'}
						name={playingStatus === 'nosound' ? 'play' : playingStatus === 'pause' ? 'play' : 'pause'}
					/>
				)}
			</PlayerControlButton>


			<Slider
				style={{
					flex: 1,
				}}
				step={1}
				value={
					parseInt(playingProgress,10)
				}
				minimumValue={0}
				maximumValue={100}
				onSlidingStart={()=>{
					props.pause();
				}}
				onSlidingComplete={async (value)=>{
					await props.setTime(value/100);
					setTimeout(()=>{
						props.play();
					},100)
				}}
			/>
			{/*
			<PlayerDurationContainer onPress={(evt)=>{
				if(this.width && evt.nativeEvent.locationX){
					console.log("coeff = ",(evt.nativeEvent.locationX/this.width));
					props.setTime(evt.nativeEvent.locationX/this.width)
				}				
			}} onLayout={(event) => {
				var {x, y, width, height} = event.nativeEvent.layout;
				this.width = width;
			}}>
				<PlayerDuration value={playingProgress} />
			</PlayerDurationContainer>*/}
			<RateButton onPress={props.toggleRate}>
			<RateButtonText>x{props.state.rate}</RateButtonText>
			</RateButton>
			{/* <RateButton active={props.state.rate === 1.5} onPress={() => props.setRate(1.5)}>
				<RateButtonText active={props.state.rate === 1.5}>x1.5</RateButtonText>
			</RateButton>
			<RateButton active={props.state.rate === 2} onPress={() => props.setRate(2)}>
				<RateButtonText active={props.state.rate === 2}>x2</RateButtonText>
			</RateButton> */}
		</PlayerContainer>
	)
}

AudioPlayer.propTypes = {
	source: PropTypes.string.isRequired,
}

export default Logic(AudioPlayer)
