import { setCustomText, setCustomView, setCustomTextInput } from 'react-native-global-props';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors, {config} from './variables';

export default () => {
    const customComponentsProps = {
        View: {
            style: {
                backgroundColor: 'transparent'
            }
        },
        Text: {
            maxFontSizeMultiplier: 0,
            allowFontScaling: false,
            style: {
                fontSize: 14,
                fontFamily: 'Main-Regular',
                // color: '#333'
            }
        },
		TextInput: {
			style: {
				fontFamily: 'Main-Regular',
			}
		}
    };
    setCustomText(customComponentsProps.Text);
	setCustomTextInput(customComponentsProps.TextInput);
    setCustomView(customComponentsProps.View);
    if(config.appDomain) EStyleSheet.build(colors);
}