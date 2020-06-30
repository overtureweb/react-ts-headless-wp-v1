import React from 'react';
import './App.scss';
import './styles.scss';
import {PostListController} from './PostListController';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom"
import {PostController} from "./PostController";

export const App: React.FC<any> = () => {
	return (
			<Router>
				<Switch>
					<Route exact path="/">
						<PostListController/>
					</Route>
					<Route path="/tags/:tag">
						<PostListController/>
					</Route>
					<Route path="/categories/:category">
						<PostListController/>
					</Route>
					<Route path="/author/:author">
						<PostListController/>
					</Route>
					<Route path="/:slug">
						<PostController/>
					</Route>
				</Switch>
			</Router>
	)
}