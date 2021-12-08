import logo from './logo.svg';
import './App.css';

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NavigationContainer from "./Navigation/navigation-container.js";
import Home from "./Pages/home.js";
import About from "./Pages/about.js";
import Contact from "./Pages/contact.js";
import Blog from "./Pages/blog.js";
import BlogDetail from "./Pages/blog-detail.js";
import PortfolioManager from "./Pages/portfolio-manager.js";
import PortfolioDetail from "./components/Portfolio/portfolio-detail.js";
import Auth from "./Pages/auth.js";
import NoMatch from "./Pages/no-match.js";
// import Icons from "./helpers/icons.js";

export default class App extends Component {
	constructor(props) {
		super(props);

		// Icons();

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
		};

		this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
		this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
		this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
	}

	handleSuccessfulLogin() {
		this.setState({
			loggedInStatus: "LOGGED_IN",
		});
	}

	handleUnsuccessfulLogin() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	handleSuccessfulLogout() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	checkLoginStatus() {
		return axios
			.get("https://api.devcamp.space/logged_in", {
				withCredentials: true,
			})
			.then((response) => {
				const loggedIn = response.data.logged_in;
				const loggedInStatus = this.state.loggedInStatus;

				if (loggedIn && loggedInStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					this.setState({
						loggedInStatus: "LOGGED_IN",
					});
				} else if (!loggedIn && loggedInStatus === "LOGGED_IN") {
					this.setState({
						loggedInStatus: "NOT_LOGGED_IN",
					});
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	authorizedPages() {
		return [
			<Route
				key="portfolio-manager"
				path="/portfolio-manager"
				component={PortfolioManager}
			/>,
		];
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<NavigationContainer
							loggedInStatus={this.state.loggedInStatus}
							handleSuccessfulLogout={this.handleSuccessfulLogout}
						/>

						<Routes>
							<Route exact path="/" component={Home} />
							<Route
								path="/auth"
								render={(props) => (
									<Auth
										{...props}
										handleSuccessfulLogin={
											this.handleSuccessfulLogin
										}
										handleUnsuccessfulLogin={
											this.handleUnsuccessfulLogin
										}
									/>
								)}
							/>
							<Route path="/about-me" component={About} />
							<Route path="/contact" component={Contact} />

							<Route
								path="/blog"
								render={(props) => (
									<Blog
										{...props}
										loggedInStatus={
											this.state.loggedInStatus
										}
									/>
								)}
							/>

							<Route
								path="/b/:slug"
								render={(props) => (
									<BlogDetail
										{...props}
										loggedInStatus={
											this.state.loggedInStatus
										}
									/>
								)}
							/>
							{this.state.loggedInStatus === "LOGGED_IN"
								? this.authorizedPages()
								: null}
							<Route
								exact
								path="/portfolio/:slug"
								component={PortfolioDetail}
							/>
							<Route component={NoMatch} />
						</Routes>
					</div>
				</Router>
			</div>
		);
	}
}
