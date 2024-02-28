import React, { useCallback,  } from "react"
import { View, FlatList } from "react-native"
import styles from "../styles"
import MainLayout from "../../../components/MainLayout/core"
import Logic from "../logic"
import NutritionMenuCard from "../../../components/NutritionMenuCard"
import NutritionRecipesCard from "../../../components/NutritionRecipesCard/core"
import Toggle from "../../../components/Toggle";

import Preloader from "../../../components/Preloader/core"
// import { paletteNumber } from "../../../styles/variables"
// import { compose } from "redux"
import ScreenPlaceholder from "../../../components/ScreenPlaceholder";
import NoRecipes from "../../../assets/core/svg-icon/no_recipes";

const NutritionMain = ({
		nutritionMenus,
		nutritionRecipes,
		_onPressCard,
		state,
		_toggleSection,
		loading,
		navigation,
		tags=[],
		t,
		...rest
	}) => {

	const contentType = state.activeSection === "menu" ? 'menu' : state.activeSection === "recipes" ? "recipes" : null

	const renderMenu = useCallback(({item: menu}) => {
		let menuTags = []
		// console.log("MENU!")
		if (menu.tags && menu.tags.length) {
			menuTags = tags.filter(tag => menu.tags.indexOf(tag._id) > -1)
			// console.log("menutags ",menuTags);
		}

		return <NutritionMenuCard 
					onPress={_onPressCard} 
					key={menu._id} 
					{...menu} 
					tags={menuTags}
				/>
	}, [tags])

	const renderRecipes = useCallback(({item: recipe}) => {
		return (
			<NutritionRecipesCard
				id={recipe._id}
				kcal={recipe.nutritionValue ? recipe.nutritionValue.kcal : null}
				img={recipe.img}
				cookingTime={recipe.cookingTime}
				title={recipe.title}
				// type={recipe.type }
				type="recipe"
				onPress={_onPressCard}
				key={recipe._id}
			/>
		)
	}, [tags])

	const renderHeader = useCallback(() => (
		<Toggle 
			style={styles["nutrition__switch"]}
			options={[
				{
					value: "menu",
					label: t("app_nutrition:menu_button")
				},
				{
					value: "recipes",
					label: t("app_nutrition:recipes_button")
				}
			]} 
			onToggle={_toggleSection}
		/>
	) , [])

	const keyExtractor = useCallback((item) => item._id.toString(), [tags])

	return (
		<MainLayout screenTitle={t(navigation.state.params.title)} backButton={false}>
			{/* НАЧАЛО: Контент */}
			{loading 
			? <Preloader />
			: nutritionMenus.length ? (
				<View style={styles["nutrition__content"]}> 
					<FlatList
						keyExtractor={keyExtractor}
						data={
							contentType === 'menu' 
							? nutritionMenus.sort((a,b) => a.sort - b.sort)
							: contentType ==='recipes' 
							? nutritionRecipes.sort((a,b) => a.sort - b.sort)
							: null
						}
						renderItem={
							contentType === 'menu' 
							? renderMenu
							: contentType ==='recipes' 
							? renderRecipes
							: null
						}
						ListHeaderComponent={renderHeader}
						showsVerticalScrollIndicator={false}
						stickyHeaderIndices={[0]}
						StickyHeaderComponent={renderHeader}
						maxToRenderPerBatch={10}
          				initialNumToRender={7}
						windowSize={15}
					/>
				</View> 
			 ) 
			: (
				<ScreenPlaceholder
					text={t("app_nutrition:no_recepies")}
					imageComponent={<NoRecipes />}
				/>
			) 		}
			{/* КОНЕЦ: Контент */}
		</MainLayout>
	)
}

export default Logic(NutritionMain)
