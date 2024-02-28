import React, {Fragment} from "react"
import Logic from "../logic"

const ReadMore = ({getReadMoreContent}) => {
	return (
		<Fragment>
			{getReadMoreContent()}
		</Fragment>
	)
}

export default Logic(ReadMore)
