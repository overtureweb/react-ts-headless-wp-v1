import React from "react";

type Props = {
	content: string;
}

const TheContent: React.FC<Props> = ({content}) => <div dangerouslySetInnerHTML={{__html: content}}/>

export default TheContent;