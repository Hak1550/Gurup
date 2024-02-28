import styled, {css} from 'styled-components/native'
import FontAwesome from "react-native-vector-icons/FontAwesome"

export const PlayerContainer = styled.View`
	flex-direction: row;
	align-items: center;
`

export const PlayerControlButton = styled.TouchableOpacity`
	background-color: ${props => (props.active ? props.theme.$accent : '#E2E2E2')};
	width: 35px;
	height: 35px;
	border-radius: 17px;
	justify-content: center;
	align-items: center;
	margin-right: 11px;
`

export const PlayerControlButtonIcon = styled(FontAwesome)`
	color: ${props => props.theme.$screenBackgroundColor};
	font-size: 18px;
	${props => !props.active && css`
		margin-left: 4px;
	`}
`

//TouchableWithoutFeedback
export const PlayerDurationContainer = styled.TouchableOpacity`
	background-color: #e2e2e2;
	height: 6px;
	flex: 1;
	overflow: hidden;
	border-radius: 3px;
	margin-right: 9px;
	width: 100%;
`

export const PlayerDuration = styled.View`
	width: ${props => props.value}%;
	height: 6px;
	background-color: ${props => props.theme.$accent};
`

export const RateButton = styled.TouchableOpacity`
	/* padding: 5px 12px; */
	background-color: ${props => props.theme.$additionalTextColor};
	border-radius: 14px;
	margin: 0 4px;
	width: 34px;
	height: 22px;
	justify-content: center;
	align-items: center;
`

export const RateButtonText = styled.Text`
	font-size: 10px;
	font-family: 'Main-Medium';
	color: ${props => props.theme.$textColor};
`
