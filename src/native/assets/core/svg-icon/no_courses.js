import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
import {useTheme} from "styled-components";

const NoCourses = (props) => {
    const theme = useTheme();
    return (
        <Svg width={183} height={179} viewBox="0 0 183 179" fill="none" {...props}>
            <Path
                d="M175.681 139.282c-27.824 49.249-139.656 48.849-167.813-.666C-20.29 89.167 31.98-.266 87.898.001c55.915.2 115.542 90.033 87.783 139.281z"
                fill={theme.$itemBackground}
            />
            <Rect x={60} y={48.286} width={62} height={84} rx={5} fill={theme.$screenBackgroundColor} />
            <Rect
                width={32}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 107 92.286)"
                fill={theme.$textColor}
            />
            <Rect
                width={27.2}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 104.333 101.286)"
                fill={theme.$textColor}
            />
            <Rect
                width={21.333}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 101.667 110.286)"
                fill={theme.$additionalColor}
            />
            <Rect
                x={80}
                y={59.286}
                width={23}
                height={20}
                rx={4}
                stroke={theme.$textColor}
                strokeWidth={2}
            />
            <Path
                d="M80 76.286l8.5-11 5.625 6.538 2.25-2.308 6.625 5.77"
                stroke={theme.$textColor}
                strokeWidth={2}
            />
        </Svg>
    )
}

export default NoCourses
