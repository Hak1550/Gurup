import React, { Fragment } from "react"
import {Image, AdvantagesContainer, Text} from "../styles"

const Advantages = ({ data }) => {
	return (
		<AdvantagesContainer>
			{data && data.map(advantage => {
				return (
					<div key={advantage.photo}>
						<Image img={advantage.photo}/>
						<Text>{advantage.text}</Text>
					</div>
				)
			})}
		</AdvantagesContainer>
	)
}

export default Advantages
