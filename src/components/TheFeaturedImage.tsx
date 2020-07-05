import React from "react";

type Props = {
	image: {
		url?: string;
		caption?: string;
	}
	classes?: string;
}

const TheFeaturedImage: React.FC<Props> = ({image: {url, caption}, classes}): JSX.Element =>
	<div className="mb-4">
		<div className={classes}
		     style={{background: `url(${url}) no-repeat center bottom / cover`}}>
		</div>
		{caption && <p className="post__featured-image-caption">{caption}</p>}
	</div>

export default TheFeaturedImage;
