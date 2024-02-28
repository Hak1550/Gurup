import styled from "styled-components"
import { config } from "styles/variables"

export const ExerciseFinishContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
`

export const ExerciseFinishImage = styled.img`
	width: 89px;
	height: 89px;
	display: block;
	margin-bottom: 21px;
`

export const ExerciseFinishText = styled.p`
	font-size: 16px;
	font-weight: 500;
	color: ${config.colors.$textColor};
`

export const ExerciseResultCount = styled.h4`
	font-size: 16px;
	color: ${({ theme }) => theme.$accent};
`
