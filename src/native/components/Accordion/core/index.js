import React, { Component } from 'react';
import { Text, View, TouchableOpacity, LayoutAnimation } from 'react-native';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from '../styles';
import Logic from '../logic';

// TODO: Удалить пакет accordion
class Accordion extends Component {
	state = {
		activeQuestion: null,
	}

	_head = (question, active) => (
		<View style={styles.accordion__head}>
			<Text style={styles['accordion__head-title']}>{question}</Text>
			<View style={styles['accordion__head__arrow']}>
				<FontAwesome
					style={styles['accordion__head__arrow-icon']}
					name={active ? 'chevron-up' : 'chevron-down'}
				/>
			</View>
			
		</View>
	)

	_body = answer => (
		<View style={styles.accordion__body}>
			<Text style={styles['accordion__head-text']}>{answer}</Text>
		</View>
	)

	toggleAnswer = (index) => {
		this.setState((prevState) => {
			LayoutAnimation.configureNext({
				duration: 100,
				create: {
					type: LayoutAnimation.Types.linear,
					property: LayoutAnimation.Properties.opacity,
				},
				update: {
					type: LayoutAnimation.Types.linear,
				}
			});
			if (prevState.activeQuestion !== index) {
				return { activeQuestion: index };
			}
			return { activeQuestion: null };
		});
	}

	render() {
		const { data } = this.props;
		return (
			<View style={{ paddingHorizontal: 16 }}>
				{data.map((faq, index) => (
					<TouchableOpacity
						key={faq.answer}
						style={styles.accordion}
						onPress={() => this.toggleAnswer(index)} >
						{this._head(faq.question, this.state.activeQuestion === index)}
						{this.state.activeQuestion === index ? this._body(faq.answer) : null}
					</TouchableOpacity>
				))}
			</View>
		);
	}
}

export default Logic(Accordion);
