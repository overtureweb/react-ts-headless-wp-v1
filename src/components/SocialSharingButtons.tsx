import React from 'react';
import {
	EmailIcon,
	EmailShareButton,
	FacebookIcon,
	FacebookShareButton,
	LinkedinIcon,
	LinkedinShareButton, PocketIcon, PocketShareButton, RedditIcon, RedditShareButton,
	TwitterIcon,
	TwitterShareButton
} from "react-share";

type Props = {
	url: string;
}

const SocialSharingButtons: React.FC<Props> = ({url}) =>
	<div className="my-3">
		<FacebookShareButton url={url}>
			<FacebookIcon className="mr-3" round size={32}/>
		</FacebookShareButton>
		<TwitterShareButton url={url}>
			<TwitterIcon className="mr-3" round size={32}/>
		</TwitterShareButton>
		<LinkedinShareButton url={url}>
			<LinkedinIcon className="mr-3" round size={32}/>
		</LinkedinShareButton>
		<RedditShareButton url={url}>
			<RedditIcon className="mr-3" round size={32}/>
		</RedditShareButton>
		<PocketShareButton url={url}>
			<PocketIcon className="mr-3" round size={32}/>
		</PocketShareButton>
		<EmailShareButton url={url}>
			<EmailIcon className="mr-3" round size={32}/>
		</EmailShareButton>
	</div>


export default SocialSharingButtons;