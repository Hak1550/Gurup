import * as React from "react"
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg"

function SvgComponent({ color = "#0B0B0B", offset = 0.495, stopOpacity = 0.58, ...rest}) {
    return (
            <Svg 
                // width={375} 
                height={86} 
                viewBox="0 0 375 86" 
                fill="none"
                preserveAspectRatio="none"  
                {...rest}
            >
                <Path fill="url(#prefix__paint0_linear)" d="M0 0h375v86H0z" />
                <Defs>
                    <LinearGradient
                        id="prefix__paint0_linear"
                        x1={187.5}
                        y1={0}
                        x2={187.5}
                        y2={86}
                        gradientUnits="userSpaceOnUse"
                    >
                        <Stop stopOpacity={0} />
                        <Stop offset={offset} stopColor={color} stopOpacity={stopOpacity} />
                        <Stop offset={1} stopColor={color} />
                    </LinearGradient>
                </Defs>
            </Svg>
    )
}

export default SvgComponent
