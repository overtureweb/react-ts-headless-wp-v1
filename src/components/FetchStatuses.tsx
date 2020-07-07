import React from "react";
import loader_image from "../media/loader.gif";

//TODO this should be refactored to return one status message, store values in an object, keep it DRY


export const Empty: React.FC = (): JSX.Element =>
	<div style={{height: "100vh"}}>
		<div style={{position: "relative", top: "20vh", textAlign: "center"}}>
			<h1>Nothing to see here. No results found. &#128566;</h1>
		</div>
	</div>

export const Loader: React.FC = (): JSX.Element =>
	<div style={{height: "100vh"}}>
		<div style={{position: "relative", top: "20vh", textAlign: "center"}}>
			<img alt="loading, please wait..." src={loader_image}/>
		</div>
	</div>

export const FetchError: React.FC = (): JSX.Element =>
	<div style={{height: "100vh"}}>
		<div style={{position: "relative", top: "20vh", textAlign: "center"}}>
			<h1>That's a 404 &#128557;</h1>
		</div>
	</div>