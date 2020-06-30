import {useState, useEffect} from 'react';
import './App.scss';
import {useLocation, useRouteMatch, useParams} from "react-router-dom";
import {ThePostList} from "./components/ThePostList";
import {API_PATH} from "./constants/";
import {useData} from "./hooks/useData";

export const PostListController: any = () => {
	const {state}: any = useLocation(); //used in controller & in child comp, retrieved from react router hook
	const term_id: number = (state && state.term_id); //used in controller & in child comp, retrieved from react router hook
	const {path}: any = useRouteMatch(); //used in controller retrieved from react router hook
	const currentPage: number = (state && state.currentPage) || 1; ////used in controller & in child comp, current value must be passed to children
	const [slug]: (string | undefined)[] = Object.values(useParams()); //needed for Helmet data, retrieved from react router hook
	const maxPerPage: number = 2; //controller only
	const taxonomyType: string = path.match(/\w+(?=\/)/);
	const [url, setUrl] = useState();
	const [didFetchTermId, setDidFetchTermId] = useState(false);
	const [fetchedTermId, setFetchedTermId] = useState();

	/**
	 * Permalink - User navigates directly to filter results page, no term id is present to it's necessary to fetch it from the appropriate taxononmy WP API
	 * to prevent unnecessary multiple calls to the API we add the didFetchTerm boolean flag and set it to true after the first request
	 */
	useEffect((): void => {
		const getTaxId = async () => {
			if (!term_id && taxonomyType && !didFetchTermId) {
				try {
					setDidFetchTermId(true)
					const response = await fetch(`${API_PATH}${taxonomyType}?slug=${slug}`);
					const [taxObject] = await response.json();
					setFetchedTermId(taxObject.id);
				} catch (e) {
					console.log(e.message);
					//TODO if this API call fails we still need to pass some kind of URL to useData that will make it pass the URL check but return an error component to the user
					setUrl(true);
				}
			}
		}
		getTaxId().then();
	}, [term_id, taxonomyType, slug, didFetchTermId])

	/**
	 * Homepage or filtered results, if the taxonomy isn't set we're accessing the site root and can ignore the term id, if the term id is set, either by the useLocation hook of
	 * react router OR by the previous API call then use that instead
	 */
	useEffect((): void => {
		//set t to either the term_id passed by the react router hook or fetched in the prior API Call or undefined
		const t: number | undefined = term_id || fetchedTermId;
		if (!taxonomyType) {
			//home page
			setUrl(`${API_PATH}posts?orderby=date&order=desc&per_page=${maxPerPage}&page=${currentPage}`);
		} else if (t) {
			//clicked through to filtered results page
			setUrl(`${API_PATH}posts?${t && taxonomyType ? `${taxonomyType}=${t}&` : ``}orderby=date&order=desc&per_page=${maxPerPage}&page=${currentPage}`);
		}
	}, [currentPage, fetchedTermId, term_id, taxonomyType])

	return useData(url, ThePostList);
}