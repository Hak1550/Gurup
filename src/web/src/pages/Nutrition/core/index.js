import React, { Fragment } from "react"
import Logic from "../logic"

import { Container, CardInfo, CardDescription, CardTitle, CardBackground} from "../styles"
import MainContainer from "components/Container";
import Card from "components/Card"
import Header from "components/Header"
import Tags from "components/Tags"

import ModulePlaceholder from "components/ModulePlaceholder"

export default Logic(({ nutritionMenus, tags, loading, t, filter }) => {
	return (
		<Fragment>
			<Header filter={filter} breadcrumbs={[{ label: t("basic:Nutrition"), to: "/nutrition" }]} />
			{!loading.nutritionMenus && !loading.tags ? (
				!nutritionMenus || !nutritionMenus.length ? (
					<MainContainer style={{height: '100%'}} verticalCenter horizontalCenter>
						<ModulePlaceholder text={t(`web_basic:no_menus`)} />
					</MainContainer>
				) : (
					<Container>
						{nutritionMenus.map(menu => {
							const { _id, title, description, img, exercises } = menu
							let menuTags = null

							if (menu.tags && menu.tags.length) {
								menuTags = tags.filter(tag => menu.tags.indexOf(tag._id) > -1)
							}

							return (
								<Card
									key={_id}
									link={`/nutrition/menu/${_id}`}
									customHeader={() => <CardBackground img={img} />}>
									<CardInfo>
										<CardTitle>{title}</CardTitle>
										<CardDescription>{description}</CardDescription>
										<Tags fit tags={menuTags} recipes={exercises} />
									</CardInfo>
								</Card>
							)
						})}
					</Container>
				)
			) : (
				<Container>
					<Card loading />
					<Card loading />
					<Card loading />
				</Container>
			)}
		</Fragment>
	)
})
