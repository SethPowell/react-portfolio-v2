import React, { Component } from "react";
import axios from "axios";

import PortfolioItem from "./portfolio-item";

export default class PortfolioContainer extends Component {
	constructor() {
		super();

		this.state = {
			pageTitle: "Welcome to my portfolio",
			isLoading: false,
			data: []
		};

		this.handleFilter = this.handleFilter.bind(this);
	}

	handleFilter(filter) {
		if (filter === "CLEAR_FILTERS") {
			this.getPortfolioItems();
		} else {
			this.getPortfolioItems(filter);
		}
	}

	getPortfolioItems(filter = null) {
		axios
			.get("https://sethpowell.devcamp.space/portfolio/portfolio_items")
			.then((response) => {
				if (filter) {
					this.setState({
						data: response.data.portfolio_items.filter((item) => {
							return item.category === filter;
						})
					});
				} else {
					this.setState({
						data: response.data.portfolio_items
					});
				}
			})
			.catch((error) => {
				console.log("error in getPortfolioItems: ", error);
			});
	}

	portfolioItems() {
		return this.state.data.map((item) => {
			return <PortfolioItem key={item.id} item={item} />;
		});
	}

	componentDidMount() {
		this.getPortfolioItems();
	}

	render() {
		if (this.state.isLoading) {
			return <div>Loading Content...</div>;
		}

		return (
			<div className="homepage-wrapper">
				<div className="filter-links">
					<button
						className="btn"
						onClick={() => this.handleFilter("Search")}
					>
						Search Engine
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("SocialMedia")}
					>
						Social Media
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("ConsumerTech")}
					>
						Consumer Tech
					</button>
					<button
						className="btn"
						onClick={() => this.handleFilter("CLEAR_FILTERS")}
					>
						All
					</button>
				</div>
				<div className="portfolio-items-wrapper">
					{this.portfolioItems()}
				</div>
			</div>
		);
	}
}