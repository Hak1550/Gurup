import React from 'react'
import Svg, { Path } from 'react-native-svg'
// import {Svg} from 'expo';
import variables from "../../../styles/variables";

const StepForwardIcon = ({color = "#000",...rest}) => (
	<Svg width={23} height={20} fill="none" {...rest}>
		<Path fill={color}  d="M20 1h3v18h-3zM19 10L4.75 18.66V1.34L19 10z" />
	</Svg>
)

export default StepForwardIcon
