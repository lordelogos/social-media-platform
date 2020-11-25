import React, { useState } from "react";
import "./Login.css";
import { Input, Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../config/Firebase";

function Login() {
	let history = useHistory();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let handleLogin = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((auth) => {
				history.push("/");
			})
			.catch((e) => alert(e.message));
	};

	return (
		<div className="login">
			<div className="login__img" />
			<div className="login__card">
				<Link to="/">
					<h2 className="login__title">Notgram</h2>
				</Link>{" "}
				<form className="login__form" onSubmit={handleLogin}>
					{/* <Input type="text" placeholder="Username" /> */}
					<Input
						type="email"
						placeholder="Email"
						required
						autoFocus={true}
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
						Login
					</Button>
				</form>
				<p className="login__cta">
					Don't have an account? <span>Sign up</span>
				</p>
				<Link to="/create" className="toSignUp">
					<Button variant="contained" className="toSignUp">
						Sign up
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Login;
