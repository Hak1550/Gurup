import React from 'react'
import Lottie from 'react-lottie';

export default class AnimatedIcon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isStopped: false, isPaused: false};
    }
    render() {
        const {options, animationData, className, onClick, ...rest} = this.props;
        const defaultOptions = {
            loop: true,
            autoplay: true,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        return (
            <div onClick = {onClick} className={className}>
                <Lottie options = {{defaultOptions, animationData , ...options}} {...rest}/>
            </div>
        )
    }
}
