import React from "react"
import { Parser } from 'html-to-react';
const htmlToReact = new Parser();

const Html = ({data}) => {
	console.log("html", data);
	
	return (
		htmlToReact.parse(data)
	)	
}
 
export default Html