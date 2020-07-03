import {useParams} from "react-router-dom";
import {useData} from "./hooks/useData";
import {ThePost} from "./components/ThePost";

export const PostController: any = () => {
	const {slug} = useParams();
	return useData(`${process.env.REACT_APP_API_PATH}posts?slug=${slug}`, ThePost);
}