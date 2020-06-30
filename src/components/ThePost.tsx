import React from "react";
import {useHistory, useParams} from "react-router-dom";
import {Col, Container, Media, Row} from "react-bootstrap";
import {Helmet} from "react-helmet-async";
import TheTaxonomies from "./TheTaxonomies";
import TheTitle from "./TheTitle";
import TheAuthor from "./TheAuthor";
import TheDate from "./TheDate";
import TheFeaturedImage from "./TheFeaturedImage";
import TheContent from "./TheContent";
import {v4 as uuidv4} from "uuid";
import Disqus from "disqus-react";
import {DISQUS_SHORTNAME, PROJECT_ROOT} from "../constants/";
import SocialSharingButtons from "./SocialSharingButtons";

type Post = {
	title: {
		rendered: string;
	},
	content: {
		rendered: string;
	},
	owd_excerpt: string;
	date: string;
	owd_featured_image: object;
	owd_author: {
		term_id: number;
		avatar: string;
		name: string;
		slug: string;
	};
	owd_categories: object[];
	owd_tags: object[];
}

export const ThePost: React.FC<string> = ({postData}: any) => {
	const history = useHistory();
	const [slug] = Object.values(useParams());
	const title = slug && slug.split("-").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
	const url =`${PROJECT_ROOT}${history.location.pathname}`
	const disqusShortname = DISQUS_SHORTNAME
	const disqusConfig = {
		url: url,
		identifier: slug,
		title: title
	}
	return (
		postData && postData.map(({
			                          title: {
				                          rendered: title
			                          },
			                          content: {
				                          rendered: content
			                          },
			                          owd_excerpt: excerpt,
			                          date,
			                          owd_featured_image: image,
			                          owd_author: author,
			                          owd_tags: tags,
			                          owd_categories: categories
		                          }: Post) =>
			<Container className="post" key={uuidv4()} fluid>
				<Helmet>
					<title>{title}</title>
					<meta name="description" content={excerpt}/>
					<meta property="og:site_name" content="Overture Web Development"/>
					<meta property="og:url" content={url}/>
					<meta property="og:title" content={title}/>
					<meta property="og:description" content={excerpt}/>
					<meta property="og:type" content="website"/>
					<meta property="og:image" content="https://www.overtureweb.com/images/adstfo/theater_curtains.jpg"/>
					<meta name="twitter:site" content="@overturewebdev"/>
					<meta name="twitter:creator" content="@overturewebdev"/>
					<meta name="twitter:card" content="summary"/>
				</Helmet>
				<Row className="justify-content-center my-5">
					<Col md={8} lg={7}>
						<TheTaxonomies terms={categories}
						               linkClasses="mr-3 mb-3 btn btn-sm btn-outline-danger"
						               type="categories">
							{(links) => <p className="mb-0 small">{links}</p>}
						</TheTaxonomies>
						<TheTitle title={title}/>
						<p>{excerpt}</p>
						<SocialSharingButtons url={url}/>
						<Media className="mb-3">
							<TheAuthor author={author}
							           classes="align-self-center">
								{(name: string, src: string) =>
									<TheAuthor.Avatar
										classes="blog__author-avatar mr-1"
										alt={name}
										src={src}/>}
							</TheAuthor>
							<Media.Body>
								<TheAuthor author={author}
								           classes="small">
									{(name: string) =>
										<TheAuthor.Name name={name}/>}
								</TheAuthor>
								<TheDate date={date}
								         classes="small mb-1"/>
							</Media.Body>
						</Media>
						{image &&
						<TheFeaturedImage image={image}
						                  classes="post__featured-image"/>}
						<TheContent content={content}/>
						<TheTaxonomies terms={tags}
						               type="tags"
						               linkClasses="btn btn-sm btn-outline-primary mr-3 mb-3">
							{(links) => <div className="my-3">{links}</div>}
						</TheTaxonomies>
						<button className="my-4 btn btn-primary" onClick={() => history.goBack()}>Go Back</button>
						<Disqus.DiscussionEmbed
							shortname={disqusShortname}
							config={disqusConfig}
						/>
					</Col>
				</Row>
			</Container>
		)
	)
};
