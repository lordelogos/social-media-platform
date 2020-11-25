import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, Button } from "@material-ui/core";
import { Input } from "@material-ui/core";
import { ReactComponent as Logo } from "../Notgram.svg";
import { Link } from "react-router-dom";
import "./Nav.css";
import { useStateValue } from "../config/StateProvider";

function Nav() {
	const [{ user }] = useStateValue();
	return (
		<nav>
			<Link to="/">
				<div className="nav">
					<Logo />
				</div>
			</Link>
			<div className="nav__search">
				<SearchIcon />
				<Input disableUnderline={true} placeholder="Search" />
			</div>
			{user ? (
				<div className="nav__cta">
					<Link to="/">
						<HomeIcon />
					</Link>
					<Link to="/explore">
						<ExploreIcon />
					</Link>
					<Link to="/profile">
						<Avatar
							style={{
								width: 22,
								height: 22,
								border: "solid 1px #3f51b5",
							}}
						/>
					</Link>
				</div>
			) : (
				<div className="nav__cta">
					<Button variant="contained" color="primary">
						Sign in
					</Button>
				</div>
			)}
		</nav>
	);
}

export default Nav;
