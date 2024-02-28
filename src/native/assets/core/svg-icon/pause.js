import React from 'react'
// import {Svg} from 'expo';
import * as Svg from 'react-native-svg';

import variables from "../../../styles/variables";

const PauseIcon = ({ color = "#2B2055", ...rest}) => (
	<Svg width={14} height={18} viewBox="0 0 14 18" fill="none" {...rest}>
		<Path fill={color} d="M0 0h4v18H0zM10 0h4v18h-4z" />
	</Svg>
)

export default PauseIcon
