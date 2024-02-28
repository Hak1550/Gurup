import React, { Fragment, useEffect, useState } from "react";
import Ripple from 'react-native-material-ripple';

class Touchable extends React.Component {
    render() {
        const {children, ...rest } = this.props;
        return (
            <Ripple
                // rippleOpacity={0.1}
                // rippleDuration={300}
                {...rest}
            >
                {children}
            </Ripple>
        )
    }
}
export default Touchable;