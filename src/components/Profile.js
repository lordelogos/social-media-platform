import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditProfile from "./EditProfile";
import { auth } from "../config/Firebase";
import { useStateValue } from "../config/StateProvider";
import { useHistory } from "react-router-dom";

function Profile() {
	let history = useHistory();
	let [{ user }] = useStateValue();
	const [edit, setEdit] = useState(false);
	let toggleEdit = () => {
		edit ? setEdit(false) : setEdit(true);
	};

	let handleLogout = () => {
		if (user) {
			auth.signOut().then(history.push("/"));
		}
	};

	useEffect(() => {
		console.log(user);
	}, []);

	return (
		<div className="profile">
			<div className="profile__nav">
				<Avatar />
				<div className="profile__info">
					<p>{user.displayName}</p>
					<Button variant="contained" color="primary" onClick={toggleEdit}>
						Edit profile
					</Button>
				</div>
			</div>
			<div className="profile__bio">
				<p>This is my bio text. I can add Emoji's</p>
			</div>
			<div className="profile__stats">
				<span>
					<p>Followers</p>
					<p>12</p>
				</span>
				<span>
					<p>Following</p>
					<p>12</p>
				</span>
			</div>
			{edit ? <EditProfile toggleEdit={() => toggleEdit()} /> : ""}
			<Button variant="contained" color="secondary" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
