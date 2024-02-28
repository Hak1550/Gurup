import React, {useCallback, useEffect} from "react";
import {View, Text, ScrollView, FlatList} from "react-native";
import styles from "../styles";
import MainLayout from "../../../components/MainLayout/core";
import Logic from '../logic'
import NutritionRecipesCard from "../../../components/NutritionRecipesCard/core";
import Tag from "../../../components/Tag/core";
import Preloader from '../../../components/Preloader'

const NutritionMenuSingle = ({nutritionMenu, _onPressCard, t,...rest }) => {
    
    const renderRecipe = useCallback(({item: recipe})=> (
        <NutritionRecipesCard
            id={recipe._id}
            kcal={recipe.nutritionValue?recipe.nutritionValue.kcal:null}
            img={recipe.img}
            cookingTime={recipe.cookingTime}
            title={recipe.title}
            type={recipe.type}
            onPress={_onPressCard}
            key={recipe._id}/>
    ), [nutritionMenu])

    const renderHeader = useCallback(()=> (
        <>
            <Text style={styles['menu-single__title']}>{nutritionMenu.title}</Text>
            <View style={styles['menu-single__tags']}>
                {nutritionMenu.tags && nutritionMenu.tags.map(tag => (
                    <Tag title={tag.name}/>
                ))}
            </View>
            <Text style={[styles['menu-single__title'], {marginTop: 15}]}>{t('app_nutrition:recipes_button')}</Text>
        </>
    ), [nutritionMenu])

    const keyExtractor = useCallback((item) => item._id.toString(), [nutritionMenu])

    return (
        <MainLayout screenTitle={nutritionMenu.title}>
            <View style={styles['menu-single']}>
                {!nutritionMenu.exercises 
                ?   <Preloader />
                :   <FlatList 
                        data={nutritionMenu.exercises}
                        keyExtractor={keyExtractor}
                        renderItem={renderRecipe}
                        ListHeaderComponent={renderHeader}
				    	showsVerticalScrollIndicator={false}
                    />
                }
            </View>
        </MainLayout>
    )
};

export default Logic(NutritionMenuSingle)
