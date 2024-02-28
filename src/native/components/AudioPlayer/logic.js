import React from "react"
import { Audio } from "expo-av"


export default WrappedComponent => {
	class Logic extends React.Component {
		state = {
			playingStatus: "nosound",
			playingProgress: 0,
			rate: 1,
			justScrubbed:null,
			status:null
		}


		async componentDidMount() {
			// console.log("staysActiveInBackground 1")
			await Audio.setAudioModeAsync({
				allowsRecordingIOS: false,
				staysActiveInBackground: true,
				interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
				playThroughEarpieceAndroid:false,
				shouldDuckAndroid:true,
				interruptionModeIOS:Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
				playsInSilentModeIOS:true
			})
			// console.log("staysActiveInBackground 2")
		}


		componentWillUnmount() {
			// console.log("unmount");
			if (this.sound) {
				this.sound.unloadAsync()
			}
		}

		setRate = async rate => {
			try{
				await this.sound.setRateAsync(rate,true);
				this.setState({
					rate
				})
			}catch(e){
				console.log("error in set rate ",e);
			}
		}
		toggleRate = async () => {
			try {
				let {rate} = this.state;
				if (rate >= 1 && rate < 2) {
					rate+=0.5
				} else if (rate === 2) {
					rate = 1;
				}
				await this.sound.setRateAsync(rate, true);
				this.setState({
					rate
				})
			} catch (e) {
				console.log("error in set rate ", e);
			}
		}
		setTime = async time => {
			// console.log("time ",time);
			if(this.sound){
				// let status = await this.sound.getStatusAsync();
				let {status} = this.state;
				// console.log("status ",status);
				if(status && status.durationMillis){
					await this.sound.setPositionAsync(time * status.durationMillis);
					// console.log("SET TIME ",time);
					this.setState({justScrubbed:time * status.durationMillis});
				}
			}
		}

		_playRecording = async () => {
			const { source } = this.props
			const { sound } = await Audio.Sound.createAsync(
				{ uri: source },
				{
					downloadFirst:true,
					shouldPlay: true,
					progressUpdateIntervalMillis:500
				},
				this._updateScreenForSoundStatus
			)
			this.sound = sound
			// this.setState({
				// playingStatus: "playing",
			// })
		}

		_pauseAndPlayRecording = async () => {
			if (this.sound != null) {
				if (this.state.playingStatus === "playing") {
					await this.sound.pauseAsync()
					this.setState({
						playingStatus: "pause",
					})
				} else {
					await this.sound.playAsync()
					this.setState({
						playingStatus: "playing",
					})
				}
			}
		}
		_pause = () => {
			if (this.sound != null) {
				this.sound.pauseAsync()
				this.setState({
					playingStatus: "pause",
				})
			}
		}
		_play = () => {
			if (this.sound != null) {
				this.sound.playAsync()
				this.setState({
					playingStatus: "playing",
				})
			}
		}

		_playAndPause = async () => {
			switch (this.state.playingStatus) {
				case "nosound":
					await this._playRecording()
					break
				case "pause":
				case "playing":
					await this._pauseAndPlayRecording()
					break
			}
		}

		_updateScreenForSoundStatus = status => {
			const soundDuration = status.durationMillis
			const soundCurrentDuration = status.positionMillis
			let soundProgress = (soundCurrentDuration * 100) / soundDuration

			// console.log("soundCurrentDuration ", soundCurrentDuration,"   soundDuration ",soundDuration,"   soundProgress ",soundProgress);

			if(isNaN(soundProgress)){
				soundProgress = 0;
			}
			if(status.didJustFinish){
				this.sound.pauseAsync()
				this.sound.setPositionAsync(0);
				this.setState({
					playingStatus: "pause"
				})
			}else if (
				!status.isLoaded && this.state.playingStatus === "nosound"
				|| (this.state.playingStatus === "loading" && this.state.isPlaying == false)
				|| (this.state.playingStatus === "loading" && soundProgress == 0)
			) {
				// console.log("loading...");
				this.setState({
					status,
					// playingProgress:soundProgress,
					soundDuration,
					soundCurrentDuration,
					playingStatus: "loading"
				})
			} else if (
				status.isPlaying
			) {
				// console.log("playing...");
				this.setState({
					status,
					// playingProgress:soundProgress,
					soundDuration,
					soundCurrentDuration,
					playingStatus: "playing",
				})
			} else if (!status.isPlaying  ) {
				this.setState({
					status,
					soundDuration,
					soundCurrentDuration,
					// playingProgress:soundProgress,
					playingStatus: "pause"
				})
			}

			
		}

		render() {
			return (
				<WrappedComponent
					playAndPause={this._playAndPause}
					pauseAndPlayRecording={this._pauseAndPlayRecording}
					setRate={this.setRate}
					state={this.state}
					setTime={this.setTime}
					pause={this._pause}
					play={this._play}
					toggleRate={this.toggleRate}
					{...this.props}
				/>
			)
		}
	}

	return Logic
}
