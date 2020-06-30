import {useState} from "react";

export const useStatus = (initialState: string) => {
	const [status, setStatus] = useState(initialState);
	const Status = (props: any) => props[status] || null;
	return {Status, setStatus};
}