import React from "react";
import {Helmet} from "react-helmet-async";
import {Col, Media, Row} from "react-bootstrap";
import {Link, useLocation, useParams, useHistory} from "react-router-dom";
import {v4 as uuidv4} from "uuid";
import ThePostThumbnail from "./ThePostThumbnail";
import TheTaxonomies from "./TheTaxonomies";
import TheTitle from "./TheTitle";
import TheAuthor from "./TheAuthor";
import TheDate from "./TheDate";
import PageNumbers from "../PageNumbers";

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
	slug: string;
	owd_author: {
		term_id: number,
		avatar: string,
		name: string,
		slug: string
	};
	owd_tags: object[];
	owd_categories: object[];
}

export const ThePostList = ({postData, totalPages}: any) => {
	const history = useHistory();
	const url = `${process.env.REACT_APP_PROJECT_ROOT}${history.location.pathname}`
	const [slug] = Object.values(useParams());
	const {state}: any = useLocation();
	const currentPage = (state && state.currentPage) || 1;
	//converts the slug into a human-readable, grammatically correct title
	const title = slug && slug.split("-").map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
	return (
		<div className="blog">
			<Helmet>
				<meta name="description"
				      content={`Articles written by Overture on the topic of ${title || "web development"}`}/>
				<meta property="og:site_name" content="Overture Web Development"/>
				<meta property="og:url" content={url}/>
				<meta property="og:title" content={title}/>
				<meta property="og:type" content="website"/>
				<meta property="og:image" content="https://www.overtureweb.com/images/adstfo/theater_curtains.jpg"/>
				<meta name="twitter:site" content="@overturewebdev"/>
				<meta name="twitter:creator" content="@overturewebdev"/>
				<meta name="twitter:card" content="summary"/>
				<title>{slug ? `Showing articles about: ${title} ` : `Tutorials, Advice, News and Rants`}</title>
			</Helmet>
			{/*TODO move filterby into a separate component}*/}
			{slug &&
			<Row className="mt-5 justify-content-center blog__header">
				<Col className="text-center" xs={12}>
					<h2 className="blog__filterby text-center">{`Showing articles about: ${title}`}</h2>
					<Link className="blog__filterby-reset" to="/">Reset</Link>
				</Col>
			</Row>
			}
			<main>
				{
					postData && postData.map((
						{
							title: {rendered: title},
							owd_tags: tags,
							date,
							slug,
							owd_categories: categories,
							owd_excerpt: excerpt,
							owd_featured_image: image,
							owd_author: author
						}: Post) =>
						<article key={uuidv4()}>
							<Row className="justify-content-center mt-5">
								<Col md={8} lg={7}>
									<Media className="flex-column flex-md-row mb-5">
										{
											image &&
											<Link className="align-self-center" to={{
												pathname: `/${slug}`,
												state: {currentPage: currentPage}
											}}>
												<ThePostThumbnail image={image}
												                  classes="blog__featured-image mb-3 mr-md-3"/>
											</Link>
										}
										<Media.Body>
											<TheTaxonomies terms={categories}
											               type="categories">
												{(links) => <p className="mb-0 small">{links}</p>}
											</TheTaxonomies>
											<Link to={{
												pathname: `/${slug}`,
												state: {currentPage: currentPage}
											}}>
												<TheTitle classes="mb-3 courier-std" title={title} wrapper="h2"/>
											</Link>
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
											<Link
												className="d-block excerpt--text-decoration"
												to={{
													pathname: `/${slug}`,
													state: {currentPage: currentPage}
												}}>{excerpt}</Link>
											<TheTaxonomies terms={tags}
											               type="tags"
											               classes="btn btn-sm btn-outline-tags mr-3 mb-3">
												{(links) => <div className="my-3">{links}</div>}
											</TheTaxonomies>
										</Media.Body>
									</Media>
									<hr/>
								</Col>
							</Row>
						</article>
					)
				}
				<PageNumbers totalPages={totalPages}
				             currentPage={currentPage}
				/>
			</main>
		</div>
	)
}