import React from "react"
import { ToggleWrap} from "./styles"
import Logic from "./logic"
import SwitchSelector from "react-native-switch-selector";
import { useTheme } from "styled-components";

const Toggle = ({ options = [], activeSection, toggleSection, style = {}}) => {
    const theme = useTheme();
    return (
        <ToggleWrap style={style}>
            <SwitchSelector
                initial={0}
                onPress={toggleSection}
                textColor={theme.$textColor}
                selectedColor={theme.$accentBgTextColor}
                buttonColor={theme.$accent}
                borderColor={theme.$itemBackground}
                hasPadding
                borderWidth={2}
                valuePadding={2}
                options={options}
                backgroundColor = {theme.$screenBackgroundColor}
            />
        </ToggleWrap>
    )
}

export default Logic(Toggle)