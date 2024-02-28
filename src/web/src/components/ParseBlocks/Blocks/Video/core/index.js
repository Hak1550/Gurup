import React from "react"
import ReactPlayer from "react-player"

function VideoBlock({ url, customProp }) {
	return (
		<ReactPlayer url={url} controls {...customProp} />
	)
}

export default VideoBlock
