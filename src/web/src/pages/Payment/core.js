import React, { Component, Fragment } from "react"
import Button from "components/Button"
import Header from "components/Header"
import {Link} from 'react-router-dom';
import Logic from "./logic"
import {
	Block,
CloseBlock,
Title,
SubTitle,
BlockImage,
DownloadApp,
Content,
Desktop,
Mobile,
Apps
} from "./styles"
import Skeleton from "react-loading-skeleton"
import getSymbolFromCurrency from "currency-symbol-map"
import { isAuthorized } from 'hocs/checkAuth';
import {
	isIOS,
	isAndroid,
} from "react-device-detect";

export default Logic(({
	influencer,
	match,
	t,
})=>{
	let {type, id} = match.params
	let url 
	if (type === "course") {
		url = `/courses/${id}`
	} else if (type === "marathon") {
		url = `/challenges/${id}`
	} else if (type === "plan") {
		url = "/courses"
	}
	return (
		<Fragment>
			<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=1.0, maximum-scale=1.0, minimum-scale=0.2"></meta>
			<Header />
			<Mobile>
				<Block>
					<Link to={url}>
						<CloseBlock className="fas fa-times" />
					</Link>
					<Title style={{marginBottom: "16px"}}>{t("web_basic:payment_success_title")}</Title>
					<SubTitle style={{marginBottom: "10px"}}>{t("web_basic:payment_success_description")}</SubTitle>
					<BlockImage style={{marginTop: "39px"}} src={require("assets/core/block.png")} />
					{isIOS ? (
						<a style={{ marginTop: "41px" }} href={influencer.iosAppUrl}>
							<DownloadApp src={require("assets/core/app-store.png")} />
						</a>
					) : (
						<a style={{ marginTop: "41px" }} href={influencer.androidAppUrl}>
							<DownloadApp src={require("assets/core/google-play.png")} />
						</a>
					)}
				</Block>
			</Mobile>
			<Desktop>
				<Content>
					<BlockImage style={{ marginTop: "20px"}} src={require("assets/core/block.png")} />
					<Title style={{ marginBottom: "15px", marginTop: "36px" }}>{t("web_basic:payment_success_title")}</Title>
					<Button style={{ marginBottom: "52px" }} to={url}>{t("web_basic:go_to_" + type)}</Button>
					<SubTitle style={{marginBottom: "27px"}}>{t("web_basic:or_download_app")}</SubTitle>
					<Apps>
						<a style={{ marginRight: "24px" }} href={influencer.iosAppUrl}>
							<DownloadApp src={require("assets/core/app-store.png")} />
						</a>
						<a href={influencer.androidAppUrl}>
							<DownloadApp src={require("assets/core/google-play.png")} />
						</a>
					</Apps>
				</Content>
			</Desktop>
		</Fragment>
	)
})


