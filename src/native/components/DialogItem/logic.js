import React from "react";

export default (WrappedComponent) => {
    class Logic extends React.Component {
        render() {
            const {image, dialogName} = this.props
            let avatarProps = {name: dialogName};
            if(image){
                avatarProps.uri = image;
            }
            return <WrappedComponent avatarProps={avatarProps} {...this.props}/>
        }
    }
    return Logic
}