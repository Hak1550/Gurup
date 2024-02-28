import React, { Fragment } from "react"
import Skeleton from "react-loading-skeleton"

import Logic from "../logic";

import { TagsList, Tag, SkeletonTag, More } from '../styles';



const Tags = ({ tags, t, loading, menuKcal, fit, showTags, visibleTags }) => {
	let tagsArray = tags || [];

	if (menuKcal) {
		tagsArray.unshift({
			name: menuKcal + ' ' + t('kcal'),
			_id: menuKcal
		})
	}

	if (tagsArray.length <= 2) {
		fit = false;
	}

	return (
		<Fragment>
			{
				!loading
					? (fit && !visibleTags)
						? (
							<TagsList fit>
								<Tag>{tagsArray[0].name}</Tag>
								<Tag>{tagsArray[1].name}</Tag>
								<More moreButton onClick={showTags}>...</More>
							</TagsList>
						)
						: (tagsArray.length !== 0)
							? (
								<TagsList>
									{tagsArray.map(tag => (
										<Tag key={tag._id}>{tag.name}</Tag>
									))}
								</TagsList>
							)
							: null
					: (
						<TagsList>
							<SkeletonTag><Skeleton height="28px" width="75px" /></SkeletonTag>
							<SkeletonTag><Skeleton height="28px" width="75px" /></SkeletonTag>
							<SkeletonTag><Skeleton height="28px" width="75px" /></SkeletonTag>
						</TagsList>
					)
			}
		</Fragment>
	)
}

export default Logic(Tags)
