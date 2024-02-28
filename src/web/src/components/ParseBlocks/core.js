import React, { Fragment } from "react"
import { Image, BlockContainer, Paragraph } from "./styles"

import RichText from "./Blocks/RichText"
import VideoBlock from "./Blocks/Video"
import Gallery from "./Blocks/Gallery"
import Questions from "./Blocks/Questions"
import Advantages from "./Blocks/Advantages"
import Quotes from "./Blocks/Quotes"
import Download from "./Blocks/Download"
import Button from "./Blocks/Button"
import Audio from "./Blocks/Audio"
import Html from "./Blocks/Html"

const ParseBlocks = ({ blocks }) => {
	return (
		<Fragment>
			{blocks &&
				blocks.map(block => {
					if (block && block.meta_data) {
					} else if (!block || !block.type || block.length || !block.data) {
						return null
					}
					switch (block.type.toLowerCase()) {
						case "text":
							return (
								<BlockContainer key={block._id}>
									<Paragraph>{block.data}</Paragraph>
								</BlockContainer>
							)
						case "download":
							return (
								<BlockContainer key={block._id}>
									<Download data={block.data}/>
								</BlockContainer>
							)
						case "richtext":
							return (
								<BlockContainer key={block._id}>
									<RichText data={block.meta_data} />
								</BlockContainer>
							)
						case "image":
							return (
								<BlockContainer key={block._id}>
									<Image src={block.data} />
								</BlockContainer>
							)
						case "video":
							return (
								<BlockContainer key={block._id}>
									<VideoBlock url={block.data} />
								</BlockContainer>
							);
						case "youtube":
							return (
								<BlockContainer key={block._id}>
									<VideoBlock
										url = {`https://www.youtube.com/watch?v=${block.data}`}
										customProp={{ youtube: { showinfo: 1, controls: 2, modestbranding: 1 } }}
									/>
								</BlockContainer>
							);
						case "gallery":
							return (
								<BlockContainer key={block._id}>
									<Gallery data={block.data} />
								</BlockContainer>
							);
						case "faq":
							return (
								<BlockContainer key={block._id}>
									<Questions key={block._id} data={block.data} />
								</BlockContainer>
							)
						case "advantages":
							return (
								<BlockContainer key={block._id}>
									<Advantages data={block.data}/>
								</BlockContainer>
							)
						case 'quotes':
							return (
								<BlockContainer key={block._id}>
									<Quotes data={block.data}/>
								</BlockContainer>
							)
						case 'button':
							return (
								<BlockContainer key={block._id}>
									<Button data={block.meta_data} />
								</BlockContainer>
							)
						case 'audio':
							return (
								<BlockContainer key={block._id}>
									<Audio data={block.data}/>
								</BlockContainer>
							)
						case 'html':
							return (
								<BlockContainer key={block._id}>
									<Html data={block.data} />
								</BlockContainer>
							)
					}
				})}
		</Fragment>
	)
}

export default ParseBlocks
