import React from "react"
import { convertFromRaw } from "draft-js"
import { Parser } from "html-to-react"
import { Container } from "../styles"
import {stateToHTML} from 'draft-js-export-html';

const htmlToReact = new Parser();

const RichText = ({ data }) => {
	const text = convertFromRaw({ entityMap: {}, ...data });
	let html = htmlToReact.parse(stateToHTML(text));
	return <Container>{html}</Container>
}

export default RichText
