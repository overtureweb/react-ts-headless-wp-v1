import React from "react";
import moment from "moment";

type Props = {
	date: string;
	classes?: string;
	format?: string;
}

const TheDate: React.FC<Props> = ({date, format = "MMMM D, YYYY", classes}): JSX.Element =>
	<p className={classes}>
		{moment(date).format(format)}
	</p>;

	export default TheDate;