import React from "react";
import {v4 as uuidv4} from "uuid";
import {Col, Row} from "react-bootstrap";
import {Link, useRouteMatch, useParams, useLocation} from "react-router-dom";

type Props = {
	totalPages: number;
	currentPage: number;
}

const PageNumbers: React.FC<Props> = ({totalPages, currentPage}: Props): JSX.Element => {
	const {path} = useRouteMatch();
	const taxType = path.match(/\w+(?=\/)/);
	const [slug] = Object.values(useParams());
	const {state} = useLocation();
	const term_id = (state && state.term_id);

	return (
		<>
			{totalPages && totalPages > 1 &&
			<Row className="justify-content-center mt-5">
				<Col className="text-center" xs={12}>
					{
						Array.from(Array(totalPages && +totalPages), ((e, i) => i + 1)).map((pageNumber: number): JSX.Element =>
							<Link key={uuidv4()}
							      className={`mr-3 mb-3 btn ${pageNumber === currentPage ? "btn-primary" : "btn-outline-secondary"}`}
							      to={{
								      pathname: taxType && slug ? `/${taxType}/${slug}` : `/`,
								      state: {term_id, currentPage: pageNumber}
							      }}>{pageNumber}</Link>
						)
					}
				</Col>
			</Row>
			}
		</>
	)
}

export default PageNumbers

