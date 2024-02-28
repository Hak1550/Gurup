import styled, {css} from 'styled-components/native'
import FontAwesome from "react-native-vector-icons/FontAwesome"

export const ItemSummaryWrap = styled.View`
	flex-direction: row;
`

export const ItemSummaryBlock = styled.View`
    flex-direction: row;
    align-items: center;
    ${({ autoAlign }) => autoAlign ? css`
        justify-content: center;
        flex: 1;
    `: css`
        margin-right: 10px
    `}
    ${({ alignment }) => {
        switch (alignment){
            case "left":
                return css`
                    margin-right: auto;
		            justify-content: flex-start;
                `
            case "right":
                return css`
                    margin-left: auto;
		            justify-content: flex-end;
                `
        }
    }}
`

export const ItemSummaryText = styled.Text`
    color: ${({theme}) => theme.$darkBgTextColor};
    opacity: 0.8;
    font-size: 14px;
`

export const ItemSummaryIcon = styled(FontAwesome)`
    color: ${({ theme }) => theme.$darkBgTextColor};
    opacity: 0.8;
    font-size: 14px;
    margin-right: 5px;
`
