import React from "react";
import {Link} from "react-router-dom";

type Props = {
	author: {
		term_id: number;
		avatar: string;
		name: string;
		slug: string;
	};
	classes?: string;
}

type AuthorNameComponent = React.FC<{ name: string, classes?: string }>;
type AuthorAvatarComponent = React.FC<{ src: string, alt: string, classes?: string }>;
type TheAuthorComponent = React.FC<Props> & { Name: AuthorNameComponent, Avatar: AuthorAvatarComponent };

const TheAuthor: TheAuthorComponent = ({author: {term_id, avatar, name, slug}, classes, children}: any) =>
	<Link className={classes}
	      to={{pathname: `/author/${slug}`, state: {term_id, currentPage: 1}}}>{children(name, avatar)}</Link>

const Name: AuthorNameComponent = ({name, classes}) => <span
	className={classes}>{name}</span>;
const Avatar: AuthorAvatarComponent = ({src, alt, classes}) => <img
	className={classes} alt={alt} src={src}/>

TheAuthor.Name = Name;
TheAuthor.Avatar = Avatar;

export default TheAuthor;


