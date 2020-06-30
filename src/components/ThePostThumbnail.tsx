import React from "react";

type Props = {
	image: {
		url?: string;
		alt?: string;
	}
	classes?: string;
}

const ThePostThumbnail: React.FC<Props> = ({image: {url, alt}, classes}): JSX.Element =>
	<img className={classes}
	     alt={alt}
	     src={url}/>

export default ThePostThumbnail