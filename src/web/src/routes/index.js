import React from 'react';
import Dashboard from 'containers/Dashboard';
import Main from 'pages/Main'
import Courses from 'pages/Courses';
import Exercise from 'pages/Exercise';
import Quiz from 'pages/Quiz';
import Trainings from 'pages/Trainings';
import Training from 'pages/Training';
import ChallengeExercises from 'pages/ChallengeExercises';
import ChallengeExercise from 'pages/ChallengeExercise';
import Chats from 'pages/Chats';
import Articles from 'pages/Articles';
import Article from 'pages/Article';
import Nutrition from 'pages/Nutrition';
import Settings from 'pages/Settings';
import Recipes from 'pages/Recipes';
import Recipe from 'pages/Recipe';
import Menu from 'pages/Menu';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import ForgotPassword from 'pages/ForgotPassword';
import NotValidated from 'pages/NotValidated';
import Plan from 'pages/Plan';
import Course from 'pages/Course';
import Payment from 'pages/Payment';

export const signRoutes = [
    {path: '/login', component: Login},
    {path: '/signup', component: SignUp},
    {path: '/forgotpassword', component: ForgotPassword},
];

export default [
    ...signRoutes,
    {path: '/', component: Dashboard},
];

export const dashboardRoutes = [
    {path: '/challenges/:course_id/exercises/training/:exercise_id/:training_id', component: Training},
    {path: '/challenges/:course_id/exercises/training/:exercise_id', component: Trainings},
    { path: '/challenges/:course_id/exercises/quiz/:exercise_id', component: Quiz },
    {path: '/challenges/:course_id/exercises/exercise/:exercise_id', component: ChallengeExercise},
    {path: '/challenges/:course_id/exercises/', component: ChallengeExercises},
    {path: '/courses/:course_id/exercises/training/:exercise_id/:training_id', component: Training},
    {path: '/courses/:course_id/exercises/training/:exercise_id', component: Trainings},
    {path: '/settings/:page', component: Settings, ignoreValidate: true},
    {path: '/settings', exact: true, redirect: true, to: "/settings/user", ignoreValidate: true},
    {path: '/courses/:course_id/exercises/quiz/:exercise_id', component: Quiz},
    {path: '/courses/:course_id/exercises/exercise/:exercise_id', component: Exercise},
    { path: '/challenges/:course_id', exact: true, component: Course, publicPage: Course},
    { path: '/courses/:course_id', component: Course, publicPage: Course },
    {path: '/challenges', use: Courses, props: {coursesType: "challenges"}},
    {path: '/courses', use: Courses, props: {coursesType: "courses"}},
    { path: '/plans/:plan_id', component: Plan, publicPage: Plan},
    {path: '/articles/:article_id', component: Article},
    {path: '/articles', component: Articles},
    {path: '/nutrition/menu/:id', component: Menu},
    {path: '/nutrition/recipes/:id', component: Recipe},
    {path: '/nutrition/recipes', component: Recipes},
    {path: '/nutrition', component: Nutrition},
    {path: '/success/:type/:id', component: Payment},
    {path: '/chats/:chat_id', component: Chats},
    {path: '/chats', component: Chats},
    {path: '/not-validated', component: NotValidated, ignoreValidate: true},
    {path: '/', component: Main},
];
