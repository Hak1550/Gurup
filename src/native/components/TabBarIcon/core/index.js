import React from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styles from "../styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { withNamespaces } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import { config } from "../../../styles/variables"
import Ripple from 'react-native-material-ripple';
import Touchable from '../../Touchable';


class TapBarIcon extends React.Component {
	componentDidUpdate = ()=>{
		// console.log("componentDidUpdate");

	}
	getTabTitle = () => {
		const { influencer } = this.props;
		const route = this.props.navigation.state;
		switch (route.key) {
			case "courses_tab":
				return config.tabBarTitles["courses"] ||
					influencer.app__menuCoursesText ||
					"Courses"
			case "chats_tab":
				return config.tabBarTitles["chats"] ||
					influencer.app__menuChatsText ||
					"Chats"
			case "articles_tab":
				return config.tabBarTitles["articles"] ||
					influencer.app__menuArticlesText ||
					"Articles"
			case "marathons_tab":
				return config.tabBarTitles["marathon"] ||
					influencer.app__menuMarathonText ||
					"Challenges"
			case "nutrition_tab":
				return config.tabBarTitles["nutrition"] ||
					influencer.app__menuNutritionText ||
					"Nutrition"
			case "offers_tab":
				return config.tabBarTitles["offers"] ||
					influencer.app__menuOffersText ||
					"Offers"
			default:
				return route.params.title
		}
	}

	getTabIcon = (iconName, focused)=>{
		const { influencer } = this.props;
		const route = this.props.navigation.state;

		let faName = null;
		let ionName = null;
		switch (route.key) {
			case "courses_tab":
				if(influencer.app__menuCoursesFaIcon){
					faName = influencer.app__menuCoursesFaIcon
				}
				break;
			case "chats_tab":
				if(influencer.app__menuChatsFaIcon){
					faName = influencer.app__menuChatsFaIcon
				}
				// faName = influencer.app__menuChatsFaIcon
				break;
			case "articles_tab":
				if(influencer.app__menuArticlesFaIcon){
					faName = influencer.app__menuArticlesFaIcon
				}
				// faName = influencer.app__menuArticlesFaIcon
				break;
			case "marathons_tab":
				if(influencer.app__menuMarathonsFaIcon){
					faName = influencer.app__menuMarathonsFaIcon
				}
				// faName = influencer.app__menuMarathonsFaIcon
				break;
			case "nutrition_tab":
				if(influencer.app__menuNutritionFaIcon){
					faName = influencer.app__menuNutritionFaIcon
				}
				// faName = influencer.app__menuNutritionFaIcon
				break;
			case "offers_tab":
				if(influencer.app__menuOffersFaIcon){
					faName = influencer.app__menuOffersFaIcon
				}
				// faName = influencer.app__menuOffersFaIcon
				break;
		}

		if(!faName && iconName){
			faName = iconName;
		}
		if(faName && faName.indexOf("ion-")!==-1){
			ionName = faName;
		}
		


		if(ionName){
			return <Ionicons
				transition="fontSize"
				style={ focused ? styles['top-bar-icon__tab-icon-active'] : styles['top-bar-icon__tab-icon'] }
				name={ionName.replace("ion-","")}
				// name="chatbox-outline"
			/>
		}

		return <FontAwesome
			transition="fontSize"
			style={ focused ? styles['top-bar-icon__tab-icon-active'] : styles['top-bar-icon__tab-icon'] }
			name={ faName }
		/>
	}

	render() {
		const { active, notifications = 0, rectangleBorder = false, focused, iconName, t, ...rest } = this.props;
		console.log(`${iconName} ${focused}`);
		
		// if(this.ripple){
			// console.log("this.ripple => ",this.ripple);
			// this.ripple.startRipple();
		// }

		return (
			
				<View style={styles["top-bar-icon"]}>
					{this.getTabIcon(iconName, focused)}
					
					<Text
						transition="fontSize"
						style={ focused ? styles['top-bar-icon__tab-text-active'] : styles['top-bar-icon__tab-text'] }>
						{t(`${this.getTabTitle()}`)}
					</Text>
					{ !!notifications && <View
						style={ focused ? styles['top-bar-icon__tab-icon-active'] : styles['top-bar-icon__tab-icon-active'] }>{ notifications }</View> }

				</View>
			
		);
	}
}

export const ChatIcon = ({ ...rest }) => <TapBarIcon {...rest} />;

export default compose(
	withNamespaces(["app_nutrition", "app_marathon", "app_articles", "chats", "courses"], { wait: true }),
	connect(({ influencer }) => ({ influencer }))
)(TapBarIcon);
