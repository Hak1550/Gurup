import React from "react";
import propTypes from "prop-types";
import {PlaceholderText, PlaceholderWrap, PlaceholderActionButton} from "./styles";
import Button from "../Button";

const ScreenPlaceholder = ({imageComponent, text, buttonAction, buttonText}) => {
    const placeholderImage = typeof imageComponent === "function" ? imageComponent() : imageComponent;
    return (
        <PlaceholderWrap>
            {placeholderImage}
            {text && <PlaceholderText>{text}</PlaceholderText>}
            {buttonAction && <PlaceholderActionButton title={buttonText} onPress={buttonAction} />}
        </PlaceholderWrap>
    )
}


ScreenPlaceholder.propTypes = {
    imageComponent: propTypes.oneOfType([propTypes.elementType, propTypes.func, propTypes.object]),
    text: propTypes.string,
    buttonAction: propTypes.func
}

// LanguageFixNeeded Fixed
ScreenPlaceholder.defaultProps = {
    buttonText: "Done"
}

export default ScreenPlaceholder
