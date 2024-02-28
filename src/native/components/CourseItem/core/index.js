import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import PropTypes from 'prop-types'
import styles from "../styles"
import NStatusbar from "../../Statusbar"
import Logic from "../logic"
import CacheImage from '../../CacheImage'
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ItemSummary from "../../ItemSummary";
import {formatPrice} from "../../../utils";
import Touchable from '../../Touchable'

const CourseItem = ({
	goToCourse,
	type = 'course',
	courseProgress = 0,
	onPress,
	purchasedCourse = false,
	t,
	course,
	displayType="default",
	...rest
}) => {
	const { _id, title, badge, description, img, price, currency, exercises, attachedOffers} = course;
	const renderPrice = () => {
		if(price){
			return formatPrice({ price, currency })
		} else if (attachedOffers && attachedOffers.length >= 1) {
			return t("app_basic:available_with_offers")
		}
		// else if (attachedOffers && attachedOffers.length === 1 && attachedOffers[0].price !== 0){
		// 	return formatPrice({ price: attachedOffers[0].price, currency: attachedOffers[0].currency });
		// }
		else {
			return t("app_basic:free")
		}
	}
	// console.log("COURSE ITEM", course);
	if (purchasedCourse) {
		//NEW Display type
		if(displayType=="long"){
			return (
				<View style={styles['courseitem-long-wrapper']}>
					<Touchable
						activeOpacity={0.9}
						style={styles['courseitem-long']}
						onPress={() => onPress ? onPress() : goToCourse(type, _id)}
					>
						<CacheImage
							style={styles['courseitem-long__image']}
							source={img}
						/>

						<View style={styles['coursesitem-long__content']}>
							<ItemSummary summary={[
								{
									text: `${course.exercises.length} ${t("app_basic:lessons")}`,
									icon: "file-text-o"
								},
								{
									text: "",
								},
							]} textStyle={styles['coursesitem-long__content-info-text']} style={styles['coursesitem-long__content-info']}/>
							<Text style={styles['courseitem-long__content-title']}>{title}</Text>
							<Text style={styles['courseitem-long__content-text']}>{description}</Text>
							<View style={styles['courseitem-long__content-statusbar']}>
								<NStatusbar style={styles['courseitem-long__content-statusbar-bar']} to={courseProgress} />
							</View> 
						</View>
					</Touchable>
				</View>
			);
		}else{
			return (
				<View style={styles['courseitem-wrapper']}>
					<Touchable
						activeOpacity={0.9}
						style={styles['courseitem']}
						onPress={() => onPress ? onPress() : goToCourse(type, _id)}>
						<CacheImage
							style={styles['courseitem__image']}
							source={img}
						/>
						<View style={styles['courseitem__overlay']}/>
						<View style={styles['coursesitem__content']}>
							<ItemSummary summary={[
								// {
								// 	text: moment.duration(5, "hours").format("h _", {
								// 		precision: 1,
								// 	}),
								// 	icon: "clock-o"
								// },
								{
									text: `${course.exercises.length} ${t("app_basic:lessons")}`,
									icon: "file-text-o"
								},
								{
									text: "",
								},
							]} style={styles['coursesitem__content-info']}/>
							<Text style={styles['courseitem__content-title']}>{title}</Text>
							<Text style={styles['courseitem__content-text']}>{description}</Text>
							<View style={styles['courseitem__content-statusbar']}>
								<NStatusbar to={courseProgress} />
							</View> 
						</View>
					</Touchable>
				</View>
			);
		}
	} else {
		//TODO: Закончить форматирование времени и перевод множественного числа уроков.


		if(displayType=="long"){
			return (
				<View style={styles['courseitem-long-wrapper']}>
					<Touchable 
						activeOpacity={0.9}
						style={styles['courseitem-long']}
						onPress={() => onPress ? onPress() : goToCourse(`buy_${type}`, _id)}>
						<CacheImage style={styles['courseitem-long__image']} source={img} />
						<View style={styles['coursesitem-long__content']}>
							<ItemSummary summary={[
								// {
								// 	text: moment.duration(5, "hours").format("h _", {
								// 		precision: 1,
								// 	}),
								// 	icon: "clock-o"
								// },
								{
									text: `${course.exercises.length} ${t("app_basic:lessons")}`,
									icon: "file-text-o"
								},
								{
									text: !course.allowed && renderPrice(),
								},
							]} textStyle={styles['coursesitem-long__content-info-text']} style={styles['coursesitem-long__content-info']}/>
							<Text style={styles['courseitem-long__content-title']}>{title}</Text>
							<Text style={styles['courseitem-long__content-text']}>{description}</Text>
						</View>
						{badge && badge.text && (
							<View style={styles['courseitem-long__content-badge']}>
								<Text style={styles['courseitem-long__content-badge-text']}>{badge.text.toUpperCase()}</Text>
							</View>
						)}
					</Touchable>
				</View>
			);
		}else{
			return (
				<View style={styles['courseitem-wrapper']}>
					<Touchable 
						activeOpacity={0.9}
						style={styles['courseitem']}
						onPress={() => onPress ? onPress() : goToCourse(`buy_${type}`, _id)}>
						<CacheImage style={styles['courseitem__image']} source={img} />
						<View style={styles['courseitem__overlay']} />
						<View style={styles['coursesitem__content']}>
							<ItemSummary summary={[
								// {
								// 	text: moment.duration(5, "hours").format("h _", {
								// 		precision: 1,
								// 	}),
								// 	icon: "clock-o"
								// },
								{
									text: `${course.exercises.length} ${t("app_basic:lessons")}`,
									icon: "file-text-o"
								},
								{
									text: !course.allowed && renderPrice(),
								},
							]} style={styles['coursesitem__content-info']}/>
							<Text style={styles['courseitem__content-title']}>{title}</Text>
							<Text style={styles['courseitem__content-text']}>{description}</Text>
						</View>
						{badge && badge.text && (
							<View style={styles['courseitem__content-badge']}>
								<Text style={styles['courseitem__content-badge-text']}>{badge.text.toUpperCase()}</Text>
							</View>
						)}
					</Touchable>
				</View>
			);
		}
	}
};

CourseItem.propTypes = {
	onPress: PropTypes.func
}

export default Logic(CourseItem)
