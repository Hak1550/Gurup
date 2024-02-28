import styled, { css } from "styled-components"
import {config} from "styles/variables"
const { $textColor, $accent } = config.colors
import DefaultContent from 'components/Content'
import DefaultButton from 'components/Button'

export const Img = styled.img`
    content: url(${require("assets/core/not-validated.png")});
`

export const Container = styled(DefaultContent)`
    &__body {
        display: flex;
        padding: 178px 0;
        flex-direction: column;
        align-items: center;
    }
`

export const Button = styled(DefaultButton)`
    margin-top: 28px;
`

export const Text = styled.p`
    max-width: 338px;
    text-align: center;
    color: ${$textColor};
`
