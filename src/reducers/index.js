import { combineReducers } from 'redux';
import me from './me';
import welcomeScreen from './welcomeScreen';
import status from './status';
import courses from './courses';
import course from './course';
import purchasedCourses from './purchasedCourses';
import exercises from './exercises';
import exercise from './exercise';
import chats from './chats'
import chat from './chat'
import quiz from './quiz'
import notifications from './notifications'
import plans from './plans';
import plansModal from './plansModal';
import pushToken from './pushToken';
import articles from './articles';
import article from './article';
import isCustomApp from './isCustomApp';
import tags from "./tags";
import influencer from "./influencer";
import marathon from "./marathon";
import marathons from "./marathons";
import nutritionMenus from "./nutritionMenus";
import nutritionRecipes from "./nutritionRecipes";
import nutritionMenu from "./nutritionMenu";
import nutritionRecipe from "./nutritionRecipe";
import animation from "./animation";
import influencerOnline from "./influencerOnline";
import sidebar from "./sidebar";
import modal from "./modal";
import tmp from "./tmp";
import lightbox from "./lightbox";
import plan from "./plan";

export default combineReducers({
    me,
	welcomeScreen,
	status,
	courses,
	course,
	exercise,
	exercises,
	purchasedCourses,
	chats,
	chat,
	quiz,
    notifications,
    plans,
    plansModal,
    pushToken,
	isCustomApp,
    article,
    articles,
	tags,
	influencer,
	marathon,
	marathons,
	nutritionMenus,
	nutritionRecipes,
	nutritionMenu,
	nutritionRecipe,
	animation,
	influencerOnline,
    sidebar,
    modal,
	tmp,
	plan,
    lightbox,
})
