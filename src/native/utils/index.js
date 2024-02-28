import { Dimensions, Platform, NativeModules } from 'react-native';
import * as Permissions from "expo-permissions";
import {registerPushToken} from "../../actions/sign";
import OneSignal from 'react-native-onesignal'
import * as Segment from 'expo-analytics-segment';
import i18n from 'i18next';
import store from '../../store/storeNative'
// import 'intl';
// import 'intl/locale-data/jsonp/en'; 
// import 'intl/locale-data/jsonp/ru'; 
// import 'intl/locale-data/jsonp/pl';

import getSymbolFromCurrency from 'currency-symbol-map'
import {exp} from "react-native-reanimated";
import qs from "qs";

import {manifest} from 'expo-updates';
const { id, sdkVersion, revisionId, releaseChannel } = manifest;
import * as Device from 'expo-device';
const {manufacturer,brand, modelName,modelId, deviceYearClass, totalMemory,osName,osVersion } = Device;
import {Actions} from "react-native-router-flux";


export const getDeviceData = () => {
	return {
		device: { manufacturer,brand, modelName,modelId, deviceYearClass, totalMemory,osName,osVersion },
		expoData: {id, sdkVersion, revisionId, releaseChannel}
	}
}
export const setIsCustomApp = async () => {
	const WhiteLabelConfig = await NativeModules.WhiteLabel.getConfig();
	const isCustomApp = !!WhiteLabelConfig?.influencerId
	const { dispatch } = store
	dispatch({
		type: "SET_IS_CUSTOM",
		isCustomApp
	})
	return isCustomApp
}
export const identify = (user)=>{
	// console.log("identify ....",user._id);
	// console.log("Segment ",Segment.identifyWithTraits);
	Segment.identifyWithTraits(user._id, {...user, password:null})
}

export const isEmpty = (obj) => {
	return Object.keys(obj).length === 0;
}

export const formatSecondsAsTimer = (time_in_seconds = 0) => {
	let minutes = 0;
	let seconds = 0;
	if (time_in_seconds >= 60) {
		seconds = time_in_seconds % 60
		minutes = (time_in_seconds - seconds) / 60
	} else {
		seconds = time_in_seconds;
	}
	const formattedMinutes = minutes >= 10 ? minutes : `0${minutes}`;
	const formattedSeconds = seconds >= 10 ? seconds : `0${seconds}`;
	return `${formattedMinutes}:${formattedSeconds}`
}

export const initPushToken = (influencer, dispatch)=>{
	if(!influencer || !dispatch){
		// console.log("BAD PARAMS IN initPushToken ",influencer);
		return;
	}
	let { onesignalAppId } = influencer;
	if (!onesignalAppId) {
		onesignalAppId = 'cafecf95-abde-48ba-9eae-bb07b92b0797'
	}
	OneSignal.init(onesignalAppId)
	OneSignal.inFocusDisplaying(0)
	OneSignal.addEventListener('ids', (device) => {
		// console.log("got push ID ")
		// console.log("device ", device);
		dispatch({ type: 'SET_PUSH_TOKEN', pushToken: device.userId })
		try {
			dispatch(registerPushToken(device.userId))
		} catch (e) {
			console.log("couldn't send token ", e)
		}
	})
	// OneSignal.configure()
	// console.log("push notifications configured");
}



export const isIphoneX = () => {
	let d = Dimensions.get('window');
	const {height, width} = d;
	return (
	  // This has to be iOS duh
	  Platform.OS === 'ios' &&

	  // Accounting for the height in either orientation
	  (height === 812 || width === 812)
	);
};

export const getNotificationToken = async () => new Promise(async (resolve, reject) => {
    const {status: existingStatus} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        reject(finalStatus);
    }

    let token = await Notifications.getExpoPushTokenAsync().catch((err) =>{
        console.log("CANNOT CONNECT WITH token provider", err);
    });
    resolve(token);
});

export const isTall = () => {
	let d = Dimensions.get('window');
	const {height} = d;
	return (height >= 688)
};

export const Screen320 = () => {
	let d = Dimensions.get('window');
	const {width, height} = d
	return !(width >= 375 && height >= 668)
}

export const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export const formatPrice = ({ currency, price }) => {
	const locale = i18n.language;
	let currencySymbol = getSymbolFromCurrency(currency);
	if (currencySymbol === "$" && currency !== "USD"){
		currencySymbol = currency;
	}
	if(currencySymbol==="$"){
		return `${currencySymbol}${price}`
	}else{
		return `${price} ${currencySymbol}`
	}
	// return new Intl.NumberFormat(locale, { style: 'currency', currency, minimumFractionDigits: 0 }).format(price);
}

export const addDollarSignToColors = (colorsTemplate) => {
	let themeWithDollarSigns = {
		theme: colorsTemplate.theme,
		colors: {}
	}
	for (const colorName in colorsTemplate.colors) {
		if(colorsTemplate.colors.hasOwnProperty(colorName)){
			themeWithDollarSigns.colors["$" + colorName] = colorsTemplate.colors[colorName];
		}
	}
	return themeWithDollarSigns
}

export const getSearchParams = (url) => {
	// console.log("getSearchParams", url.match(/\?.*/));
	const match = url.match(/\?.*/);
	if(match && match.length){
		const search_query = match[0].replace("?",'');
		return qs.parse(search_query);
	} else {
		return {}
	}
}

export const getCourseList = ({chapters = [], exercises = [], courseProgress = {}}) => {
	// Sort exercises in right order
	exercises = exercises.sort((a, b) => a.sort - b.sort);

	//exercises map for easier matching between objects
	let exercisesMap = {};
	for (const exercise of exercises) {
		exercisesMap[exercise._id] = exercise;

		// add complete flag to exercise in map
		if(courseProgress[exercise._id] && courseProgress[exercise._id].complete){
			exercisesMap[exercise._id].complete = true;
		}	
	}

	// Set complete and allowed fields for exercises in chapters and add chapter field to exercisesMap items
	for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
		chapters[chapterIndex].completeExercises = 0;
		chapters[chapterIndex].allowed = false;
		chapters[chapterIndex].complete = false;
		if(chapters[chapterIndex].exercises && chapters[chapterIndex].exercises.length){
			for (let chapterExerciseIndex = 0; chapterExerciseIndex < chapters[chapterIndex].exercises.length; chapterExerciseIndex++){
				chapters[chapterIndex].exercises[chapterExerciseIndex].allowed = false;
				const exercise_id = chapters[chapterIndex].exercises[chapterExerciseIndex]._id;

				// set chapter to help identify in which chapter this exercise in exerciseMap
				if(exercisesMap[exercise_id] && chapters[chapterIndex] && chapters[chapterIndex]._id){
					exercisesMap[exercise_id].chapter = chapters[chapterIndex]._id;
				}

				// allow chapter if there is at least one allowed exercise inside
				// there are no information about exercise access inside chapter exercise
				// need to find matching exercise in exerciseMap
				if(exercisesMap[exercise_id] && exercisesMap[exercise_id].allowed){
					chapters[chapterIndex].allowed = true;
					chapters[chapterIndex].exercises[chapterExerciseIndex].allowed = true;
				}

				// add complete flag to exercise inside chapter				
				if(courseProgress[exercise_id] && courseProgress[exercise_id].complete) {
					chapters[chapterIndex].completeExercises++;
					chapters[chapterIndex].exercises[chapterExerciseIndex].complete = true;
				}
			}
			if(chapters[chapterIndex].completeExercises === chapters[chapterIndex].exercises.length){
				chapters[chapterIndex].complete = true;
			}
		}
	}

	//chapters map for easier matching between objects
	let chaptersMap = {};
	for (const chapter of chapters) {
		chaptersMap[chapter._id] = chapter;
	}

	let courseList = [];
	for (const exercise_id in exercisesMap) {
		if(!exercisesMap[exercise_id].chapter){
			courseList.push({...exercisesMap[exercise_id]})
		} else if(!courseList.some(({_id}) => _id === exercisesMap[exercise_id].chapter)){
			courseList.push({...chaptersMap[exercisesMap[exercise_id].chapter], type: "chapter"});
		}
	}

	return courseList;
}

export const getCourseProgress = ({purchasedCourses = [], course_id = ""}) => {
	let pc = purchasedCourses.find(pc => pc.course === course_id);
	let exercises_map = {};
	if(pc){
		for (const activeExercise of pc.activeExercises) {
			exercises_map[activeExercise.exerciseId] = activeExercise;
		}
		return exercises_map
	} else {
		return {}
	}
}

export const getNextLessonPath = ({exercise, exercises, course_id, chapter}) => {
	let nextLesson = {} 
	const currentLessonIndex = exercises.findIndex(item => item._id === exercise._id);
	nextLesson = exercises[currentLessonIndex + 1];		

	let exercisesQueue = exercises.sort((a,b) => a.sort - b.sort);
	if(chapter){
		exercisesQueue = chapter.exercises;
	}
	const queueLessonIndex = exercisesQueue.findIndex(item => item._id === exercise._id);
	if(queueLessonIndex + 1 < exercisesQueue.length && nextLesson){
		if(chapter){
			nextLesson = {
				_id: nextLesson._id,
				type: nextLesson.type,
				course_id,
				chapter,
				allowed: nextLesson.allowed
			}
		} else {
			nextLesson = {
				_id: nextLesson._id,
				type: nextLesson.type,
				course_id,
				allowed: nextLesson.allowed
			};
		}
		// console.log("Next lesson", nextLesson.type, exercise.type);
		if (nextLesson.type === "training") {
			return {screen: "trainings", nextLesson};
		} else if (nextLesson.type === "question" || nextLesson.type === "quiz") {
			return {screen: "quiz", nextLesson};
		} else if (nextLesson.type === "exercise" && exercise.type === "exercise") {
			return {screen: "lesson", nextLesson, stay: true};
		} else if(nextLesson.type === "exercise" || !nextLesson.type){
			return {screen: "lesson", nextLesson};
		}
	} else {
		return false
	}
}