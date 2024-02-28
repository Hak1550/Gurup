import React from "react"
import Styled from "./styles"

const ItemSummary = ({ summary = [], blockStyle={}, textStyle={}, autoAlign = true, ...props}) => {
    return (
        <Styled.ItemSummaryWrap {...props}>
            {summary.map((item, key) => {
                const options = {
                    style: blockStyle,
                    autoAlign
                }
                if (key === 0 && autoAlign) {
                    options.alignment = "left";
                }
                if (summary.length === key + 1 && autoAlign) {
                    options.alignment = "right";
                }
                return (
                    <Styled.ItemSummaryBlock {...options} key={key}>
                        {item.icon && <Styled.ItemSummaryIcon style={textStyle} name={item.icon} />}
                        <Styled.ItemSummaryText style={textStyle}>{item.text}</Styled.ItemSummaryText>
                    </Styled.ItemSummaryBlock>
                )
            })}
        </Styled.ItemSummaryWrap>
    )
}

export default ItemSummary