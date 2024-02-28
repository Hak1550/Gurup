import React from "react"
import Slider from "react-slick"
import {Image} from "../styles"

const Gallery = ({ data }) => {
	const settings = {
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
	}
	return (
		<Slider {...settings}>
			{data &&
				data.map(item => (
					<div key={item}>
						<Image img={item} />
					</div>
				))}
		</Slider>
	)
}

export default Gallery
