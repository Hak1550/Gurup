import React from 'react';

import Logic from '../logic';

import {
	Wrap,
Label,
Icon,
Text,
} from '../styles';

const DefaultInput = ({ text, value, onClick, className="", radio, style, ...rest }) => {
	return (
		<Wrap className={`${className} ${radio ? "radio" : ""}`} style={style} onClick={onClick}>
			<Label className={`${radio ? "radio" : ""}`}>
				{value && <Icon className='fas fa-check' />}
			</Label>
			{text && <Text className={`${radio ? "radio" : ""} ${value ? "active" : ""}`}>{text}</Text>}
		</Wrap>
	)
};

export default Logic(DefaultInput)
