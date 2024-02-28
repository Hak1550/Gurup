import styled from "styled-components"
import { config } from "styles/variables"

export const Question = styled.p`
	font-size: 16px;
	color: ${config.colors.$textColor};
	margin: 39px 0;
`

export const AnswersContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	grid-gap: 20px;
	grid-auto-rows: 1fr;
`

export const AnswerButton = styled.button`
	background: ${({ active, theme }) => (active ? theme.$accent : "#FFFFFF")};
	box-shadow: 0 0 8px rgba(34, 34, 34, 0.2);
	padding: 19px;
	color: ${({ active, theme }) => (active ? "#FFFFFF" : theme.$textColor)};
	font-size: 14px;
	&:hover {
		background-color: ${({theme}) => theme.$accent};
		color: #ffffff;
	}
`
export const QuizResultCount = styled.h4`
	font-size: 16px;
	color: ${({theme}) => theme.$accent};
	margin: 8px 0 59px;
`

export const QuestionContainer = styled.div`
	margin-top: 7.5px;
`

export const Title = styled.h3`
	color: ${config.colors.$textColor};
	margin-bottom: 10px;
`
