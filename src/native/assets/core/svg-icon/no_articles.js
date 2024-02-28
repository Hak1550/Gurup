import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
import {useTheme} from "styled-components";

function SvgComponent(props) {
        const theme = useTheme();
        return (
        <Svg width={223} height={218} viewBox="0 0 223 218" fill="none" {...props}>
            <Path
                d="M179.909 180.006c-39.623 40.369-147.54 11.039-161.923-44.077C3.586 80.877 77.223 8.02 131.165 22.75c53.958 14.665 88.303 116.87 48.744 157.256z"
                fill="#F2F2F2"
            />
            <Rect x={81.714} y={72} width={62} height={84} rx={5} fill="#fff" />
            <Rect
                x={112.714}
                y={82}
                width={23}
                height={20}
                rx={4}
                stroke="#838383"
                strokeWidth={2}
            />
            <Path
                d="M112.714 99l8.5-11 5.625 6.538 2.25-2.307L135.714 98"
                stroke="#838383"
                strokeWidth={2}
            />
            <Rect
                width={48}
                height={3}
                rx={1.5}
                transform="matrix(1 0 0 -1 88.714 130)"
                fill="#DBDBDB"
            />
            <Rect
                width={48}
                height={3}
                rx={1.5}
                transform="matrix(1 0 0 -1 88.714 139)"
                fill="#DBDBDB"
            />
            <Rect
                width={48}
                height={3}
                rx={1.5}
                transform="matrix(1 0 0 -1 88.714 121)"
                fill="#DBDBDB"
            />
            <Rect
                width={23}
                height={3}
                rx={1.5}
                transform="matrix(1 0 0 -1 88.714 112)"
                fill="#838383"
            />
            <Rect
                width={14}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 102.714 82)"
                fill="#DBDBDB"
            />
            <Rect
                width={14}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 102.714 91)"
                fill="#DBDBDB"
            />
            <Rect
                width={14}
                height={3}
                rx={1.5}
                transform="matrix(-1 0 0 1 102.714 100)"
                fill="#DBDBDB"
            />
        </Svg>
    )
}

export default SvgComponent
