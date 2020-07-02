import React from "react";

type Props = {
	title: string;
	wrapper?: any;
	classes?: string;
}

const TheTitle: React.FC<Props> = ({title, classes, wrapper: Element = "h1"}): JSX.Element => <Element
	className={classes}>{title}</Element>;

export default TheTitle;