import React, { Component, Fragment } from "react"
import Skeleton from "react-loading-skeleton"
import Logic from "../logic"

import Header from "components/Header"
import Container from "components/Container"
import ParseBlocks from "components/ParseBlocks";

import { Wrapper, Image, Name, Time, TimeValue, Title, Values, Value, ValueName, Text} from '../styles';

const Recipe = ({ nutritionRecipe, t, loading }) => {
	return (
		<Fragment>
			<Header breadcrumbs={[
				{ label: t("basic:Nutrition"), to: "/nutrition" },
				{ label: t("basic:Recipes"), to: "/nutrition/recipes" },
				{ label: nutritionRecipe.title, to: `/nutrition/recipes/${nutritionRecipe._id}` }
			]} />
			<Container bodyWidth={100}>
				{
					(!loading.nutritionRecipe)
						? (
							<Wrapper>
								{nutritionRecipe.img && <Image src={nutritionRecipe.img} ratio="43.8" />}
								<Name>{nutritionRecipe.title}</Name>
								{
									nutritionRecipe.cookingTime && (
										<Time>
											<i className="fas fa-clock"></i> {t('cooking_time')} <TimeValue>{nutritionRecipe.cookingTime} {t('min')}</TimeValue>
										</Time>
									)
								}
								{
									nutritionRecipe.nutritionValue && (
										<Fragment>
											<Title>
												{t('nutritional_value')}
											</Title>
											<Values>
												{nutritionRecipe.nutritionValue.kcal && (
													<Value>
														<ValueName>
															{t('kcal')}
														</ValueName>
														{nutritionRecipe.nutritionValue.kcal}
													</Value>
												)}
												{nutritionRecipe.nutritionValue.proteins && (
													<Value>
														<ValueName>
															{t('proteins')}
														</ValueName>
														{nutritionRecipe.nutritionValue.proteins}
													</Value>
												)}
												{nutritionRecipe.nutritionValue.fats && (
													<Value>
														<ValueName>
															{t('fats')}
														</ValueName>
														{nutritionRecipe.nutritionValue.fats}
													</Value>
												)}
												{nutritionRecipe.nutritionValue.carbs && (
													<Value>
														<ValueName>
															{t('carbs')}
														</ValueName>
														{nutritionRecipe.nutritionValue.carbs}
													</Value>
												)}
											</Values>
										</Fragment>
									)
								}
								<Text>
									{nutritionRecipe.description}
								</Text>
								{
									(nutritionRecipe.blocks && nutritionRecipe.blocks.length)
										? <ParseBlocks blocks={nutritionRecipe.blocks} />
										: null
								}
							</Wrapper>
						)
						: (
							<Wrapper>
								<Image ratio="43.8"><Skeleton height="100%" /></Image>
								<Name><Skeleton /></Name>
								<Time><Skeleton /></Time>
								<Title><Skeleton /></Title>
								<Values>
									<Value><Skeleton width="50px" height="42px" /></Value>
									<Value><Skeleton width="50px" height="42px" /></Value>
									<Value><Skeleton width="50px" height="42px" /></Value>
									<Value><Skeleton width="50px" height="42px" /></Value>
								</Values>
								<Text>
									<Skeleton height="60px" />
								</Text>
							</Wrapper>
						)
				}
			</Container>
		</Fragment>
	)
}

export default Logic(Recipe)
