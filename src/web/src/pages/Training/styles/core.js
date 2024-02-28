import styled from "styled-components"
import { config } from "styles/variables"
import { lighten } from "polished"
import AnimatedIcon from "components/AnimatedIcon";
export const Title = styled.h3`
	color: #3d3737;
	text-align: center;
	display: inline-block;
	font-size: 20px;
	font-weight: 500;
`

export const ExerciseCount = styled.span`
	font-size: 14px;
	color: ${config.colors.$textColor};
	font-weight: 500;
`

export const VideoWrapper = styled.div`
	position: relative;
	margin-top: 21px;
`

export const PlayButton = styled.button`
	padding: 23px 23px 23px 28px;
	background-color: #fff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 5rem;
`

export const PlayButtonIcon = styled.i`
	font-size: 32px;
	color: ${({ theme }) => theme.$accent};
`

export const VideoControls = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 16px 0 27px;
`

export const TrainingDescription = styled.p`
	color: ${config.colors.$textColor};
	font-size: 14px;
	text-align: center;
`;

export const CompleteCheckMark = styled(AnimatedIcon)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 400px;
    cursor: pointer;
`;

export const NextTrainingName = styled.p`
	text-align: center;
	color: ${config.colors.$contentPale};
	margin-top: 60px;
	font-weight: 600;
`

export const TimerText = styled.span`
	font-size: 30px;
	color: ${config.colors.$textColor};
`

export const RepeatContainer = styled.p`
	margin: 22px 0 30px;
	text-align: center;
`

export const RepeatQuantity = styled.span`
	font-size: 64px;
	margin-right: 5px;
	color: #3d3737;
`

export const RepeatMeasur = styled.span`
	font-size: 36px;
	color: ${config.colors.$contentPale};
	margin-right: 7px;
`

export const RepeatInstruction = styled.p`
	font-size: 16px;
	color: ${config.colors.$contentPale};
	text-align: center;
`
