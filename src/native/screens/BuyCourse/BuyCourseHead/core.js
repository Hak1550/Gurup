import { config } from "../../../styles/variables";
import React from "react";
import dark from "./dark"
import light from "./light"

const themedComponents = {
    dark,
    light
}

export default (props) => {
    const ThemedComponent = themedComponents[config.theme] ? themedComponents[config.theme] : null;
    return <ThemedComponent {...props}/>
}