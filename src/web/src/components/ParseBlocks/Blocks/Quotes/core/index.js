import React, { Fragment } from "react"
import {
	QuoteBody,
	Text,
	Author,
	AuthorPhoto,
	QuoteContainer,
	QuoteFooter,
	ButtonPrev,
	ButtonNext,
	Icon,
} from "../styles"
import RichText from "components/ParseBlocks/Blocks/RichText"
import Logic from "../logic"

function Quotes({ data, state, buttonClick }) {
	const dataLength = data.length;
	return (
		<Fragment>
			{data.map((quote, index) => {
				if (state.quoteIndex === index) {
					return (
						<QuoteContainer key={quote.photo}>
							{state.quoteIndex > 0 && (
								<ButtonPrev onClick={() => buttonClick("prev")}>
									<Icon className='fas fa-chevron-left' />
								</ButtonPrev>
							)}
							<QuoteBody>
								<Text>
									<RichText data={{ blocks: quote.text.blocks, entityMap: {} }} />
								</Text>
							</QuoteBody>
							{dataLength > (state.quoteIndex + 1) && (
								<ButtonNext onClick={() => buttonClick("next")}>
									<Icon className='fas fa-chevron-right' />
								</ButtonNext>
							)}
							<QuoteFooter>
								<Author>{quote.author}</Author>
								<AuthorPhoto photo={quote.photo} />
							</QuoteFooter>
						</QuoteContainer>
					)
				}
			})}
		</Fragment>
	)
}

export default Logic(Quotes)
