import { createGlobalStyle, css } from "styled-components"
import {config} from "./variables.js"

export default createGlobalStyle`
	body {
	    margin: 0;
	    padding: 0;
	    font-family: 'main-font', sans-serif;
	    font-weight: 400;
	}

	p, h1, h2, h3, h4, h5, h6 {
	    margin: 0;
	}

	input, button {
	    border: none;
	    outline: none;
	    background: none;
	    display: block;
	}

	ul {
	    list-style: none;
	}

	li {
	    list-style: none;
	}

	button {
	    cursor: pointer;
	}

	button:disabled {
	    opacity: 0.3;
	    cursor: default;
	}

	a {
	    text-decoration: none;
	    color: inherit;
	}

	// .shadow {
	//     box-shadow: $shadow;
	// }
	//
	// .shadow-inner {
	//     box-shadow: $shadow-inner;
	// }

	.disabled {
	    opacity: 0.3;
	    cursor: default;
	}

	.pointer {
	    cursor: pointer;
	}

	* {
	    margin: 0;
	    padding: 0;
	    box-sizing: border-box;
	}
	
	.CircularProgressbar {
	 width: 100%;
	 vertical-align: middle;
	}
	
	.CircularProgressbar .CircularProgressbar-path {
	  stroke: ${config.colors.$accent};
	  stroke-linecap: round;
	  transition: stroke-dashoffset 0.5s ease 0s;
	}

	.CircularProgressbar .CircularProgressbar-trail {
	  stroke: #d6d6d6;
	  stroke-linecap: round;
	}
	
	.CircularProgressbar .CircularProgressbar-text {
	  fill: ${config.colors.$textColor};
	  font-size: 20px;
	  dominant-baseline: middle;
	  text-anchor: middle;
	}
	
	.CircularProgressbar .CircularProgressbar-background {
	  fill: #d6d6d6;
	}
	
	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-background {
	  fill: ${config.colors.$accent};
	}
	
	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
	  fill: #fff;
	}
	
	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
	  stroke: #fff;
	}
	
	.CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
	  stroke: transparent;
	}

	${({ fonts }) => {
		let allFonts = []
		for (let font in fonts) {
			let fontWeight = 400
			let fontStyle = "normal"
			const fontName = font.split("-")
			switch (fontName[1]) {
				case "Thin":
					fontWeight = 100
					break
				case "ThinItalic":
					fontWeight = 100
					fontStyle = "italic"
					break
				case "Light":
					fontWeight = 300
					break
				case "LightItalic":
					fontWeight = 300
					fontStyle = "italic"
					break
				case "Regular":
					fontWeight = 400
					break
				case "Italic":
					fontWeight = 400
					fontStyle = "italic"
					break
				case "Medium":
					fontWeight = 500
					break
				case "MediumItalic":
					fontWeight = 500
					fontStyle = "italic"
					break
				case "Bold":
					fontWeight = 700
					break
				case "BoldItalic":
					fontWeight = 700
					fontStyle = "italic"
					break
				case "Black":
					fontWeight = 900
					break
				case "BlackItalic":
					fontWeight = 900
					fontStyle = "italic"
					break
				default:
					fontWeight = 400
					fontStyle = "normal"
					break
			}
			allFonts.push(css`
				@font-face {
					font-family: "main-font";
					src: url(${fonts[font]});
					font-weight: ${fontWeight};
					font-style: ${fontStyle};
				}
			`)
		}
		return [...allFonts]
	}}
`
