import React, {Component, Fragment} from "react";
import {Label, Wrap, Button } from "./styles"

const DefButton = ({data})=>{
    return (
        <audio controls src={data.src}></audio>
    )
};

export default DefButton
