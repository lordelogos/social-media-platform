import "./App.css";
import React, { useEffect } from "react";
import Nav from "./components/Nav";
import Feed from "./components/Feed";
import Explore from "./components/Explore";
import ShowPost from "./components/ShowPost";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Create from "./components/Create";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./config/StateProvider";
import { auth, db } from "./config/Firebase";

function App() {
	const [{ user }, dispatch] = useStateValue();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				//logged in
				dispatch({
					type: "SET_USER",
					user: authUser,
				});
			} else {
				//logged out
				dispatch({
					type: "SET_USER",
					user: null,
				});
			}
		});
		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (user) {
			db.collection("posts")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					dispatch({
						type: "SET_POSTS",
						posts: snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						})),
					});
				});
		}
	}, [user]);

	return (
		<div className="App">
			<Router>
				<Switch>
					<Route path="/profile">
						<Nav />
						<Profile />
					</Route>
					<Route path="/p/:id">
						<ShowPost />
						<Nav />
						<Explore />
					</Route>
					<Route path="/explore">
						<Nav />
						<Explore />
					</Route>
					<Route path="/create">
						<Create />
					</Route>
					<Route path="/">
						{user ? (
							<>
								<Nav />
								<Feed />
							</>
						) : (
							<Login />
						)}
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
