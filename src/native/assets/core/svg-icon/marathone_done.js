import * as React from "react"
import Svg, {
    Path,
    Mask,
    G,
    Ellipse,
    Circle,
    Defs,
    LinearGradient,
    Stop,
} from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg width={246} height={234} viewBox="0 0 246 234" fill="none" {...props}>
            <Path
                d="M205.251 114.614c.486 52.098-88.902 103.281-134.166 76.752-45.233-26.476-44.724-121.887 0-147.425 44.694-25.592 133.627 18.605 134.166 70.673z"
                fill="#D7D7D7"
            />
            <Mask
                id="prefix__a"
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={228}
                height={225}
            >
                <Path
                    d="M205.251 114.613c.486 52.098-88.902 103.281-134.166 76.752-45.233-26.476-44.725-121.886 0-147.424 44.694-25.591 133.627 18.605 134.166 70.672z"
                    fill="#F2F2F2"
                />
            </Mask>
            <G mask="url(#prefix__a)">
                <Path
                    d="M57.171 43.355c-25.785-13.448-42.03 30.301-45.158 48.678L-2.65 169.447c4.887 21.505 15.365 65.099 18.18 67.445 3.52 2.933 126.68 23.459 135.477 21.114 7.038-1.877 65.881-34.407 94.423-50.438l-22.873-48.677-31.669-22.286C144.909 104.7 157.499 66 157.499 66s-3.553 1.595-53.5 23c-38.5 16.5-24.5-34-46.828-45.645z"
                    fill="#F2F2F2"
                />
                <Path
                    d="M1.668 101.765c98.787 25.793 153.408 64.961 168.37 81.321 6.816 31.001 11.856 82.21-22.508 39.044C104.574 168.172-121.816 69.525 1.668 101.765z"
                    fill="#D8D8D8"
                />
                <Path
                    d="M115.233 144.815l-41.64 21.7 12.316 7.624 41.64-22.286-12.316-7.038z"
                    fill="#fff"
                />
            </G>
            <Path
                d="M45.17 47.724l13.963 37.273-39.261-6.543 25.297-30.73z"
                fill="#8F8F8F"
            />
            <Path
                d="M128.786 221.673V181.87l34.47 19.902-34.47 19.901z"
                fill="#B2B2B2"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M198.022 76.062c1.741.552 3.288 1.043 4.622 1.391l-1.776 6.81c-1.849-.482-3.721-1.077-5.68-1.699-4.894-1.553-10.323-3.277-17.245-3.843-9.382-.767-21.267.726-36.424 8.794l-3.307-6.212c16.295-8.674 29.521-10.478 40.305-9.596 7.787.637 14.458 2.753 19.505 4.355z"
                fill="#EAEAEA"
            />
            <Path
                d="M129.656 59.24c-1.919-1.645-.884-4.326-.656-5.24l-4.5-1.5c-.548 1.645-2.153 2.971-3.066 2.971l2.055 6.852 6.167-3.083z"
                fill="#EDEDED"
            />
            <Path
                d="M123.07 44.575s2.385 2.944 2.93 6.925c-37.5 29-66.5-7.95-54.5-18S54 18.5 84 13s46.5 8.5 52.5 15.5 2.521 21.59-2.607 22.35c1.947-3.737.841-7.3.841-7.3l-11.664 1.025z"
                fill="#BDBDBD"
            />
            <Ellipse
                cx={129.953}
                cy={45.531}
                rx={7.195}
                ry={9.44}
                transform="rotate(18.006 129.953 45.531)"
                fill="#fff"
            />
            <Path
                d="M138.5 44.5S141 42 135 35c-10.148-5.152-13.477 4.534-13.5 8-.023 3.467-5 4-5 4s5 0 10-4c7 2.5 12 1.5 12 1.5z"
                fill="url(#prefix__paint0_linear)"
            />
            <Path
                d="M105.366 90.62c7.037-17.594 9.225-28.471 4.481-35.253-5.215-8.748-15.857-19.102-20.962-23.193l3.769-2.398 28.779 25.591 2.055 6.956 6.167-3.083c4.486.554 28.779-4.959 43.853-6.51v4.796c-41.164 6.116-44.683 10.221-57.586 44.824l-10.556-11.73z"
                fill="#8F8F8F"
            />
            <Path
                d="M72.53 95.637c1.47.863 7.031 9.057 7.031 9.057l-4.692 3.52c-1.37-1.371-2.97-5.41-9.36-4.346-6.39 1.063-10.01-1.368-9.375-2.643.635-1.274 14.927-6.45 16.397-5.588z"
                fill="#717171"
            />
            <Path
                d="M139.381 169c-2.618 0-5.865-11.522-5.865-11.522l5.865-2.346c.599 1.984 3.414 6.028 9.717 4.531 6.302-1.498 7.349.548 7.901 1.837 0 0-15 7.5-17.618 7.5z"
                fill="#7D7D7D"
            />
            <Path
                d="M95.267 121.61c1.183-3.157 8.917-26.295 10.099-28.645L115.954 102c-1.774 10.43-18.617 34.833-21.278 31.45 0 0-19.807-24.392-19.807-25.237 0 0 2.933-2.932 4.73-3.519 3.784 2.481 12.318 13.721 15.668 16.916z"
                fill="#B2B2B2"
            />
            <Path
                d="M101.085 108.061c-6.499-7.442.219-14.729 4.281-17.442 13.489 13.49 25.312 29.941 25.602 40.697.232 8.604 4.738 18.099 8.413 23.816l-5.864 2.346c-.194-.388-.518-1.744-3.42-6.395-5.19-8.32-7.349-17.829-7.833-21.511-4.352-4.07-14.68-14.07-21.179-21.511z"
                fill="#194ED5"
            />
            <Path
                d="M101.085 108.061c-6.499-7.442.219-14.729 4.281-17.442 13.489 13.49 25.312 29.941 25.602 40.697.232 8.604 4.738 18.099 8.413 23.816l-5.864 2.346c-.194-.388-.518-1.744-3.42-6.395-5.19-8.32-7.349-17.829-7.833-21.511-4.352-4.07-14.68-14.07-21.179-21.511z"
                fill="#BDBDBD"
            />
            <Path
                d="M176.369 51.293c.309-.572.849-1.98.536-3.037-.626-2.114-1.651 2.282-4.074 5.4.461 4.466.677 3.87.677 3.87.858.151 9.982-.593 10.089-1.2.059-.333-.895-.472-1.838-.519 1.459-.006 3.198-.11 3.264-.483.078-.445-2.331-.663-3.849-.732 1.736.05 4.617-.083 4.775-.983.116-.654-1.749-.75-3.629-.667.89-.16 1.703-.43 2.027-.868.656-.887-5.045-.89-7.978-.781z"
                fill="#D8D8D8"
            />
            <Path
                d="M91.62 25.79c.131-.636.623-2.061 1.542-2.67 1.838-1.217-.202 2.81-.35 6.755-3.224 3.124-4.076 2.428-4.174 2.064-.224-.842-6.098-6.406-5.79-6.94.17-.293.99.214 1.741.785-1.113-.943-2.378-2.14-2.189-2.468.226-.392 2.212.99 3.419 1.913-1.362-1.077-3.483-3.031-3.026-3.823.332-.575 1.822.55 3.209 1.823-.58-.695-1.028-1.425-.995-1.969.067-1.1 4.437 2.562 6.613 4.53z"
                fill="#F7F7F7"
            />
            <Circle cx={218} cy={120} r={28} fill="#838383" />
            <Path
                d="M214.176 129.581c.211.314.527.419.949.419.369 0 .686-.105.949-.419l15.557-15.393c.211-.209.369-.523.369-.942 0-.366-.158-.681-.369-.942l-1.951-1.885c-.264-.262-.58-.419-.95-.419-.369 0-.685.157-.949.419l-12.656 12.565-5.906-5.864c-.317-.261-.633-.418-1.002-.418s-.686.157-.897.418l-1.951 1.885c-.264.262-.369.576-.369.943 0 .418.105.733.369.942l8.807 8.691z"
                fill="#fff"
            />
            <Circle cx={40.242} cy={170.113} r={18.846} fill="#868686" />
            <Path
                d="M40.069 159.847c1.814 0 3.546.495 5.113 1.402a10.016 10.016 0 013.711 3.712c.907 1.567 1.402 3.298 1.402 5.113 0 1.856-.495 3.546-1.402 5.113-.907 1.567-2.144 2.846-3.711 3.753a10.104 10.104 0 01-5.114 1.361c-1.855 0-3.546-.454-5.113-1.361a10.236 10.236 0 01-3.752-3.753c-.908-1.567-1.361-3.257-1.361-5.113 0-1.815.453-3.546 1.36-5.113.908-1.567 2.186-2.805 3.753-3.712 1.567-.907 3.258-1.402 5.114-1.402zm2.35 14.433c.083.083.206.124.371.083.124 0 .248-.083.33-.207l1.155-1.567c.082-.082.082-.206.082-.371 0-.124-.082-.247-.165-.33l-2.639-1.897v-5.69c0-.124-.082-.248-.165-.33-.082-.083-.206-.165-.33-.165h-1.98a.52.52 0 00-.37.165.467.467 0 00-.124.33v6.928c0 .164.041.329.206.412l3.629 2.639z"
                fill="#fff"
            />
            <Circle cx={189.846} cy={25.846} r={18.846} fill="#D7D7D7" />
            <Path
                d="M198.088 19.316c.193 0 .385.097.545.225.129.16.225.353.225.545v1.796c0 .577-.193 1.155-.513 1.7a5.148 5.148 0 01-1.476 1.54 7.157 7.157 0 01-3.528 1.315c-.32.513-.641.994-1.026 1.379a5.592 5.592 0 01-.802.737l-.353.257v2.31h1.54c.577 0 1.058.16 1.443.48.385.321.61.77.61 1.315v.385a.408.408 0 01-.129.289.363.363 0 01-.256.096h-9.494c-.128 0-.224-.032-.289-.096-.064-.064-.096-.16-.096-.289v-.385c0-.545.193-.994.577-1.315.385-.32.898-.48 1.476-.48h1.539v-2.31l-.352-.257c-.289-.192-.546-.449-.802-.737a6.444 6.444 0 01-1.027-1.38 7.047 7.047 0 01-3.528-1.314c-.641-.45-1.154-.963-1.475-1.54a3.09 3.09 0 01-.513-1.7v-1.796c0-.192.064-.385.224-.545a.776.776 0 01.546-.225h3.335v-1.283c0-.192.064-.385.225-.545a.772.772 0 01.545-.224h8.724c.192 0 .385.096.545.224.128.16.225.353.225.545v1.283h3.335zm-14.529 4.138c.385.288.834.513 1.347.673-.256-.866-.385-1.796-.417-2.758h-2.053v.513c0 .225.097.481.289.738.193.288.449.577.834.834zm13.246-1.572v-.513h-2.052c-.065.962-.193 1.892-.417 2.758.481-.16.93-.385 1.347-.673a4.37 4.37 0 00.769-.77c.225-.289.353-.545.353-.802z"
                fill="#fff"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M50.412 133.11c-13.22 1.316-25.785.238-33.412-1.186l1.291-6.919c7.035 1.314 18.927 2.346 31.424 1.102 12.552-1.25 25.249-4.752 34.335-12.107l4.428 5.47c-10.62 8.597-24.902 12.329-38.066 13.64z"
                fill="#fff"
            />
            <Defs>
                <LinearGradient
                    id="prefix__paint0_linear"
                    x1={127.758}
                    y1={33.521}
                    x2={127.758}
                    y2={47.001}
                    gradientUnits="userSpaceOnUse"
                >
                    <Stop stopColor="#BDBDBD" />
                    <Stop offset={1} stopColor="#D5D5D5" />
                </LinearGradient>
            </Defs>
        </Svg>
    )
}

export default SvgComponent