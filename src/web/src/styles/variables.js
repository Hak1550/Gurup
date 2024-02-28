import AppConfig from '../config'
// import colorPalette from '../colorsPalette'

export const config = new AppConfig();

let colors = {
    $accent: config.colors.$accent,
    $contentPale: config.colors.$contentPale,
    $additionLight: config.colors.$additionLight,
    $mainGradientColorOne: config.colors.$mainGradientColorOne,
    $mainGradientColorSecond: config.colors.$mainGradientColorSecond,
    $additionColor: config.colors.$additionColor,
    $mainContent: config.colors.$mainContent,
    $textColor: config.colors.$textColor,
    $shadowColor: config.colors.$shadowColor,
    $greyColor: config.colors.$greyColor,
    $itemBackground: config.colors.$itemBackground,
    $screenBackgroundColor: config.colors.$screenBackgroundColor,
    $successColor: config.colors.$successColor,
    $headerColor: config.colors.$headerColor,
    $lessonItemActiveColor: config.colors.$lessonItemActiveColor,
    $marathonHeaderColor: config.colors.$marathonHeaderColor,
    // $buttonColor: config.colors.$buttonColor,
    $headerTextColor: config.colors.$headerTextColor
};

// export let paletteNumber = 1
// export function chooseTemplate(template = "black") {
//     if(config.appDomain) {
//         EStyleSheet.build(colors)
//     } else {
//         if (template === "black") {
//             EStyleSheet.build(colorPalette[2].colors)
//             config.changeProperty([
//                 {name: 'headerBackgroundStyle', value: colorPalette[2].headerBackgroundStyle},
//                 {name: 'lessonItemBackgroundStyle', value: colorPalette[2].lessonItemBackgroundStyle},
//             ])
//             paletteNumber = 2
//         } else if (template === "green") {
//             EStyleSheet.build(colorPalette[1].colors)
//             config.changeProperty([
//                 {name: 'headerBackgroundStyle', value: colorPalette[1].headerBackgroundStyle},
//                 {name: 'lessonItemBackgroundStyle', value: colorPalette[1].lessonItemBackgroundStyle},
//             ])
//             paletteNumber = 1
//         } else if (template === "red") {
//             EStyleSheet.build(colorPalette[0].colors)
//             config.changeProperty([
//                 {name: 'headerBackgroundStyle', value: colorPalette[0].headerBackgroundStyle},
//                 {name: 'lessonItemBackgroundStyle', value: colorPalette[0].lessonItemBackgroundStyle},
//             ])
//             paletteNumber = 0
//         }
//         setGradients(paletteNumber)
//     }
// }

// export default colors
// export const setGradients = (paletteNumber) => {
//     if(config.appDomain) {
//         return gradients = {
//             MainGradient: {
//                 colors: [config.colors.$mainGradientColorSecond, config.colors.$mainGradientColorOne],
//                 start: { x: 0.8, y: 1 },
//                 end: { x: 0, y: 0 }
//             },
//             HeaderGradient: {
//                 colors: [config.colors.$mainGradientColorSecond, config.colors.$mainGradientColorOne],
//                 start: { x: 0.8, y: 1 },
//                 end: { x: 0, y: 0 }
//             },
//             BlueButton: {
//                 colors: ["#ffffff", "#1b87fb"],
//                 start: { x: -1, y: 2 },
//                 end: { x: 1, y: 2 }
//             }
//         }
//     } else {
//         return gradients = {
//             MainGradient: {
//                 colors: [colorPalette[paletteNumber].colors.$mainGradientColorSecond, colorPalette[paletteNumber].colors.$mainGradientColorOne],
//                 start: { x: 0.8, y: 1 },
//                 end: { x: 0, y: 0 }
//             },
//             HeaderGradient: {
//                 colors: [colorPalette[paletteNumber].colors.$mainGradientColorSecond, colorPalette[paletteNumber].colors.$mainGradientColorOne],
//                 start: { x: 0.8, y: 1 },
//                 end: { x: 0, y: 0 }
//             },
//             BlueButton: {
//                 colors: ["#ffffff", "#1b87fb"],
//                 start: { x: -1, y: 2 },
//                 end: { x: 1, y: 2 }
//             }
//         }
//     }
// }
// export let gradients = setGradients(paletteNumber)
