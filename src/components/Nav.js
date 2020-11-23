import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar } from "@material-ui/core";
import { Input } from "@material-ui/core";

import "./Nav.css";

function Nav() {
	return (
		<nav>
			<div className="nav">Nav-logo</div>
			<div className="nav__search">
				<SearchIcon />
				<Input disableUnderline={true} placeholder="Search" />
			</div>
			<div className="nav__cta">
				<HomeIcon />
				<ExploreIcon />
				<Avatar />
			</div>
		</nav>
	);
}

export default Nav;
