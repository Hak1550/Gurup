import React from 'react'
import { View, ScrollView, Text } from 'react-native'
import MainLayout from '../../../components/MainLayout'
import styles from '../styles'
import Button from '../../../components/Button'
import Article from '../../../components/ArticleLayout'
import { Actions } from 'react-native-router-flux'
import Preloader from '../../../components/Preloader'
import Logic from '../logic'
import moment from 'moment'

const BuyMarathon = ({ _buyCourse, marathon, loading, pi, t }) => {
	const marathonArticleBlock = [
		{ type: 'image', data: marathon.img },
		{ type: 'text', data: marathon.description },
		// { type: 'text', data: marathon.fullDescription },
	]
	const renderButton = () => {
		// const {lastEntryDate} = marathon;
		// console.log("pi ",pi)
		// console.log("LAST ENTRY", marathon.lastEntryDate);
		if (!pi && moment().isAfter(moment(marathon.lastEntryDate))) {
			return (
				<Text>
					{t('app_courses:marathon_late_entry')}{' '}
					{moment(marathon.lastEntryDate).format('DD MMM YYYY')}
				</Text>
			)
		} else if (!pi && moment().isBefore(moment(marathon.startDate))) {
			return(
				<Text>
					{'Игра начинается '}
					{moment(marathon.startDate).add(1,'days').format('DD MMM YYYY')}
				</Text>
			)
		} else if(pi){
			return (
				<Button
					title={
						marathon.allowed
							? "Начать"
							: t(['app_courses:buy_course_button'])
					}
					theme="accent"
					onPress={() =>
						_buyCourse().then(() => {
							// console.error("BUY COURSE");
							Actions.replace('marathonMain', {
								_id: marathon._id,
							})
						})
					}
				/>
			)
		}
	}
	return (
		<MainLayout screenTitle={marathon && marathon.title ? marathon.title : ''} getAvatar={false}>
			{loading && <Preloader />}
			{!loading && (
				<ScrollView>
					<View style={styles['buy-marathon']}>
						{marathonArticleBlock.map(block => (
							<Article block={block} />
						))}
						<View style={styles['buy-marathon__button']}>
							{renderButton()}
						</View>
					</View>
				</ScrollView>
			)}
		</MainLayout>
	)
}

export default Logic(BuyMarathon)
