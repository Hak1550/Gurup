import React from 'react'
// import Svg, { Path } from 'react-native-svg'
// import {Svg} from 'expo';
import * as Svg from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: title */

const SvgComponent = props => (
  <Svg width={18} height={18} {...props}>
    <Svg.Path
      d="M15.818 2.182H11.03v-2h6.788V6.97h-2V2.182zm0 8.182v4.788H11.03v2h6.788v-6.788h-2zm-8.182 4.788v2H.848v-6.788h2v4.788h4.788zM2.848 6.97V2.182h4.788v-2H.848V6.97h2z"
      fill="#FFF"
      fillRule="evenodd"
    />
  </Svg>
)

export default SvgComponent
