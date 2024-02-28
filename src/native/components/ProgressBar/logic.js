import React from "react";
import {Animated} from 'react-native';

export default (WrappedComponent) => {
    class Logic extends React.Component {
        constructor(props){
            super(props);
            this.state = {
                animation : new Animated.Value(props.progress)
            }
        }
        componentDidUpdate(prevProps, prevState) {
            if (prevProps.progress !== this.props.progress) {
                if (this.progress > prevProps.progress){
                    Animated.timing(this.state.animation, {
                        toValue: this.props.progress,
                        duration: this.props.duration
                    }).start();
                } else {
                    this.state.animation.setValue(this.props.progress);
                }
            }
        }
        render(){
            const width = this.state.animation.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
                extrapolate: "clamp"
            });
            return <WrappedComponent  width={width} {...this.props}/>;
        }
    }

    return Logic;
}





