import React from "react";
import {View, ActivityIndicator} from "react-native";
import PropTypes from 'prop-types'
import styles from "../styles";
import Logic from '../logic'
import EStyleSheet from 'react-native-extended-stylesheet';

const Preloader = props => {
	let preloaderColor;
	if(!props.color){
		try {
			preloaderColor = EStyleSheet.value("$accent")
		} catch {
			preloaderColor = "default";
		}
	} else {
		preloaderColor = props.color
	}
	const preloaderStyles = [
		styles['preloader'],
		props.style
	]
	return (
		<View style={preloaderStyles}>
			<ActivityIndicator size={props.size} color={preloaderColor}/>
		</View>
	)
};

Preloader.propTypes = {
	size: PropTypes.oneOf(['large', 'small']),
	color: PropTypes.string
}

Preloader.defaultProps = {
	size: 'large'
}


export default Logic(Preloader)
