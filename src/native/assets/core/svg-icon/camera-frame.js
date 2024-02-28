import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={250} height={250} viewBox="0 0 250 250" fill="none" {...props}>
      <Path
        fill-rule="evenodd" 
        clip-rule="evenodd"
        fill="#fff"
        d="M0 62.5V0H62.5V4H4V62.5H0ZM250 62.5V0H187.5V4H246V62.5H250ZM250 187.5H246V246H187.5V250H250V187.5ZM62.5 250V246H4V187.5H0V250H62.5Z"
      />
    </Svg>
  )
}

export default SvgComponent
