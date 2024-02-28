import React from "react"
import PropTypes from "prop-types"
import {
	SchoolBanner,
	SchoolDescriptionGrid,
	SchoolDescriptionContent,
	SchoolDescriptionSocials,
	SchoolDescriptionTitle,
	SchoolDescriptionLogo,
	LinkSocial,
	LinkSocialIcon
} from "./styles"

const SchoolDescription = ({ banner, links={socials:{}}, children }) => {
	let { socials } = links
	return (
		<div>
			{banner && <SchoolBanner src={banner} />}
			<SchoolDescriptionGrid>
				<SchoolDescriptionContent>{children}</SchoolDescriptionContent>
				{socials?(
					<SchoolDescriptionSocials>
						<SchoolDescriptionTitle>Ссылки</SchoolDescriptionTitle>
						{Object.keys(socials).map(social => {
							if(socials[social] && socials[social].length){
								return <SocialLink key={socials[social]} name={social} link={socials[social]} />
							}
						})}
					</SchoolDescriptionSocials>
				):null}
			</SchoolDescriptionGrid>
		</div>
	)
}

SchoolDescription.Logo = (props) => {
	return <SchoolDescriptionLogo src={props.src}/>
}

SchoolDescription.Title = (props) => {
	return <SchoolDescriptionTitle>{props.children}</SchoolDescriptionTitle>
}

const SocialLink = ({ name, link }) => {
	let socialName = ""
	console.log("name", name)
	switch (name) {
		case "youtube":
			socialName = "youtube"
			break
		case "inst":
			socialName = "instagram"
			break
		case "vk":
			socialName = "vk"
			break
		case "fb":
			socialName = "facebook"
			break
	}

	return (
		<LinkSocial href={link} target='_blank'>
			<LinkSocialIcon className={`fab fa-${socialName}`} />
		</LinkSocial>
	)
}

SchoolDescription.propTypes = {
	links: PropTypes.shape({
		socials: PropTypes.object,
		otherLinks: PropTypes.object
	}),
}

export default SchoolDescription
