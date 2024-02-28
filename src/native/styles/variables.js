import EStyleSheet from "react-native-extended-stylesheet"
import { AppConfig } from "../config"
import colorPalette, {legacyTemplates, baseTemplates} from "../colorsPalette"
import {addDollarSignToColors} from "../utils";


export const config = new AppConfig()

let colors = {
	$accent: config.colors.$accent,
	$additionColor: config.colors.$additionColor,
	$additionTextColor: config.colors.$additionTextColor,
	$textColor: config.colors.$textColor,
	$darkBgTextColor: config.colors.$darkBgTextColor,
	$accentBgTextColor: config.colors.$darkBgTextColor,
	$itemBackground: config.colors.$itemBackground,
	$screenBackgroundColor: config.colors.$screenBackgroundColor,
	$successColor: config.colors.$successColor,
}

export default colors


export let paletteNumber = 1
export function setTheme(theme = {}){
	EStyleSheet.clearCache()
	EStyleSheet.build(theme.colors);
	// console.log("Set config value", )
	config.changeProperty([
		{ name: "theme", value: theme.theme },
	])
}

export function chooseTemplate({template= "black", colors: customColors}) {
	let colorsTemplate;
	if(legacyTemplates[template]){
		colorsTemplate = legacyTemplates[template]
	} else if (baseTemplates[template]) {
		colorsTemplate =  {
			...baseTemplates[template],
			colors: {
				...baseTemplates[template].colors,
				...(customColors && customColors.accent ? {
					accent: customColors.accent
				} : {}),
			}
		}
	} else if(template === "custom") {
		colorsTemplate =  {
			colors: {
				...baseTemplates.light.colors,
				...customColors
			}
		}
	} else {
		colorsTemplate = legacyTemplates.green;
	}

	//TODO: Remove dollar sign from styles instead of using addDollarSignToColors function
	colorsTemplate = addDollarSignToColors(colorsTemplate);
	EStyleSheet.clearCache()
	EStyleSheet.build(colorsTemplate.colors)
	config.changeProperty([
		{ name: "theme", value: colorsTemplate.theme || "light" },
	])
}

export const setGradients = paletteNumber => {
	if (config.appDomain) {
		return (gradients = {
			MainGradient: {
				colors: [config.colors.$mainGradientColorSecond, config.colors.$mainGradientColorOne],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
			HeaderGradient: {
				colors: [config.colors.$mainGradientColorSecond, config.colors.$mainGradientColorOne],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
			BlueButton: {
				colors: ["#ffffff", "#1b87fb"],
				start: { x: -1, y: 2 },
				end: { x: 1, y: 2 },
			},
			GurucanGradient: {
				colors: ["#ab6d30", "#FCB03A"],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
		})
	} else {
		return (gradients = {
			MainGradient: {
				colors: [
					colorPalette[paletteNumber].colors.$mainGradientColorSecond,
					colorPalette[paletteNumber].colors.$mainGradientColorOne,
				],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
			HeaderGradient: {
				colors: [
					colorPalette[paletteNumber].colors.$mainGradientColorSecond,
					colorPalette[paletteNumber].colors.$mainGradientColorOne,
				],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
			BlueButton: {
				colors: ["#ffffff", "#1b87fb"],
				start: { x: -1, y: 2 },
				end: { x: 1, y: 2 },
			},
			GurucanGradient: {
                colors: ["#ab6d30", "#FCB03A"],
				start: { x: 0.8, y: 1 },
				end: { x: 0, y: 0 },
			},
		})
	}
}
export let gradients = setGradients(paletteNumber)
