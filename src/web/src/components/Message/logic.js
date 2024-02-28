import React, { Fragment } from "react"
import { connect } from "react-redux"
import { ReadMoreButton,  TextContent, ReadMoreContainer} from "./styles"

export default WrappedComponent => {
	class Logic extends React.Component {

		attachmentOnClick = (attachment) => {
			let {dispatch, message} = this.props
			dispatch({
				type: "LIGHTBOX",
				data: {image: attachment.src, images: message.attachments.filter(a=>a.type === "image").map(a=>a.src)}
			})
		}

		render() {
			return <WrappedComponent attachmentOnClick={this.attachmentOnClick} {...this.props} />
		}
	}
	return connect(null)(Logic)
}
