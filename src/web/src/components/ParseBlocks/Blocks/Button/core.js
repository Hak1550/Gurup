import React, {Component, Fragment} from "react";
import {Label, Wrap, Button } from "./styles"

const DefButton = ({data})=>{
    return (
        <Button href={data.link} target="_blank">{data.text}</Button>
    )
};

export default DefButton
