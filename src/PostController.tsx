import {useParams} from "react-router-dom";
import {useData} from "./hooks/useData";
import {ThePost} from "./components/ThePost";
import {API_PATH} from "./constants/";

export const PostController: any = () => {
	const {slug} = useParams();
	return useData(`${API_PATH}posts?slug=${slug}`, ThePost);
}