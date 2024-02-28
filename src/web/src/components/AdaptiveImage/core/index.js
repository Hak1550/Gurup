import React from 'react';

import Logic from '../logic';

import { Wrapper, Inner } from '../styles';

const AdaptiveImage = (({ src, ratio='56.25', className, children }) => {
	let resizeMode;

	if(!src) {
		src = require('assets/core/image-placeholder.png')
		resizeMode = 'contain'
	}

	return (
		<Wrapper className={className} ratio={ratio}>
			<Inner resizeMode={resizeMode} src={src}>
				{children ? children : null}
			</Inner>
		</Wrapper>
	)
})

export default Logic(AdaptiveImage)
