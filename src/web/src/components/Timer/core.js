import {CircularProgressbarWithChildren} from "react-circular-progressbar";
import {TimerText, TimerWrap} from "./styles"
import React, {Component} from "react";
// import Timer from "react-compound-timer";
import Countdown from "react-countdown-now";
import { withTheme } from 'styled-components'

class _Timer extends Component {
    constructor(props){
        super(props);
        const {seconds = 55} = this.props;
        this.state = { countdownDate: Date.now() + (seconds*1000) };
    }
    render() {
        let {timerRef, progress, children, ...rest} = this.props;

        console.log("PROGRESS", progress);
        return (
            <TimerWrap>
                <Countdown
                    ref={timerRef}
                    date = {this.state.countdownDate}
                    renderer={({ formatted: {minutes, seconds}, completed}) => {
                        if (completed && children) {
                            // Render a completed state
                            return children;
                        } else {
                            // Render a countdown
                            return (
                                    <CircularProgressbarWithChildren value={progress} strokeWidth={14}>
                                        <TimerText>{minutes}:{seconds}</TimerText>
                                    </CircularProgressbarWithChildren>
                                )
                        }
                    }}
                    {...rest}
                />
            </TimerWrap>

    );
    }
}

export default withTheme(_Timer)
