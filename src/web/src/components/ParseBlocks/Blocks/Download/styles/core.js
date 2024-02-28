import styled, { css } from "styled-components"
import {config} from "styles/variables"
import DefaultButton from 'components/Button'

let {$textcolor} = config.colors

export const Wrap = styled.div`
    display: flex;
    align-items: center;
`

export const Button = styled(DefaultButton)`
    margin-right: 10px;
    flex-shrink: 0;
`

export const Label = styled.p`
    color: ${config.colors.$textColor};
    flex-shrink: 0;
`
