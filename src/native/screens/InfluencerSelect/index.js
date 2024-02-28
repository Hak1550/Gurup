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
import { checkInfluencer, selectInfluencer, setDeviceData} from "../../../actions/sign"
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
import Button from "../../components/Button"

import testMode from "../../utils/debug"
import * as Styled from "../EntryQR/styles";
import { initPushToken } from "../../utils"
import {getDeviceData} from "../../utils";

class InfluencerSelect extends Component {
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

	}
	componentDidUpdate(prevProps, prevState){

	}

	onClick = async ({influencer, user, jwt_token}) => {
		if(this.isClicked){
			return;
		}
		this.isClicked = true;
		const { toggleTheme } = this.props;
		const { dispatch } = this.props
		this.setState({ loadingSchool: true })
		let env = await AsyncStorage.getItem("env")
		let influencerData = await dispatch(checkInfluencer({ subdomain: influencer.name, config, env }))
		if (influencerData && influencerData.influencer) {
			updateBaseUrl({
				subdomain: influencer.name,
				env,
			})
			dispatch(selectInfluencer({influencer: influencerData.influencer, user, jwt_token}));
			toggleTheme(influencerData.influencer)
			await AsyncStorage.setItem("subdomain", influencer.name);
			await AsyncStorage.setItem("jwt_token", jwt_token);
			initPushToken(influencer, dispatch);
			const {device, expoData} = getDeviceData();
			dispatch(setDeviceData({
				device:JSON.stringify(device),
				expoData:JSON.stringify(expoData)
			}));
			this.setState({ loadingSchool: false })
			Actions.reset("tabbar");
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
		const { dispatch, credentials } = this.props;
		const searchData = credentials.filter(({influencer}) => {
			return (
				influencer.appName && influencer.appName.toLowerCase().includes(text.toLowerCase()))
				|| influencer.name.toLowerCase().includes(text.toLowerCase())
		})
		// console.log("SEARCH DATA", searchData);
		this.setState({ searchQuery: text, searchData})
		// this.setState({ searchDataIsLoading: true })
	}

	render() {
		const { searchQuery, loadingSchool } = this.state;
		const {credentials} = this.props.navigation.state.params;
		const { t } = this.props;
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
								source={require("../../assets/core/logo_gurucan.png")}
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
										{t("app_login:search_select_description")}
									</Text>
								</TouchableOpacity>
							</View>
							<View style={styles["discover__input__wrapper"]}>
								<FontAwesome
									style={styles["discover__input__icon__search"]}
									// placeholderTextColor={"#949CA4"}
									name={"search"}
								/>
								<TextInput
									ref={this.searchInputRef}
									style={styles["discover__input"]}
									placeholder={t("basic:search")}
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
							<InfluencersList
								onClick={this.onClick}
								data={credentials}
								searchQuery={this.state.searchQuery}
								searchData={this.state.searchData}
								hideSearchView={this.hideSearchView}
								t={t}
							/>
						</ScrollView>
						<Button style={styles["discover__back-button"]} onPress = {Actions.pop} title={t("app_login:fast_login_back_to_options")} icon="angle-left"/>
					</View>
				</View>
			)
	}
}

class InfluencersList extends Component {

	componentDidUpdate(prevProps, prevState) {}

	_renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => this.props.onClick(item)} style={styles["influencer-list__item"]}>
				<Avatar
					uri={item.influencer.logo}
					name={item.influencer.appName ? item.influencer.appName:item.influencer.name}
					width={50}
					height={50}
				/>
				<Text style={styles["influencer-list__item__title"]}>{item.influencer.appName?item.influencer.appName:item.influencer.name}</Text>
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
		const { data } = this.props;
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
					resizeMode="contain"
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
)(InfluencerSelect)
