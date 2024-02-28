import styled, { css } from "styled-components"
import React from "react"

export const Container = styled.div`
	max-width: 1157px;
	width: 100%;
	&.big {
        max-width: 1400px;
        margin: auto;
    }
    @media (max-width: 480px) {
        margin: auto;
    }
`

