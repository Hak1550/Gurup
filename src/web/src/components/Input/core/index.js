import React from 'react';

import Logic from '../logic';

import {
	Label, Input, InputWrap, Cancel, ErrorText, Border,
} from '../styles';

const DefaultInput = ({label, value, className, errorText, placeholder='', withError, cancel, t, ...rest }) => {
	return (
		<InputWrap className={`${className}-wrap`} withError={withError}>
			{label && <Label>{label}</Label>}
			<Border>
				<Input value={value} className={`${className}`} placeholder={placeholder} {...rest} />
				{cancel && <Cancel onClick={cancel}>{t("cancel")}</Cancel>}
			</Border>
			{errorText && <ErrorText>{errorText}</ErrorText>}
		</InputWrap>
	)
};

const InputAdapter = Logic(({input, meta, ...rest}) => (
	<DefaultInput
		{...rest}
		{...input}
		onChange={(e) => {
			input.onChange(e.target.value)
		}}
		errorText={meta.touched ? meta.error : ''}
	/>
));

export {
	InputAdapter,
}
export default Logic(DefaultInput)
