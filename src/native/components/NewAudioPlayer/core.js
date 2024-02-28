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
import { MediaStates } from '@react-native-community/audio-toolkit';

const AudioPlayer = props => {
	const { player, state, toggleRate } = props;
	return (
		<PlayerContainer>
			<PlayerControlButton onPress={player.canPrepare ? props.start : props.playAndPause} active={player.isPlaying} activeOpacity={0.9}>
				{player.state === MediaStates.PREPARING ? (
					<Preloader size="small" color="#000" />
				) : (
					<PlayerControlButtonIcon
						active={player.isPlaying}
						name={player.isPaused || player.canPrepare ? 'play' : 'pause'}
					/>
				) } 
			</PlayerControlButton>


			<Slider
				style={{
					flex: 1,
				}}
				step={1}
				value={
					parseInt(state.progress * 100, 10)
				}
				minimumValue={0}
				maximumValue={100}
				onSlidingStart={()=>{
					// console.log("start");
					props.pause();
				}}
				onSlidingComplete={async (value)=>{
					// console.log("onSlidingComplete ",value);
					props.setTime(value/100);
				}}
			/>
			<RateButton onPress={props.toggleRate}>
				<RateButtonText>x{props.state.speed}</RateButtonText>
			</RateButton>
			{/* <RateButton active={player.speed === 1} onPress={() => props.setRate(1)}>
				<RateButtonText active={player.speed === 1}>x1</RateButtonText>
			</RateButton>
			<RateButton active={player.speed === 1.5} onPress={() => props.setRate(1.5)}>
				<RateButtonText active={player.speed === 1.5}>x1.5</RateButtonText>
			</RateButton>
			<RateButton active={player.speed === 2} onPress={() => props.setRate(2)}>
				<RateButtonText active={player.speed === 2}>x2</RateButtonText>
			</RateButton> */}
		</PlayerContainer>
	)
}

AudioPlayer.propTypes = {
	source: PropTypes.string.isRequired,
}

export default Logic(AudioPlayer)
