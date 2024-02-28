import React, { useState } from "react";
import { select } from "underscore";
import Styled from "./styles";

// LanguageFixNeeded Fixed
const Dropdown = ({ 
    name = "", 
    options = [
        { label: "Option 1", value: "option_1" }, 
        { label: "Option 2", value: "option_2" }
    ], 
    label, 
    onSelect,
    customStyles = {
        controlStyle: {},
        labelStyle: {},
        arrowStyle: {},
        dropdownTextStyle: {},
        dropdownTextHighlightStyle: {},
        dropdownStyle: {},
        separatorStyle: {},
    },
    adjustFrame,
}) => {
    const [ isOpen, setOpen ] = useState(false);

    const handleSelect = (index, selected_label) => {
        // console.log("handleSelect ",index,selected_label)
        // console.log("handleSelect options ",options);
        const {value} = options.find(({ label }) => label === selected_label);
        if (onSelect) {
            onSelect({name, value});
        }
    }

    const labels = options.map(({label}) => label);
    const { dropdownTextStyle, dropdownTextHighlightStyle, dropdownStyle, separatorStyle } = customStyles;
    return (
        <Styled.CustomDropdown
            dropdownStyles={{
                dropdownTextStyle, 
                dropdownTextHighlightStyle, 
                dropdownStyle, 
                separatorStyle
            }} 
            adjustFrame = {adjustFrame}
            options={labels}
            onSelect={handleSelect}
            onDropdownWillShow={() => setOpen(true)}
            onDropdownWillHide={() => setOpen(false)}
        >   
            <Styled.Control style={customStyles.controlStyle}>
                <Styled.Label style={customStyles.labelStyle}>{label}</Styled.Label>
                <Styled.Arrow style={customStyles.arrowStyle} isOpen={isOpen} />
            </Styled.Control>
        </Styled.CustomDropdown>
    )
}

export default Dropdown