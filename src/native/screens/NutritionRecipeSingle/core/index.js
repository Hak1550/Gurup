import React, { Fragment } from "react"
import { View, Text, ScrollView } from "react-native"
import styles from "../styles"
import MainLayout from "../../../components/MainLayout/core"
import Article from "../../../components/ArticleLayout/core"
import Logic from "../logic"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CacheImage from "../../../components/CacheImage"
import InnerShadow from "../../../assets/core/svg-icon/inner_shadow"
import EStyleSheet from "react-native-extended-stylesheet";
import RecipeHead from "../RecipeHead";


// {
// 	nutritionRecipe.img ? (
// 		<CacheImage source={nutritionRecipe.img} style={styles["recipe__image"]}>
// 			<InnerShadow
// 				color={EStyleSheet.value("$screenBackgroundColor")}
// 				style={styles['recipe__image-shadow']}
// 			/>
// 			<View style={styles["recipe__image-conent"]}>
// 				{nutritionRecipe.title ? <Text style={styles["recipe__title"]}>{nutritionRecipe.title}</Text> : null}
// 				{nutritionRecipe.cookingTime ? (
// 					<Text style={styles["recipe__cookTime"]}>
// 						<FontAwesome name={"clock-o"} /> {nutritionRecipe.cookingTime} {t("app_nutrition:minute")}{" "}
// 						{/* <Text style={styles["recipe__pale-text"]}>{t("app_nutrition:cook_time")}</Text> */}
// 					</Text>
// 				) : null}
// 			</View>
// 		</CacheImage>
// 	) : null
// }

const NutritionRecipeSingle = ({ nutritionRecipe, t }) => {
	if (!nutritionRecipe) return null
	return (
		<MainLayout screenTitle={t("app_nutrition:nutrition_heading")}>
			<ScrollView contentContainerStyle={styles["recipe__content"]}>
			
				<RecipeHead nutritionRecipe={nutritionRecipe}/>
				
				<View style={styles['recipe__top']}>
					{nutritionRecipe.nutritionValue ? (
						<Fragment>
							{/* <Text style={styles["recipe__subtitle"]}>{t("app_nutrition:nutritional_value")}</Text> */}
							<View style={styles["recipe__nutrition-value"]}>
								<View style={styles["recipe__nutrition-value__item"]}>
									<Text style={[styles["recipe__nutrition-value__item-title"]]}>
										{t("app_nutrition:kcal")}
									</Text>
									<Text style={styles["recipe__nutrition-value__item-value"]}>
										{nutritionRecipe.nutritionValue.kcal ? nutritionRecipe.nutritionValue.kcal : null}
									</Text>
								</View>

								<View style={styles["recipe__nutrition-value__item"]}>
									<Text style={styles["recipe__nutrition-value__item-title"]}>
										{t("app_nutrition:proteins")}
									</Text>
									<Text style={styles["recipe__nutrition-value__item-value"]}>
										{nutritionRecipe.nutritionValue.proteins
											? nutritionRecipe.nutritionValue.proteins
											: null}
									</Text>
								</View>

								<View style={styles["recipe__nutrition-value__item"]}>
									<Text style={styles["recipe__nutrition-value__item-title"]}>
										{t("app_nutrition:fats")}
									</Text>
									<Text style={styles["recipe__nutrition-value__item-value"]}>
										{nutritionRecipe.nutritionValue.fats ? nutritionRecipe.nutritionValue.fats : null}
									</Text>
								</View>

								<View style={[styles["recipe__nutrition-value__item"], styles["recipe__no-border"]]}>
									<Text style={styles["recipe__nutrition-value__item-title"]}>
										{t("app_nutrition:carbohydrates")}
									</Text>
									<Text style={styles["recipe__nutrition-value__item-value"]}>
										{nutritionRecipe.nutritionValue.carbs ? nutritionRecipe.nutritionValue.carbs : null}
									</Text>
								</View>
							</View>
						</Fragment>
					) : null}
					{nutritionRecipe.description?<Text style={styles["recipe__description"]}>{nutritionRecipe.description}</Text>:null}
				</View>

				<View style={styles["recipe__description"]}>
					{nutritionRecipe.blocks &&
						nutritionRecipe.blocks.map((block, key) => <Article block={block} key={key} />)}
				</View>

				{false && nutritionRecipe.ingredients && nutritionRecipe.ingredients.length ? (
					<Fragment>
						<Text style={styles["recipe__subtitle"]}>
							{t("app_nutrition:ingredients")}
							{/*{recipe.portions} {recipe.portions >= 5 ? 'порций' : 'порции'}*/}
						</Text>
						<View style={styles["recipe__ingredients"]}>
							{nutritionRecipe.ingredients &&
								nutritionRecipe.ingredients.map((ingredient, key) => (
									<View style={styles["recipe__ingredient"]} key={key}>
										<Text style={styles["recipe__ingredient-name"]}>{ingredient.name}</Text>
										<View style={styles["recipe__ingredient-unit"]}>
											<Text style={styles["recipe__ingredient-unit__text"]}>
												{ingredient.qty}
											</Text>
											<Text style={styles["recipe__ingredient-unit__text"]}>
												{ingredient.units}
											</Text>
										</View>
									</View>
								))}
						</View>
					</Fragment>
				) : null}
			</ScrollView>
		</MainLayout>
	)
}

export default Logic(NutritionRecipeSingle)
