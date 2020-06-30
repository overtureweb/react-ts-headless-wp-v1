import React from "react";

export const Empty: React.FC = (): JSX.Element =>
	<div style={{width: "100%", height: "100%", position: "fixed"}}>
		<div style={{position: "relative", top: "40vh", textAlign: "center"}}>
			<h1>Nothing to see here. No results found.</h1>
		</div>
	</div>

export const Loader: React.FC = (): JSX.Element =>
	<div style={{width: "100%", height: "100%", position: "fixed"}}>
		<div style={{position: "relative", top: "40vh", textAlign: "center"}}>
			<h1>Loading...</h1>
		</div>
	</div>

export const FetchError: React.FC = (): JSX.Element =>
	<div style={{width: "100%", height: "100%", position: "fixed"}}>
		<div style={{position: "relative", top: "40vh", textAlign: "center"}}>
			<h1>That's a 404</h1>
		</div>
	</div>