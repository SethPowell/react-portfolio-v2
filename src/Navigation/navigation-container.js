import React from "react";
import axios from "axios";
// import { withRouter } from "react-router";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
  }

const NavigationComponent = (props) => {
	const dynamicLink = (route, linkText) => {
		return (
			<div className="nav-link-wrapper">
				<NavLink to={route} activeClassName="nav-link-active">
					{linkText}
				</NavLink>
			</div>
		);
	};

	const handleSignOut = () => {
		axios
			.delete("https://api.devcamp.space/logout", {
				withCredentials: true,
			})
			.then((response) => {
				if (response.status === 200) {
					props.history.push("/");
					props.handleSuccessfulLogout();
				}
				return response.data;
			})
			.catch((error) => {
				console.log("Error signing out", error);
			});
	};

	return (
		<div className="nav-wrapper">
			<div className="left-side">
				<div className="nav-link-wrapper">
					<NavLink exact to="/" activeClassName="nav-link-active">
						Home
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/about-me" activeClassName="nav-link-active">
						About Me
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/contact" activeClassName="nav-link-active">
						Contact
					</NavLink>
				</div>
				<div className="nav-link-wrapper">
					<NavLink to="/blog" activeClassName="nav-link-active">
						Blog
					</NavLink>
				</div>

				{props.loggedInStatus === "LOGGED_IN"
					? dynamicLink("/portfolio-manager", "Portfolio Manager")
					: null}
			</div>
			<div className="right-side">
				SETH POWELL
				{props.loggedInStatus === "LOGGED_IN" ? (
					<a onClick={handleSignOut}>
						<FontAwesomeIcon icon="sign-out-alt" />
					</a>
				) : null}
			</div>
		</div>
	);
};
export default withRouter(NavigationComponent);