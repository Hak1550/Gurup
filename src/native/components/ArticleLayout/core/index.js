import React, { Fragment } from "react"
import { Text, View, StyleSheet, Dimensions, FlatList, Linking, TouchableOpacity, Image } from "react-native"
import styles from "../styles"
import YouTubeVideo from "../../../components/YouTubeVideo"
import VimeoVideo from "../../../components/VimeoVideo"
import WistiaVideo from "../../../components/WistiaVideo"
import VideoTraining from "../../VideoTraining"
import Logic from "../logic"
import Autolink from "react-native-autolink"
import EStyleSheet from "react-native-extended-stylesheet"
import getRNDraftJSBlocks from "react-native-draftjs-render"
import CacheImage from "../../CacheImage"
import Carousel from "react-native-snap-carousel"
import Accordion from "../../../components/Accordion"
import Advantage from "../../Advantage"
import StyledButton from "../../Button/core"
import FontAwesome from "react-native-vector-icons/FontAwesome"
// import AudioPlayer from "../../AudioPlayer"
import AudioPlayer from "../../NewAudioPlayer";
import ErrorBoundary from "../../../components/ErrorBoundary";


import { Actions } from "react-native-router-flux"

const { width } = Dimensions.get("window")

const ArticleLayout = ({ children }) => {
	return <View style={styles["layout-articles"]}>{children}</View>
}

const Article = ({ block, setGalleryIndex, inArticle = true, goToInternalLink, state }) => {
	if (block && block.meta_data) {
	} else if (!block || !block.type || block.length || !block.data) {

		return null
	}
	let blockToRender;
	switch (block.type.toLowerCase()) {
		case "image":
			blockToRender = <CacheImage style={styles["layout-articles__image"]} source={block.data} auto resizeMode="contain"/>
			break;
		case "text":
			blockToRender = (
				<Autolink
					style={styles["layout-articles__text"]}
					linkStyle={{ color: EStyleSheet.value("$accent"), textDecorationLine: "underline" }}
					text={block.data}
				/>
			)
			break;

		case "youtube":
			blockToRender = <YouTubeVideo host={"youtube"} videoID={block.data} />
			break;

		case "vimeo":
			blockToRender = <VimeoVideo host={"vimeo"} videoID={block.data} />
			break;

		case "subtitle":
			blockToRender = <Text style={styles["layout-articles__subtitle"]}>{block.data}</Text>
			break;
		// LanguageFixNeeded Fixed
		case "price":
			blockToRender = (
				<Text style={styles["layout-articles__price"]}>
					{block.data ? `${block.data} ${block.currency ? block.currency : "руб."}` : t("app_basic:free")}
				</Text>
			)
			break;

		case "video-training":
			blockToRender = (
				<View>
					<Text style={styles["layout-articles__video-training__title"]}>{block.data}</Text>
					<VideoTraining />
				</View>
			)
			break;

		case "video": {
			if(block.status !== "done") {
				blockToRender = null
				break
			}
			// const block = {
			// 	"status": "done",
			// 	"type": "video",
			// 	"updatedAt": "2020-05-24T16:48:59.647Z",
			// 	"__v": 0,
			// 	"data": "https://hb.bizmrg.com/gurucan-new/dd615eb5-5977-4b12-9d75-20d860b5afc98032aae5-22c4-41a6-953a-dac78a49e75c661930da-250c-4e31-ac34-8e8b3c2fb2d01f379914-28c1-44c6-9c50-733c8432f020.mp4",
			// 	"meta_data": {
			// 		"progress": {
			// 			"createdAt": 1590338838324
			// 		},
			// 		"qualities": [
			// 			"default",
			// 			"1080",
			// 			"720",
			// 			"480"
			// 		],
			// 		"cdnUrl": "https://hb.bizmrg.com/gurucan-new/",
			// 		"file_id": "dd615eb5-5977-4b12-9d75-20d860b5afc98032aae5-22c4-41a6-953a-dac78a49e75c661930da-250c-4e31-ac34-8e8b3c2fb2d01f379914-28c1-44c6-9c50-733c8432f020",
			// 		"format": "mp4"
			// 	}
			// }
			let qualities = [];
			let thumbnail = state.videoThumbnail;
			// console.log("BLOCK QUALITIES", block.qualities);
			if(block.qualities && block.qualities.length){
				block.qualities.forEach((quality) => {
					if (quality.res !== "default") {
						qualities.push({
							res: `${quality.res}p`,
							src: quality.src
						})
					}
				})
			}
			if (block.meta_data && block.meta_data.thumbnail){
				thumbnail = block.meta_data.thumbnail
			}

			// console.log("THUMBNAIL", thumbnail)
			blockToRender = (
				<View style={styles["layout-articles__video"]}>
					<CacheImage
						style={styles["layout-articles__video-thumbmnail"]}
						source={thumbnail}
						resizeMode="contain"
					/>
					<TouchableOpacity
						style={styles['layout-articles__video-play']}
						onPress={() => Actions.fullscreenVideo({
							meta_data: block.meta_data,
							qualities,
							url: block.data
						})}
					>
						<FontAwesome name={"play"} style={styles['layout-articles__play-icon']} />
					</TouchableOpacity>
				</View>
			)
			break;
		}
		
		case "richtext":
			// console.log("block.meta_data => ",block.meta_data);
			if (block && block.meta_data) {
				// return null;
				let djBlocks = null;
				try{
					djBlocks = getRNDraftJSBlocks({
						contentState: block.meta_data,
						atomicHandler:()=>{
							return null;
						},
						customStyles: StyleSheet.flatten({
							italic: styles["rich__italic"],
							bold: styles["rich__bold"],
							paragraph: styles["rich__paragraph"],
							unstyled: styles["rich__unstyled"],
							blockquote: styles["rich__blockquote"],
							"header-one": styles["rich__header-one"],
							"header-two": styles["rich__header-two"],
							"header-three": styles["rich__header-three"],
							"header-four": styles["rich__header-four"],
							"ordered-list-item": styles["rich__ordered-list-item"],
							orderedListItemContainer: styles["rich__ordered-list-item__container"],
							orderedListItemNumber: styles["rich__ordered-list-item__number"],
							"unordered-list-item": styles["rich__unordered-list-item"],
							unorderedListItemContainer: styles["rich__unordered-list-item__container"],
							unorderedListItemBullet: styles["rich__unordered-list-item__bullet"],
						}),
					})
				}catch(e){
					console.log("Error in draft.js ",e);
				}
				// console.log("djBlocks => ",djBlocks);
				blockToRender = (
					<View style={styles["rich__wrap"]}>
						<ErrorBoundary>
							{djBlocks}
						</ErrorBoundary>
					</View>
				)
			}
			break;

		case "gallery": {
			blockToRender = (
				<>
					<Carousel
						data={block.data}
						itemWidth={width - 40}
						sliderWidth={width}
						inactiveSlideScale={0.95}
						inactiveSlideOpacity={1}
						windowSize={1}
						contentContainerCustomStyle={{ justifyContent: "center", alignItems: "center" }}
						onSnapToItem={index => setGalleryIndex(index)}
						renderItem={({ item }) => {
							if (
								item[item.length - 1] === "4" &&
								item[item.length - 2] === "p" &&
								item[item.length - 3] === "m"
							) {
								return (
									<View>
										<VideoTraining url={item} />
									</View>
								)
							} else {
								return <CacheImage style={styles["layout-articles__image"]} source={item} auto={true} />
							}
						}}
					/>
					<View style={styles["layout-articles__gallery-pagination"]}>
						<Text style={styles["layout-articles__gallery-pagination__text"]}>
							{state.galleryItemIndex + 1}/{block.data.length}
						</Text>
					</View>
				</>
			)
			break;

		}
		case "quotes": {
			blockToRender = (
				<View style={styles["article__quotes"]}>
					{block.data.map((quote) => {
						let djBlocks = getRNDraftJSBlocks({
							contentState: quote.text,
							atomicHandler: () => {
								return null;
							},
							customStyles: StyleSheet.flatten({
								italic: styles["rich__italic"],
								bold: styles["rich__bold"],
								paragraph: styles["rich__paragraph"],
								unstyled: styles["rich__unstyled"],
								blockquote: styles["rich__blockquote"],
								"header-one": styles["rich__header-one"],
								"header-two": styles["rich__header-two"],
								"header-three": styles["rich__header-three"],
								"header-four": styles["rich__header-four"],
								"ordered-list-item": styles["rich__ordered-list-item"],
								orderedListItemContainer: styles["rich__ordered-list-item__container"],
								orderedListItemNumber: styles["rich__ordered-list-item__number"],
								"unordered-list-item": styles["rich__unordered-list-item"],
								unorderedListItemContainer: styles["rich__unordered-list-item__container"],
								unorderedListItemBullet: styles["rich__unordered-list-item__bullet"],
							}),
						})
						return (
							<View style={styles["layout-articles__quote"]}>
								<View style={styles["layout-articles__quote-wrap"]}>
									{quote.photo ? (
										<CacheImage style={styles["layout-articles__quote-image"]} source={quote.photo} />
									) : (
											null
										)}
									<Text style={styles["layout-articles__quote-author"]}>{quote.author}</Text>
								</View>
								<View style={styles["layout-articles__quote-text"]}>{djBlocks}</View>
							</View>
						)
					})}
				</View>
			)
			break;

		}
		case "faq": {
			blockToRender = <Accordion data={block.data} />
			break;

		}
		case "advantages": {
			blockToRender = (
				<View style={styles["article__advantages"]}>
					<FlatList
						data={block.data}
						style={styles["articles"]}
						keyExtractor={advantage => advantage.photo}
						renderItem={({ item }) => <Advantage data={item} />}
					/>
				</View>
			)
			break;

		}
		case "button": {
			blockToRender = (
				<View style={styles["layout-articles__button"]}>
					<StyledButton
						theme={"accent"}
						title={block.meta_data.text}
						onPress={() => {
							// console.log("Button meta",block.meta_data);
							if(block.meta_data) {
								if (block.meta_data.link) {
									try {
										Linking.openURL(block.meta_data.link)
									} catch (e) {
										console.log(e)
									}
								} else if (block.meta_data.useInternal){
									goToInternalLink(block.meta_data.internalLink);
								}
							}
						}}
					/>
				</View>
			)
			break;

		}
		case "download": {
			blockToRender = Array.isArray(block.data) ? block.data.map( file => (
				<TouchableOpacity
					style={styles["layout-articles__download"]}
					onPress={() => {
						Linking.openURL(file.src)
					}}>
					<View style={styles["layout-articles__download__circle"]}>
						<FontAwesome
							style={[styles["layout-articles__download__circle-icon"], { fontSize: 18 }]}
							name={"download"}
						/>
					</View>
					<Text style={styles["layout-articles__download__filename"]}>{file.name}</Text>
				</TouchableOpacity>
			)) : (
				<TouchableOpacity
					style={styles["layout-articles__download"]}
					onPress={() => {

						Linking.openURL(block.data.src)
					}}>
					<View style={styles["layout-articles__download__circle"]}>
						<FontAwesome
							style={[styles["layout-articles__download__circle-icon"], { fontSize: 18 }]}
							name={"download"}
						/>
					</View>
					<Text style={styles["layout-articles__download__filename"]}>{block.data.name}</Text>
				</TouchableOpacity>
			)
			break;
		}
		case "audio": {
			blockToRender = (
				<View style={{ paddingHorizontal: 16 }}>
					<AudioPlayer source={block.data.src} />
				</View>
			)
			break;
		}
		case "wistia":
			blockToRender = <WistiaVideo videoID={block.data} />
			break;
		default: {
			blockToRender = null;
		}
	}
	const Wrap = inArticle ? ArticleLayout : View
	return (
		<Wrap>
			{blockToRender}
		</Wrap>
	)
}

export default Logic(Article)
