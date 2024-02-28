import React, { Component, Fragment } from "react"
import TextTruncate from 'react-text-truncate';
import Skeleton from "react-loading-skeleton"
import Logic from "../logic";

import Header from "components/Header"
import Content from "components/Content"
import AdaptiveImage from 'components/AdaptiveImage'
import Card from 'components/Card'
import Tags from 'components/Tags'

import { Wrapper, Image, Name, Text, ShowButton, RecipesTitle, Recipes, Recipe, RecipeParams, RecipeParam, RecipeName } from '../styles';

const customHeader = (src) => () => (
	<AdaptiveImage src={src} ratio="46.7" />
)

const Menu = ({ nutritionMenu, tags, state, showText, loading, t }) => {
	const { fullText } = state;
	const { fullDescription, img, title, exercises } = nutritionMenu;

	return (
		<Fragment>
			<Header breadcrumbs={[
				{ label: t('web_layout:nutrition_title'), to: "/nutrition" },
				{ label: t('web_layout:menus_title'), to: "/nutrition/menu" },
				{ label: nutritionMenu.title, to: `/nutrition/menu/${nutritionMenu._id}` }
			]} />
			<Content bodyWidth="100%">
				{
					(!loading.nutritionMenu && !loading.tags)
						? (
							<Fragment>
								<Wrapper>
									{
										img && <Image src={img} ratio="43.8" />
									}
									<Tags tags={tags} recipes={exercises} />
									<Name>{title && title}</Name>
									<Text>
										<TextTruncate
											line={fullText ? 0 : 4}
											truncateText="....."
											text={fullDescription}
											textTruncateChild={<Fragment><br/><ShowButton onClick={showText}>{t('more')}</ShowButton></Fragment>}
										/>
									</Text>
								</Wrapper>
								{
									(exercises && exercises.length !== 0) && (
										<Fragment>
											<RecipesTitle>{t('web_layout:recipes_title')}</RecipesTitle>
											<Recipes>
												{
													exercises.map(recipe => (
														<Recipe key={recipe._id} customHeader={customHeader(recipe.img)} link={`/nutrition/recipes/${recipe._id}`}>
															<RecipeParams>
																{
																	recipe.cookingTime && (
																		<RecipeParam>
																			<i className="fas fa-clock"></i> {recipe.cookingTime} <span>{t('min')}</span>
																		</RecipeParam>
																	)
																}
																{
																	(recipe.nutritionValue && recipe.nutritionValue.kcal) && (
																		<RecipeParam>
																			<i className="fas fa-leaf"></i> {recipe.nutritionValue.kcal} <span>{t('kcal')}</span>
																		</RecipeParam>
																	)
																}
															</RecipeParams>
															<RecipeName>
																{recipe.title}
															</RecipeName>
														</Recipe>
													))
												}
											</Recipes>
										</Fragment>
									)
								}
							</Fragment>
						)
						: (
							<Fragment>
								<Wrapper>
									<Image ratio="43.8"><Skeleton height="100%" /></Image>
									<div style={{marginBottom: '17px'}}><Tags loading /></div>
									<Name><Skeleton /></Name>
									<Text>
										<Skeleton height="76px" />
									</Text>
								</Wrapper>
								<RecipesTitle><Skeleton  width="100px" /></RecipesTitle>
								<Recipes>
									<Card loading />
									<Card loading />
									<Card loading />
								</Recipes>
							</Fragment>
						)
				}
			</Content>
		</Fragment>
	)
}

export default Logic(Menu)
