import React from "react";

type Props = {
	content: string;
}

const TheContent: React.FC<Props> = ({content}) => <article dangerouslySetInnerHTML={{__html: content}}/>

export default TheContent;