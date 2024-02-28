import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
import {useTheme} from "styled-components";

function SvgComponent(props) {
    const theme = useTheme();
    return (
        <Svg width={176} height={181} viewBox="0 0 176 181" fill="none" {...props}>
            <Path
                d="M119.59 179.118C65.313 194.221-13.16 115.105 1.88 60.351 16.876 5.644 116.668-20.552 155.857 19.052c39.237 39.558 17.965 144.917-36.266 160.066z"
                fill="#F2F2F2"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M125.986 121.489l7.977 4.511.03-9.254c.005-.085.007-.171.007-.257V95a5 5 0 00-5-5H87a5 5 0 00-5 5v21.489a5 5 0 005 5h38.986z"
                fill="#fff"
            />
            <Rect
                x={106}
                y={114}
                width={17}
                height={3}
                rx={1.5}
                transform="rotate(-180 106 114)"
                fill="#F2F2F2"
            />
            <Rect
                x={126}
                y={107}
                width={37}
                height={3}
                rx={1.5}
                transform="rotate(-180 126 107)"
                fill="#838383"
            />
            <Rect
                x={126}
                y={100}
                width={37}
                height={3}
                rx={1.5}
                transform="rotate(-180 126 100)"
                fill="#838383"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M67.014 45.512L59.037 41l-.03 9.253a5.105 5.105 0 00-.007.258V72a5 5 0 005 5h42a5 5 0 005-5V50.512a5 5 0 00-5-5H67.014z"
                fill="#fff"
            />
            <Rect
                width={36.627}
                height={2.931}
                rx={1.465}
                transform="matrix(-1 0 0 1 103.969 52.549)"
                fill="#838383"
            />
            <Rect
                width={31.677}
                height={2.931}
                rx={1.465}
                transform="matrix(-1 0 0 1 99.019 59.387)"
                fill="#838383"
            />
            <Rect
                width={30.687}
                height={2.931}
                rx={1.465}
                transform="matrix(-1 0 0 1 98.03 66.225)"
                fill="#F2F2F2"
            />
        </Svg>
    )
}

export default SvgComponent
