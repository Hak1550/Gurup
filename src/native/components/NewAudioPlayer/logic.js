import React from 'react';
// import { Audio } from "expo-av"
import { Player, MediaStates } from '@react-native-community/audio-toolkit';
import { Platform } from 'react-native';
// import { MediaStates } from '@react-native-community/audio-toolkit';

export default (WrappedComponent) => {
  class Logic extends React.Component {
    constructor(props) {
      super(props);
      this.player = new Player(props.source, {
        continuesToPlayInBackground: true,
      }).on('ended', () => {
        clearInterval(this.playbackUpdate);
        this.player.destroy();
        this.setState({
          progress: 0,
          status: this.player.state,
        });
      });
      this.state = {
        speed: this.player.speed,
        status: this.player.state,
        progress: 0,
      };
    }

    componentDidMount() {
      // this.player.prepare((error) => {
      // 	this.setState({ status: this.player.state })
      // });
      if (this.player && Platform.OS === 'android') {
        this.player.wakeLock = true;
      }
    }

    componentWillUnmount() {
      if (this.player) {
        this.player.stop(() => {
          this.setState({ status: this.player.state });
        });
        this.player.wakeLock = false;
        clearInterval(this.playbackUpdate);
      }
    }

    setRate = async (rate) => {
      this.player.speed = rate;
      this.setState({ speed: this.player.speed });
    };

    toggleRate = async () => {
      try {
        let { speed } = this.state;
        if (speed >= 1 && speed < 2) {
          speed += 0.5;
        } else if (speed === 2) {
          speed = 1;
        }
        this.player.speed = speed;
        this.setState({ speed });
        // await this.sound.setRateAsync(rate, true);
        // this.setState({
        // 	rate
        // })
      } catch (e) {
        console.log('error in set rate ', e);
      }
    };

    setTime = async (time) => {
      if (this.player) {
        // console.log('SEEK TO', this.player.duration * time);
        this.player.seek(this.player.duration * time, () => {
          this.player.play();
          this.setState({
            progress: this.player.currentTime / this.player.duration,
            status: this.player.state,
          });
        });
      }
    };

    _start = () => {
      this.setState({ status: MediaStates.PREPARING });
      if (Platform.OS === 'android') {
        this.player.speed = 0;
      }
      this.player.prepare((error) => {
        this.setState({ status: this.player.state });
        this.player.play((e) => {
          if (Platform.OS === 'android') {
            this.player.speed = 1;
          }
          this.setState({ status: this.player.state });
          this.playbackUpdate = setInterval(() => {
            // console.log('States', MediaStates);
            // console.log(
            //   'In progress',
            //   this.player.currentTime,
            //   this.player.duration,
            //   this.player.state
            // );
            if (this.player.duration !== -1 && this.player.currentTime !== -1) {
              this.setState({
                progress: this.player.currentTime / this.player.duration,
              });
            }
          }, 500);
        });
      });
    };
    _play = () => {
      this.player.play();
      this.setState({ status: this.player.state });
    };

    _pause = () => {
      this.player.pause();
      this.setState({ status: this.player.state });
    };

    _playAndPause = async () => {
      if (this.player) {
        this.player.playPause((error) => {
          this.setState({ status: this.player.state });
        });
      }
    };

    render() {
      return (
        <WrappedComponent
          playAndPause={this._playAndPause}
          setRate={this.setRate}
          toggleRate={this.toggleRate}
          setTime={this.setTime}
          pause={this._pause}
          start={this._start}
          play={this._play}
          player={this.player}
          state={this.state}
          {...this.props}
        />
      );
    }
  }

  return Logic;
};
