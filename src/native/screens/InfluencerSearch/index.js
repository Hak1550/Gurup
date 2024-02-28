import React, { Component, Fragment } from "react"
import {
	FlatList,
	ImageBackground,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ScrollView,
	BackHandler,
	SafeAreaView,
	Platform,
	Image,
	StatusBar,
	Animated
} from "react-native"
import { Actions } from "react-native-router-flux"
import { updateBaseUrl } from "../../../requester/index.js"
import { connect } from "react-redux"
import { checkInfluencer } from "../../../actions/sign.js"
import { chooseTemplate, config } from "../../styles/variables"
import AsyncStorage from "@react-native-async-storage/async-storage"


import { compose } from "redux"
import { withNamespaces } from "react-i18next"
import styles from "./styles"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Carousel from "react-native-snap-carousel"
import { getFeaturedInfluencer, searchInfluencers } from "../../../actions/misc"
import LinearGradientOverlay from "../../components/LinearGradientOverlay"
import _ from "underscore"
import Preloader from "../../components/Preloader"
import CacheImage from "../../components/CacheImage"
import SchoolPreloader from "../../components/SchoolPreloader"
import EStyleSheet from 'react-native-extended-stylesheet';

import testMode from "../../utils/debug"
import * as Styled from "../EntryQR/styles";

class InfluencerSearch extends Component {
	state = {
		subdomain: "",
		searchViewStatus: false,
		data: [],
		searchQuery: "",
		searchData: [],
		dataIsLoading: false,
		searchDataIsLoading: false,
		schoolInStorage: [],
		marginTop: 0,
		loadingSchool: false
	}

	searchInputRef = React.createRef()

	async componentDidMount() {
		const { dispatch } = this.props
		this.setState({ dataIsLoading: true })
		let userSchools = await AsyncStorage.getItem("schools")
		userSchools = JSON.parse(userSchools)
		// console.log("userSchools ", userSchools);
		if (userSchools && userSchools.myschools){
			this.setState({ schoolInStorage: userSchools.myschools })
		}
		dispatch(getFeaturedInfluencer())
			.then((data) => {
				this.setState({ data: data.influencers })
			})
			.finally(() => this.setState({ dataIsLoading: false }))
	}
	componentDidUpdate(prevProps, prevState){
		// console.log("prevState.loadingSchool", prevState.loadingSchool, this.state.loadingSchool )
		if (prevState.loadingSchool === true && this.state.loadingSchool === false){
			console.log("LOADING FINISHED", prevState.loadingSchool, this.state.loadingSchool )
			// Actions.intro()
		}
	}
	onClick = async subdomain => {
		if(this.isClicked){
			return;
		}
		this.isClicked = true;
		const { toggleTheme } = this.props;
		
		// console.log("influencer clicked 1 ", subdomain)
		const { dispatch } = this.props
		// console.log("influencer clicked 2 ", config)
		this.setState({ loadingSchool: true })
		let env = await AsyncStorage.getItem("env")
		// console.log("env ", subdomain, config, env)
		let influencerData = await dispatch(checkInfluencer({ subdomain, config, env }))
		// console.log("influencer clicked 3 ", influencerData)
		if (influencerData && influencerData.influencer) {
			updateBaseUrl({
				subdomain,
				env,
			})

			await AsyncStorage.setItem("subdomain", subdomain)
			toggleTheme(influencerData.influencer)
			this.setState({ loadingSchool: false })
			Actions.intro()
		} else {
			console.log("not found...")
		}
		this.isClicked = false;
	}

	showSearchView = () => {
		// console.log('search view show func')
		this.setState({ searchViewStatus: true, marginTop: -40 })
	}

	hideSearchView = () => {
		this.searchInputRef.current.blur()
		this.setState({ searchQuery: null, searchViewStatus: false, marginTop: 0 })
	}

	handleChange = async text => {
		const { dispatch } = this.props
		this.setState({ searchQuery: text })
		// this.setState({ searchDataIsLoading: true })
		dispatch(searchInfluencers(text))
			.then(data => {
				this.setState((state) => {
					if(state.searchData.length !== data.influencers.length) {
						return { searchData: data.influencers }
					}
				})
			})
			.finally(() => this.setState({ searchDataIsLoading: false }))
	}

	render() {
		const { searchViewStatus, dataIsLoading, searchDataIsLoading, searchQuery, loadingSchool } = this.state
		const { t } = this.props
		// console.log("dataIsLoading ", dataIsLoading, "  searchDataIsLoading ", searchDataIsLoading);
		// console.log("Platform ", Platform);
		return loadingSchool
			? <SchoolPreloader/>
			: (
				<View style = {styles["discover"]}>
					<StatusBar barStyle="light-content" />
					{!this.state.searchViewStatus && (
						<View
							style={[
								styles["discover__logo-wrap"],
							]}
						>
							<Image
								style={styles["discover__logo"]}
								resizeMode="contain"
								source={require("../../assets/core/logo.png")}
							/>
						</View>
					)}
					<View style={styles["discover__box"]}>
						<View style={[styles["discover__header"]]}>
							<View style={[styles["discover__header-text"]]}>
								<TouchableOpacity onPress={() => {
									testMode();
								}}>
									<Text style={styles["discover__description"]}>
										{t("search_description")}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles["discover__input__wrapper"]}>
								<FontAwesome
									style={styles["discover__input__icon__search"]}
									placeholderTextColor={"#949CA4"}
									name={"search"}
								/>
								<TextInput
									autoCapitalize='none'
									ref={this.searchInputRef}
									style={styles["discover__input"]}
									placeholder={t("search_placeholder")}
									placeholderTextColor={EStyleSheet.value("$textColor")}
									onFocus={() => this.showSearchView()}
									onChangeText={text => this.handleChange(text)}
									value={searchQuery}
								/>

								{this.state.searchViewStatus && (
									<TouchableOpacity
										style={styles["discover__input__close-search"]}
										onPress={() => this.hideSearchView()}>
										<FontAwesome style={styles["discover__input__icon__close"]} name={"close"} />
									</TouchableOpacity>
								)}
							</View>
						</View>
						<ScrollView style={styles["discover__list"]} contentContainerStyle={styles["discover__list-inner"]}>
							{!dataIsLoading && searchViewStatus ? (
								<InfluencersList
									onClick={this.onClick}
									data={this.state.data}
									searchQuery={this.state.searchQuery}
									searchData={this.state.searchData}
									dataIsLoading={dataIsLoading}
									searchDataIsLoading={searchDataIsLoading}
									hideSearchView={this.hideSearchView}
									t={t}
								/>
							) : (
								<InfluencerOverview
									onClick={this.onClick}
									data={this.state.data}
									schoolInStorage={this.state.schoolInStorage}
									dataIsLoading={dataIsLoading}
									t={t}
								/>
							)}
						</ScrollView>
					</View>
				</View>
			)
	}
}

class InfluencerOverview extends Component {
	_renderRecentItem = ({ item, index }) => {
		const {t} = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.props.onClick(item.name)}
				style={styles["recent-slider__item__container"]}>
				{item.lp__banner ? (
					<ImageBackground
						source={{ uri: item.lp__banner }}
						imageStyles={{ resizeMode: "cover" }}
						style={styles["recent-slider__item__bgi"]}
					/>
				) : (
					<LinearGradientOverlay width={"200%"} height={"200%"} gradient={"GurucanGradient"} />
				)}
				<Avatar
					uri={item.logo}
					name={item.appName?item.appName:item.name}
				/>
				<Text style={styles["recent-slider__item__title"]}>{item.appName?item.appName:item.name}</Text>
				<Text style={styles["recent-slider__item__description"]}>
					{("" + item.featuredDescription).length > 90
						? ("" + item.featuredDescription).substring(0, 90) + "..."
						: "" + item.featuredDescription}
				</Text>
				<Text style={styles["recent-slider__item__followers-count"]}>{item.membersCount} {t("members")}</Text>
			</TouchableOpacity>
		)
	}

	_renderFeaturedItem = ({ item, index }) => {
		// console.log("name", item.name, "logo", item.logo)
		const {t} = this.props;
		return (
			<TouchableOpacity
				onPress={() => this.props.onClick(item.name)}
				style={styles["featured-slider__item__container"]}>
				<Avatar uri={item.logo} name={item.appName?item.appName:item.name} />
				<Text style={styles["featured-slider__item__title"]}>{item.appName?item.appName:item.name}</Text>
				<Text style={styles["featured-slider__item__description"]}>
					{("" + item.featuredDescription).length > 90
						? ("" + item.featuredDescription).substring(0, 90) + "..."
						: "" + item.featuredDescription}
				</Text>
				<Text style={styles["featured-slider__item__followers-count"]}>
					{item.membersCount}
					<Text style={styles["featured-slider__item__followers-count-text"]}> {t("members")}</Text>
				</Text>
				<TouchableOpacity style={styles["featured-slider__item__button"]}>
					<Text style={styles["featured-slider__item__button-text"]}>{t("start")}</Text>
				</TouchableOpacity>
			</TouchableOpacity>
		)
	}

	_renderItem = ({ item }) => {
		const { t } = this.props;
		return (
			<TouchableOpacity onPress={() => this.props.onClick(item.name)} style={styles["influencer-list__item"]}>
				<Avatar uri={item.logo} name={item.appName?item.appName:item.name} />
				<Text style={styles["influencer-list__item__title"]}>{item.appName?item.appName:item.name}</Text>
			</TouchableOpacity>
		)
	}

	renderSeparator = () => {
		const { t } = this.props;
		return <View style={styles["influencer-list__item__separator"]} />
	}

	render() {
		const { dataIsLoading, schoolInStorage, onClick, t } = this.props
		return (
			<View style={styles["influencer-overview"]}>
				{dataIsLoading && <Preloader />}
				{!dataIsLoading && (
					<Fragment>
						{schoolInStorage && schoolInStorage.length ? (
							<View style={styles["influencer-overview__schools"]}>
								<Text style={styles["influencer-overview__title"]}>{t("your_schools")}</Text>
								{schoolInStorage.map(school => {
									return (
										<TouchableOpacity
											onPress={() => onClick(school.name)}
											style={styles["influencer-overview__school"]}
											key={school.name}>
											<Avatar width={47} height={47} uri={school.logo} name={school.name}/>
											<View style={styles["influencer-overview__school-text"]}>
												<Text style={styles["influencer-overview__school-text__name"]}>
													{school.appName? school.appName: school.name}
												</Text>
											</View>
										</TouchableOpacity>
									)
								})}
							</View>
						) : null }
					</Fragment>
				)}
			</View>
		)
	}
}

class InfluencersList extends Component {
	state = {
		data: [],
	}

	componentDidMount() {
		this.setState({ data: this.props.data })
	}

	componentDidUpdate(prevProps, prevState) {}

	_renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.props.onClick(item.name)} style={styles["influencer-list__item"]}>
				<Avatar
					uri={item.logo}
					name={item.appName?item.appName:item.name}
					width={50}
					height={50}
				/>
				<Text style={styles["influencer-list__item__title"]}>{item.appName?item.appName:item.name}</Text>
			</TouchableOpacity>
		)
	}

	renderSeparator = () => {
		return <View style={styles["influencer-list__item__separator"]} />
	}

	componentDidMount() {
		// console.log("BackHandler mount ", this.props.toggleSearch)
		this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
			if (this.props.hideSearchView) {
				this.props.hideSearchView()
			}
		})
	}

	componentWillUnmount() {
		// console.log("unmount BackHandler")
		this.backHandler.remove()
	}

	render() {
		const { searchData, searchDataIsLoading, searchQuery, dataIsLoading, t } = this.props
		// console.log("searchDataIsLoading", searchDataIsLoading)
		const { data } = this.state
		return (
			<View style={styles["influencer-list"]}>
				<FlatList
					data={_.isEmpty(searchData) ? data : searchData}
					style={{ flex: 1, paddingHorizontal: 36 }}
					keyExtractor={item => item._id}
					renderItem={this._renderItem}
					ListEmptyComponent={<Text> {searchQuery > 1 && t("nothing_found")}</Text>}
					ItemSeparatorComponent={this.renderSeparator}
				/>
			</View>
		)
	}
}

const Avatar = ({ width = 35, height = 35, fontSize = 16, uri = "", name = "" }) => {
	const userName = name.replace(/([\uD800-\uDBFF]|[\u2702-\u27B0]|[\uF680-\uF6C0]|[\u24C2-\uF251])/g, "").slice(0, 1)
	return (
		<View style={styles["avatar"]}>
			{uri ? (
				<CacheImage
					style={{ width: width, height: height, borderRadius: width / 2, overflow: "hidden" }}
					source={uri}
				/>
			) : (
				<View style={[styles["avatar__non-image"], { width: width, height: height, borderRadius: width / 2 }]}>
					<Text style={[styles["avatar__name-text"], { fontSize: fontSize }]}>{userName}</Text>
				</View>
			)}
		</View>
	)
}

export default compose(
	withNamespaces(["app_login", "basic"], { wait: true }),
	connect(({ me }) => ({ me }))
)(InfluencerSearch)
