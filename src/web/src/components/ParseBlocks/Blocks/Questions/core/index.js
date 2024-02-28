import React, { Fragment } from "react"
import {Question, BodyContainer, BodyContent, HeadContainer, HeaderTitle} from '../styles'

class Questions extends React.Component {
	state = {
		activeQuestion: 0
	}
	_head = (text, index) => (
		<HeadContainer onClick={() => this.toggleAnswer(index)}>
			<HeaderTitle>{text}</HeaderTitle>
		</HeadContainer>
	)

	_body = answer => (
		<BodyContainer>
			<BodyContent>{answer}</BodyContent>
		</BodyContainer>
	)

	toggleAnswer = (index) => {
		this.setState((prevState) => {
			if (prevState.activeQuestion !== index) {
				return { activeQuestion: index };
			}
			return { activeQuestion: null };
		});
	}

	render() {
		const {data} = this.props
		return (
			<Fragment>
				{ data && data.map((q, index) => {
					const isActive = this.state.activeQuestion === index
					return (
						<Question key={index}>
							{this._head(q.question, index)}
							{isActive ? this._body(q.answer) : null}
						</Question>
					)
				}) }
			</Fragment>
		)
	}
}

export default Questions