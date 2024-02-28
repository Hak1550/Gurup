import React from "react";
import {View, TouchableOpacity, Text} from "react-native";
import styles from "../styles";
import Logic from '../logic'
import EStyleSheet from "react-native-extended-stylesheet";
import Tag from "../../Tag/core";
import CacheImage from "../../CacheImage"
import InnerShadow from "../../../assets/core/svg-icon/inner_shadow"
import ItemSummary from "../../ItemSummary";
import moment from "moment";
import { formatPrice } from "../../../utils";
import {config} from "../../../styles/variables";
import Touchable from '../../Touchable';
const NutritionMenuCard = ({
    t,
    title, 
    img, 
    price,
    currency, 
    tags, 
    _id, 
    exercises: recipes = [], 
    type, 
    onPress, 
    description, 
    ...rest 
}) => {
    // const imgSrc = (img && img.length)?{ uri:img }:require('../../../assets/core/placeholder.png')
    const recipesTotalTime = recipes.reduce((totalTime, { cookingTime }) => totalTime + cookingTime, 0)
    
    let offset, stopOpacity;
    switch (config.theme) {
        case "light":
            offset = 0.3;
            stopOpacity = 1;
            break;
        case "dark":
        default:
            offset = 0.495;
            stopOpacity = 0.58;
    }

    return (
        // Этот View нужен только для тени
        <View style={{
            // shadowColor: EStyleSheet.value('$shadowColor'),
            // shadowOpacity: 0.2,
            // shadowRadius: 4,
            // shadowOffset: { width: 0, height: 4 },
            // elevation: 1
        }}>

            <Touchable activeOpacity={0.9} style={styles['menu-card']} onPress={() => onPress(type, _id)}>
                <View style={styles["menu-card__head"]}>
                    <CacheImage
                        source={img}
                        style={styles['menu-card__image']}
                    />
                    <InnerShadow
                        style={styles['menu-card__shadow']}
                        stopOpacity={offset}
                        offset={stopOpacity}
                    />
                    <ItemSummary
                        summary={[
                            {
                                text: moment.duration(recipesTotalTime, "minutes").format("h _", {
                                    precision: 1,
                                }),
                                icon: "clock-o"
                            },
                            {
                                text: `${recipes.length} ${t("app_basic:recipes")}`,
                                icon: "file-text-o"
                            },
                            {
                                text: price ? formatPrice({ price, currency }) : "FREE",
                            }
                        ]}
                        style={styles['menu-card__summary']}
                    />
                </View>

                <View style={styles['menu-card__body']}>
                    <Text style={styles['menu-card__title']}>{title}</Text>
                    <Text style={styles['menu-card__description']}>{description}</Text>
                    <View style={styles['menu-card__tags']}>
                        {tags && tags.map((tag) => {
                            // console.log("tag ",tag);
                            return(
                                <Tag key={tag._id} title={tag.name}/>
                            )
                        })}
                    </View>
                </View>

            </Touchable>

        </View>
    )
};

export default Logic(NutritionMenuCard)
