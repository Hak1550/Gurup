import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'
import styles from '../styles'
import Button from "../../../components/Button";
import Logic from '../logic'
import {paletteNumber} from "../../../styles/variables";

class MarathonResult extends Component {
    marathonFailedImageForTemplate = () => {
        const marathonFailedImage1 = require('../../../assets/core/marathon-failed-tmp1.png')
        const marathonFailedImage2 = require('../../../assets/core/marathon-failed-tmp2.png')
        const marathonFailedImage3 = require('../../../assets/core/marathon-failed-tmp3.png')
        switch (paletteNumber) {
            case 0:
                return marathonFailedImage1;
            case 1:
                return marathonFailedImage2;
            case 2:
                return marathonFailedImage3;
        }
    }

    marathonDoneImageForTemplate = () => {
        // console.log(paletteNumber)
        const marathonDoneImage1 = require('../../../assets/core/marathon-done-tmp1.png')
        const marathonDoneImage2 = require('../../../assets/core/marathon-done-tmp2.png')
        const marathonDoneImage3 = require('../../../assets/core/marathon-done-tmp3.png')
        switch (paletteNumber) {
            case 0:
                return marathonDoneImage1;
            case 1:
                return marathonDoneImage2;
            case 2:
                return marathonDoneImage3;
        }
    }

    render() {
        const { marathonResult = 'finish', marathonResultTitle, marathonResultText, t } = this.props
        return (
            <View style={styles['marathon-finish__container']}>
                <View style={styles['marathon-finish__content']}>
                    <Image
                        source={marathonResult === 'fail' ? this.marathonFailedImageForTemplate() : this.marathonDoneImageForTemplate()}
                        style={{ width: 173, height: 177 }}/>
                    <Text style={styles['marathon-finish__title']}>{marathonResultTitle}</Text>
                    <Text style={styles['marathon-finish__text']}>{marathonResultText}</Text>
                    <Button title={t('app_courses:buy_course_button')} theme='accent'/>
                </View>
            </View>
        )
    }
}

export default Logic(MarathonResult)
