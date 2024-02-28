import React, { Fragment } from "react"
import { connect } from "react-redux"
import { ReadMoreButton,  TextContent, ReadMoreContainer} from "./styles"

export default WrappedComponent => {
	class Logic extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				charLimit: 400,
			}
		}
		getReadMoreContent = content => {
			const { children, ContentComponent } = this.props
			const { charLimit } = this.state
			if (children.length > charLimit) {
				return (
					<ReadMoreContainer>
						<TextContent>{children.substr(0, charLimit)}...</TextContent>
						<ReadMoreButton onClick={() => this.readMore()}>Подробнее</ReadMoreButton>
					</ReadMoreContainer>
				)
			} else if (children.length <= charLimit) {
				return <TextContent>{children}</TextContent>
			}
		}

		readMore = () => {
			const {children} = this.props
			this.setState({ charLimit: children.length })
		}
		render() {
			return <WrappedComponent getReadMoreContent={this.getReadMoreContent} {...this.props} />
		}
	}
	return connect(null)(Logic)
}
