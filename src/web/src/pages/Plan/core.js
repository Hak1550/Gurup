import React, { Component, Fragment } from "react"
import Content from "components/Content"
import Button from "components/Button"
import Header from "components/Header"
import ReadMore from "components/ReadMore"
import CardLesson from "components/CardLesson"
import {Link} from "react-router-dom";
import Logic from "./logic"
import {
	FooterGrid, FooterTitle, Image, ImagePlaceholder, Or, PriceLabel, SignTitle,
	PaymentMethod, PageBody, PriceWrap, PageFooter, PaymentMethods, Price, Title,
	Container, Wrap, Block, SubTitle, Sign, Sidebar, Start, SubscribeWrap, CloseBlock, BlockImage, DownloadApp
} from "pages/Course/styles"
import {
	Currency
} from './styles'
import Skeleton from "react-loading-skeleton"
import getSymbolFromCurrency from "currency-symbol-map"
import { isAuthorized} from 'hocs/checkAuth';
import CheckoutHeader from 'components/CheckoutHeader';

class Plan extends Component {
	render() {
		const { plan, loading, t, subscribe } = this.props;
		const { banner, fullDescription, currencySymbol, recurringPeriodKey, price, name, _id } = plan;
		let changeDirection = ""
		if (!banner) {
			changeDirection = "column"
		}
		return (
			<Fragment>
				<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=0.2"></meta>
				<Header 
					breadcrumbs={[{ to: "/plans/"+plan._id, label: plan.name }]}/>
				<Container bodyWidth={"100%"}>
					<Wrap className={changeDirection}>
						<PageBody>
							{!loading.plan ? (
								<Fragment>
									{banner && <Image src={banner} />}
									<Title>{name}</Title>
									{fullDescription && fullDescription.length ? <ReadMore>{fullDescription}</ReadMore> : null}

								</Fragment>
							) : (
									<Fragment>
										<ImagePlaceholder>
											<Skeleton height={278} />
										</ImagePlaceholder>
										<Title>
											<Skeleton />
										</Title>
									</Fragment>
								)}
						</PageBody>
						<Sidebar className={changeDirection}>
							{!isAuthorized() ? (
								<Sign changeUrl={false} afterSign={subscribe} buttonText={t("basic:subscribe")}>
									<CheckoutHeader title={"default"} price={
										<span>{price}<Currency>{currencySymbol}</Currency>/{t("pricing:" + recurringPeriodKey)}</span>
									}/>
								</Sign>
							) : true ? (
								<Fragment>
									<CheckoutHeader price={
										<span>{price}<Currency>{currencySymbol}</Currency>/{t("pricing:" + recurringPeriodKey)}</span>
									}/>
									<Button
										style={{
											borderRadius: "10px",
											width: "100%",
										}}
										onClick={subscribe}>
										{t("basic:subscribe")}
									</Button>
								</Fragment>
							) : (
								<Button
									style={{
										borderRadius: "10px",
										width: "100%",
									}}
									onClick={"unsub"}>
									{t("basic:label_checkout")}
								</Button>
							)}
						</Sidebar>
					</Wrap>
					{/* <PageFooter>
						{!loading.plan ? (
							<Fragment>
								<FooterTitle>permission name</FooterTitle>
								<FooterGrid>
										map permissions
								</FooterGrid>
							</Fragment>
						) : (
							<Fragment>
								<FooterTitle>
									<Skeleton width={150} />
								</FooterTitle>
								<FooterGrid>
									<Skeleton width={300} height={170} />
									<Skeleton width={300} height={170} />
									<Skeleton width={300} height={170} />
								</FooterGrid>
							</Fragment>
						)}
					</PageFooter> */}
				</Container>
			</Fragment>
		)
	}
}

export default Logic(Plan)

const paymentMethods = [
	require("assets/core/icon/visa.png"),
	require("assets/core/icon/mastercard.png"),
	require("assets/core/icon/mir.png")
]