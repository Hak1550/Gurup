import React, {Component, Fragment} from "react";
import {Label, Wrap, Button } from "./styles"

const Download = ({data})=>{
    console.log("data",data);
    
    return (
        <a href={data.src}>
            <Wrap>
                <Button size="circle"><i className="fas fa-upload"/></Button>
                <Label>{data.name}</Label>
            </Wrap>
        </a>
    )
};

export default Download
