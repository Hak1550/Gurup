import React, {Component, Fragment} from "react";
import {Avatar} from "./styles"

 const DefAvatar = ({name, icon, theme="pink", className, img})=>{
    return (
        <Avatar className={`${theme} ${className} ${!img ? "default" : ""}`} img={img}>
            {!img ? icon ? <i className={icon}/> : name ? name.slice(0,1) : "" : ""}
        </Avatar>
    )
};
export default DefAvatar
