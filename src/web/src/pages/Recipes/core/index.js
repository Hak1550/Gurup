import React, { Component, Fragment } from "react"
import Skeleton from "react-loading-skeleton"
import Logic from "../logic"

import Header from "components/Header"
import Content from "components/Content"
import AdaptiveImage from 'components/AdaptiveImage';
import Card from 'components/Card';
import ModulePlaceholder from "components/ModulePlaceholder"

import { Grid, Params, Param, Name, Recipe, SkeletonWrap } from '../styles';

const customHeader = (src) => () => (
	<AdaptiveImage src={src} ratio="46.7" />
)

const Recipes = ({ nutritionRecipes, t, loading, filter }) => {
	console.log("Recipes loading ",loading);
	return (
		<Fragment>
			<Header filter={filter} breadcrumbs={[
				{ label: t("basic:Nutrition"), to: "/nutrition" },
				{ label: t("basic:Recipes"), to: "/nutrition/recipes" }
			]} />
			<Content bodyWidth="100%">
					{
						(loading && !loading.nutritionRecipes)
							? 
								(nutritionRecipes && nutritionRecipes.length)?(
									<Grid>
										{nutritionRecipes.map(recipe => (
											<Recipe key={recipe._id} customHeader={customHeader(recipe.img)} link={`/nutrition/recipes/${recipe._id}`}>
												<Params>
													{
														recipe.cookingTime && (
															<Param>
																<i className="fas fa-clock"></i> {recipe.cookingTime} <span>{t('min')}</span>
															</Param>
														)
													}
													{
														(recipe.nutritionValue && recipe.nutritionValue.kcal) && (
															<Param>
																<i className="fas fa-leaf"></i> {recipe.nutritionValue.kcal} <span>{t('kcal')}</span>
															</Param>
														)
													}
												</Params>
												<Name>
													{recipe.title}
												</Name>
											</Recipe>
										))}
									</Grid>
								):<ModulePlaceholder text={t(`web_basic:no_recipes`)}/>
							: (
								<Grid>
									<Card loading />
									<Card loading />
									<Card loading />
								</Grid>
							)
					}
			</Content>
		</Fragment>
	)
}

export default Logic(Recipes)
