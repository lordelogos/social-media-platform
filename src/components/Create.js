import "./Create.css";
import React, { useState } from "react";
import { Input, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../config/Firebase";

function Create() {
	let history = useHistory();

	let [name, setName] = useState("");
	let [email, setEmail] = useState("");
	let [password, setPassword] = useState("");

	let handleSignUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				const user = auth.currentUser;
				history.push("/profile");
				return user.updateProfile({
					displayName: name,
				});
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className="create">
			<div className="create__card">
				<Link to="/">
					<h2 className="create__title">Notgram</h2>
				</Link>{" "}
				<form className="create__form" onSubmit={handleSignUp}>
					<Input
						type="text"
						placeholder="Username"
						autoFocus={true}
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
					<Input
						type="email"
						placeholder="Email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						type="password"
						placeholder="Password"
						required
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Button variant="contained" color="primary" type="submit">
						Sign up
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Create;
