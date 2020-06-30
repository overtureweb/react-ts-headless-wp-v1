import React, {useEffect, useState} from "react";
import {useStatus} from "./useStatus";
import {Loader, Empty, FetchError} from "../components/FetchStatuses";

export const useData = (url: string, Component: any): JSX.Element => {
	const [postData, setPostData] = useState();
	const [totalPages, setTotalPages] = useState();
	const {Status, setStatus} = useStatus("loading");
	useEffect(() => {
		const getPost = async (): Promise<void> => {
			try {
				if (!url) return;
				const response: Response = await fetch(url);
				const json: any = await response.json();
				if (response.status !== 200) return setStatus("error");
				if (!json.length) return setStatus("empty");
				setTotalPages(response.headers.get("X-WP-TotalPages"));
				setPostData(json);
				setStatus("success");
				window.scrollTo(0, 0);
			} catch (e) {
				console.log(e.message)
				setStatus("error")
			}
		}
		getPost().then();
	}, [setStatus, url]);

	return (
		<Status loading={<Loader/>}
		        empty={<Empty/>}
		        error={<FetchError/>}
		        success={<Component postData={postData}
		                            totalPages={totalPages}/>}
		/>
	)
}