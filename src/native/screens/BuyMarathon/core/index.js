import React, {Fragment} from "react";
import { View, ScrollView,Text } from "react-native";
import MainLayout from "../../../components/MainLayout";
import styles from "../styles";
import Button from "../../../components/Button";
import Article from "../../../components/ArticleLayout";
import { Actions } from "react-native-router-flux";
import Preloader from "../../../components/Preloader";
import Logic from "../logic";
import moment from "moment";
import { config } from '../../../styles/variables';
import CacheImage from '../../../components/CacheImage';

const BuyMarathon = ({ _buyCourse, marathon, loading, t, influencer, pi }) => {
	const marathonArticleBlock = [
		{ type: 'image', data: marathon.img },
		{ type: "text", data: marathon.description },
		{ type: "text", data: marathon.fullDescription }
	]
	const renderButton = () => {
		if(!pi && marathon.lastEntryDate && moment().isAfter(moment(marathon.lastEntryDate))) {
			// console.log("LATE ENTRY");
			return <Text>
				{t('app_courses:marathon_late_entry')}{' '}
				{moment(marathon.lastEntryDate).format('DD MMM YYYY')}
			</Text>;
		}else if( marathon.startDate && moment().isBefore(moment(marathon.startDate) ) ){
			// console.log("BEFORE ",marathon.startDate,"   ",moment().toDate());
			return <Text>{t("app_courses:marathon_starts_on")} {moment(marathon.startDate).format("DD MMM YYYY")}</Text>;
		}else{
			// console.log("OK!!!! ",config.appDomain);
			if(!config.appDomain && !marathon.allowed){
				if(marathon.freeTasks){
					return <Button
						title={t('basic:start_trial_tasks')}
						theme="accent"
						type="default"
						style={{marginLeft:10}}
						onPress={() => _buyCourse().then(() => {
							// console.error("BUY COURSE");
							Actions.replace("marathonMain", {
								_id: marathon._id,
								title: marathon.title
		
							});
						})
						}
					/>
				}else{
					return  <Article block={{
						type: "text",
						data: t("purchase_not_available")
					}} />
				}
				
			}else{
				// console.log("BUY COURSE BUTTON");
				return <Button
					title = {
						marathon.allowed
							?t(["app_courses:start_course_button"])
						: t(["app_courses:buy_course_button"])
					}
					theme='accent'
					onPress={() =>
						_buyCourse().then(() => {
							console.error("BUY COURSE");
							// Actions.replace("marathonMain", {
								// _id: marathon._id,
							// });
						})
					}
				/>
			}
		}
	}
	return (
		<MainLayout getAvatar={false}>
			{loading && <Preloader />}
			{!loading && (
				<ScrollView>
					<View style={styles["buy-marathon"]}>
						{marathonArticleBlock.map( (block,i) => (
							<Article block={block} key={i} />
						))}
						{/* <Article block={{type: "price", data: course.price}}/> */}
						{/*<Article.Image imgUri={course.img}/>*/}
						{/*<Article.Text>{course.description}</Article.Text>*/}
						{/*<Article.Price price={course.price}/>*/}
						{/* {marathon.blocks && marathon.blocks.map((block, key) => {
                            return (<Article key={key} block={block}/>);
						})} */}
						

						{(!marathon.allowed && marathon.price)?(
                            <Fragment>
                                {influencer.coinsEnabled ? (
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: 'Main-Bold', marginRight: 10 }}>{t("basic:price") + ":"}</Text>
                                        <CacheImage source={influencer.coinImage} style={{ width: 20, height: 20, marginRight: 8 }} resizeMode='contain' />
                                        <Text style={{ fontFamily: 'Main-Bold' }}>{marathon.coinPrice}</Text>
                                    </View>
                                ) : null}
                                {!influencer.coinsEnabled && config.appDomain?(
                                    <Article block={{ type: "price", data: marathon.price, currency: marathon.currency }} />
                                ):null}
                            </Fragment>
						):null}
						
						<View style={styles["buy-marathon__button"]}>
							{renderButton()}						
						</View>



					</View>
				</ScrollView>
			)}
		</MainLayout>
	);
};

export default Logic(BuyMarathon);
