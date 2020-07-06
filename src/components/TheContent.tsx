import React from "react";

type Props = {
	content: string;
	classes?: string;
}

const TheContent: React.FC<Props> = ({content, classes}) => <div className={classes} dangerouslySetInnerHTML={{__html: content}}/>

export default TheContent;