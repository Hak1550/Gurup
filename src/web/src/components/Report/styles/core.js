import styled, { css } from "styled-components"
import {config} from "styles/variables"
import DefaultButton from 'components/Button';
const { $textColor, $accent } = config.colors

export const Report = styled.div`
    max-width: 640px;
    width: 100%;
    margin-top: 20px;
`

export const Button = styled(DefaultButton)`

`

export const AprovedIcon = styled.i`
    font-size: 18px;
    color: #36E49B;
    margin-left: 7px;
`

export const Title = styled.div`

`

export const Border = styled.div`
    border: 1px solid #F2F2F2;
`

export const Wrap = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    justify-content: space-between;
`

export const Icon = styled.i`
    margin-left: 18px;
    color: ${$accent};
    font-size: 16px;
`
