import React from "react";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
    return Logic
}

