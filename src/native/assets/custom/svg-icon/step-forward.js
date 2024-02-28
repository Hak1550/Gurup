import React from 'react'
// import Svg, { Path } from 'react-native-svg'
// import {Svg} from 'expo';
import * as Svg from 'react-native-svg';

import variables from "../../../styles/variables";

const StepForwardIcon = props => (
	<Svg width={23} height={20} fill="none" {...props}>
		<Svg.Path fill={'#000'}  d="M20 1h3v18h-3zM19 10L4.75 18.66V1.34L19 10z" />
	</Svg>
)

export default StepForwardIcon
