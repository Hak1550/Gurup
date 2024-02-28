import React from 'react'
// import Svg, { Path } from 'react-native-svg'
// import {Svg} from 'expo';
import * as Svg from 'react-native-svg';

import variables from "../../../styles/variables";

const PauseIcon = props => (
	<Svg width={14} height={18} viewBox="0 0 14 18" fill="none" {...props}>
		<Svg.Path fill="#2B2055" d="M0 0h4v18H0zM10 0h4v18h-4z" />
	</Svg>
)

export default PauseIcon
