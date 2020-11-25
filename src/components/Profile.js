import React, { useState, useEffect } from "react";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import EditProfile from "./EditProfile";
import { auth, db } from "../config/Firebase";
import { useStateValue } from "../config/StateProvider";
import { useHistory } from "react-router-dom";

function Profile() {
	let history = useHistory();
	let [{ user }] = useStateValue();
	const [userProfile, setUserProfile] = useState({});
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
		if (user) {
			db.collection("users")
				.doc(user.uid)
				.onSnapshot((snapshot) => setUserProfile(snapshot.data()));
		}
	}, [user]);

	return (
		<div className="profile">
			<div className="profile__nav">
				<Avatar src={userProfile?.fileURL} />
				<div className="profile__info">
					<p>{userProfile?.name}</p>
					<Button variant="contained" color="primary" onClick={toggleEdit}>
						Edit profile
					</Button>
				</div>
			</div>
			<div className="profile__bio">
				<p>{userProfile?.bio}</p>
			</div>
			<div className="profile__stats">
				<span>
					<p>Followers</p>
					<p>{userProfile?.followers}</p>
				</span>
				<span>
					<p>Following</p>
					<p>{userProfile?.following}</p>
				</span>
			</div>
			{edit ? (
				<EditProfile toggleEdit={() => toggleEdit()} user={userProfile} />
			) : (
				""
			)}
			<Button variant="contained" color="secondary" onClick={handleLogout}>
				Logout
			</Button>
		</div>
	);
}

export default Profile;
