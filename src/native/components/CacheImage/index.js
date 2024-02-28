import React, { Fragment } from "react"
import FastImage from "react-native-fast-image"
import Preloader from "../Preloader/core"
import { View, Image } from "react-native"
class CacheImage extends React.Component {
	
	constructor(props){
		super(props);
		this.state = {
			imageLoaded: false,
			width: 0,
			height: 0
		}
		if (props.auto) {
			Image.getSize(props.source, (width, height) => {
				this.setState({
					width: width, 
					height: height,
					imageLoaded: true
				}); 
			}, (e) => {
				// console.log("Error getting image size", e);
				this.setState({
					imageLoaded: true
				});
			});
		} else {
			// console.log("Image loaded?");
			this.state = { imageLoaded: true};
			// this.setState({imageLoaded: true});
		}
	}
	
	// componentWillMount() {
	// 	if (this.props.auto) {
	// 		Image.getSize(this.props.source, (width, height) => {
	// 			this.setState({ width: width, height: height, imageLoaded: true });
	// 		});
	// 	} else {
	// 		this.setState({imageLoaded: true})
	// 	}
	// }
	 
	render() {
		const { source, resizeMode = "cover", auto=false } = this.props
		let { style } = this.props
		let {imageLoaded} = this.state
		// console.log("Image loaded???", imageLoaded);
		// console.log("Image loaded", imageLoaded, source);
		// return null;
		let combinedStyles = [
			style,
			...(
				auto 
				&& imageLoaded 
				&& this.state.width 
				&& this.state.height
					? [{ aspectRatio: this.state.width / this.state.height }] 
					: []
			)
		];
		if (source && source.length) {
			return (
				<Fragment>
					{this.state.imageLoaded ? (
						<FastImage
							style={combinedStyles}
							source={{
								uri: source,
								priority: FastImage.priority.normal,
								cache: FastImage.cacheControl.immutable,
							}}
							onLoad={(e) => {
								this.setState({
									width: e.nativeEvent.width,
									height: e.nativeEvent.height
								})
							}}
							onLoadEnd={e => {
								this.setState({
									imageLoaded: true,
								})
							}}
							children={this.props.children}
							resizeMode={FastImage.resizeMode[resizeMode ? resizeMode : 'cover']}
						/>
					) : (
						<View style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}>
							<Preloader />
						</View>
					)}
				</Fragment>
			)
		} else {
			// return <Image style={style} source={require("../../assets/core/placeholder.png")} />
			return (
				<FastImage
					style={style}
					source={require('../../assets/core/placeholder.png')}
					resizeMode={FastImage.resizeMode.cover}
					children={this.props.children}
				/>
			)
		}
	}
}

export default CacheImage
