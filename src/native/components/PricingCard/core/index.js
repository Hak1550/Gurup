import React, { Fragment } from "react"
import { Linking, Platform, Text, TouchableOpacity, View } from "react-native"
import styles from "../styles"
import LinearGradientOverlay from "../../LinearGradientOverlay"
import Logic from "../logic"
import CacheImage from "../../CacheImage"

const PricingCard = ({
	name,
	oldPrice,
	price,
	recurringPeriodText,
	currency,
	hasSubscription,
	banner,
	active,
	onPress,
	type,
	coinImage,
	localizedPrice
}) => {
	
	const deviceStore = Platform.OS === "ios" ? "iTunes" : "Google Play"
	// console.log("currency ", currency, " localizedPrice ", localizedPrice);
	switch (currency) {
		case "RUB":
			currency = "₽"
			break
		case "EUR":
			currency = "€"
			break
	}
	if (type === "coin") {
		return (
			<TouchableOpacity
				style={[styles["pricing-card__coins"], styles[active ? "pricing-card-active" : "pricing-card"]]}
				onPress={onPress}>
				<View style={styles["pricing-card__coins__name"]}>
					<CacheImage source={coinImage} style={{width: 20, height: 20, marginRight: 10}} resizeMode={'contain'}/>
					<Text style={styles[active ? "pricing-card__title-active" : "pricing-card__title"]}>{name}</Text>
				</View>
				<View>
					{oldPrice ? (
						<Text style={styles[active ? "pricing-card__old-price-active" : "pricing-card__old-price"]}>
							{oldPrice}
							{currency}
						</Text>
					) : null}
					<Text style={styles[active ? "pricing-card__price-active" : "pricing-card__price"]}>
						{localizedPrice ? localizedPrice : price+currency+" "}
						<Text style={styles[active ? "pricing-card__price-per-active" : "pricing-card__price-per"]}>
							{recurringPeriodText}
						</Text>
					</Text>
				</View>
			</TouchableOpacity>
		)
	}
	// LanguageFixNeeded?
	if (!hasSubscription) {
		return (
			<TouchableOpacity style={styles[active ? "pricing-card-active" : "pricing-card"]} onPress={onPress}>
				<View style={styles["pricing-card__top"]}>
					<Text style={styles[active ? "pricing-card__title-active" : "pricing-card__title"]}>{name}</Text>
					{banner ? <Text style={styles["pricing-card__badge"]}>{banner}</Text> : null}
				</View>
				<View style={styles["pricing-card__bottom"]}>
					{oldPrice ? (
						<Text style={styles[active ? "pricing-card__old-price-active" : "pricing-card__old-price"]}>
							{oldPrice}
							{currency}
						</Text>
					) : null}
					<Text style={styles[active ? "pricing-card__price-active" : "pricing-card__price"]}>
						{localizedPrice ? localizedPrice : price + currency + " "}
						{/* {price} */}
						{/* {currency}{" "} */}
						<Text style={styles[active ? "pricing-card__price-per-active" : "pricing-card__price-per"]}>
							{recurringPeriodText}
						</Text>
					</Text>
				</View>

				{type == "one-time" ? (
					<Fragment>
						{active && (
							<View style={styles["pricing-card__info"]}>
								<Text style={styles["pricing-card__info-text"]}>
									Оплата будет снята с учетной записи {deviceStore} при подтверждении покупки
								</Text>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https:/gurucan.ru/policy")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Политика конфиденциальности</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https://gurucan.ru/termsofuse")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Условия пользования</Text>
								</TouchableOpacity>
							</View>
						)}
					</Fragment>
				) : null}

				{type == "not-renewable" ? (
					<Fragment>
						{active && (
							<View style={styles["pricing-card__info"]}>
								<Text style={styles["pricing-card__info-text"]}>
									Оплата будет снята с учетной записи {deviceStore} при подтверждении покупки
								</Text>
								<Text style={styles["pricing-card__info-text"]}>
									Подписка автоматически не продлевается.
								</Text>

								<Text style={styles["pricing-card__info-text"]}>
									Любая неиспользованная часть бесплатного пробного периода, если таковая
									предлагается, будет аннулирована, когда пользователь приобретает подписку на эту
									публикацию, где это применимо.
								</Text>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https:/gurucan.ru/policy")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Политика конфиденциальности</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https://gurucan.ru/termsofuse")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Условия пользования</Text>
								</TouchableOpacity>
							</View>
						)}
					</Fragment>
				) : null}

				{type == "auto-renewable" ? (
					<Fragment>
						{active && (
							<View style={styles["pricing-card__info"]}>
								<Text style={styles["pricing-card__info-text"]}>
									Оплата будет снята с учетной записи {deviceStore} при подтверждении покупки
								</Text>

								<Text style={styles["pricing-card__info-text"]}>
									Подписка автоматически продлевается, если автоматическое продление не отключено по
									крайней мере за 24 часа до окончания текущего периода.
								</Text>
								<Text style={styles["pricing-card__info-text"]}>
									С аккаунта будет взиматься плата за продление в течение 24 часов до окончания
									текущего периода, и указывается стоимость продления
								</Text>
								<Text style={styles["pricing-card__info-text"]}>
									Пользователь может управлять подписками, а автоматическое продление можно отключить,
									перейдя в настройки учетной записи пользователя после покупки.
								</Text>
								<Text style={styles["pricing-card__info-text"]}>
									Любая неиспользованная часть бесплатного пробного периода, если таковая
									предлагается, будет аннулирована, когда пользователь приобретает подписку на эту
									публикацию, где это применимо.
								</Text>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https:/gurucan.ru/policy")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Политика конфиденциальности</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => {
										Linking.openURL("https://gurucan.ru/termsofuse")
									}}>
									<Text style={styles["pricing-card__info-text"]}>Условия пользования</Text>
								</TouchableOpacity>
							</View>
						)}
					</Fragment>
				) : null}
			</TouchableOpacity>
		)
	} else {
		return (
			<TouchableOpacity style={styles["current-rate-card__wrapper"]}>
				<LinearGradientOverlay gradient={"MainGradient"} />
				<View style={styles["current-rate-card"]}>
					<View style={styles["current-rate-card__top"]}>
						<Text style={styles["current-rate-card__title"]}>{name}</Text>
					</View>
					<View style={styles["current-rate-card__bottom"]}>
						<Text style={styles["current-rate-card__price"]}>
							{localizedPrice ? localizedPrice : price + currency + " "}/
							<Text style={styles["current-rate-card__price-per"]}>{recurringPeriodText}</Text>
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

export default Logic(PricingCard)
