import React from "react";
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";

type Props = {
	terms: object[];
	type: string;
	children: (terms: JSX.Element[]) => JSX.Element;
	linkClasses?: string;
}
//TODO consolidate the individual props into an object
const TheTaxonomies: React.FC<Props> = ({terms, type, linkClasses, children}): JSX.Element => {
	const links: JSX.Element[] = terms.map(({slug, name, term_id}: any) =>
		<Link key={uuidv4()}
		      className={linkClasses}
		      to={{pathname: `/${type}/${slug}`, state: {term_id, currentPage: 1}}}>{name}</Link>
	)
	return children(links);
};

export default TheTaxonomies;
