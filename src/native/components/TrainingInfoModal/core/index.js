import React, {Component} from 'react';
import {View, Text, ScrollView} from 'react-native'
import Logic from '../logic'
import styles from '../styles'
import Modal from "react-native-modal";
import FitImage from "react-native-fit-image";
import EStyleSheet from "react-native-extended-stylesheet";

class TrainingInfoModal extends Component {
    state = {
        scrollOffset: 0
    }
    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    render() {
        const { isOpen, workout, closeModal } = this.props
        return (
            <Modal
                scrollTo={this.handleScrollTo}
                scrollOffset={this.state.scrollOffset}
                scrollOffsetMax={400 - 300}
                isVisible={isOpen}
                propagateSwipe
                backdropOpacity={0.3}
                style={{ margin: 0 }}
                swipeDirection="down"
                onSwipe={() => closeModal()}>
                <View style={styles['training-modal']}>
                    <View style={styles['training-modal__close-button']}/>
                    <ScrollView
                        ref={ref => (this.scrollViewRef = ref)}
                        onScroll={this.handleOnScroll}
                        scrollEventThrottle={16}
                        alwaysBounceVertical={false}
                        >
                        <FitImage
                            source={{ uri: workout && workout.meta_data ? workout.meta_data.thumbnail : null }}
                            indicator={true}
                            indicatorColor={EStyleSheet.value('$accent')}
                            indicatorSize={'small'}
                            originalHeight={181}
                            originalWidth={319}/>
                            <View style={styles['training-modal__content']}>
                                <Text style={styles['training-modal__content-title']}>{workout && workout.meta_data ? workout.meta_data.title : null}</Text>
                                <Text style={styles['training-modal__content-text']}>{workout && workout.meta_data ? workout.meta_data.description : null}</Text>
                            </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }
}

export default Logic(TrainingInfoModal);