import styled from "styled-components/native"

export const AppInfo = styled.View`
`

export const Row = styled.View`
    flex-direction: row;
`

export const Label = styled.Text`
    margin-right: 6px;
    color: ${({theme}) => theme.$textColor}
`

export const Value = styled.Text`
    color: ${({theme}) => theme.$textColor}
`

