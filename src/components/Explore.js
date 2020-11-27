import React, { useState, useEffect } from "react";
import "./Explore.css";
import ExplorePost from "./ExplorePost";
import { useStateValue } from "../config/StateProvider";

function Explore() {
	const [{ posts }] = useStateValue();
	const [explorePosts, setExplorePosts] = useState([]);

	useEffect(() => {
		if (posts) {
			setExplorePosts(posts);
		}
	}, [posts]);

	return (
		<div className="explore">
			{explorePosts
				?.filter((post) => post.data.photo !== null && post.data.photo !== "")
				.map((post) => (
					<ExplorePost key={post.id} data={post.data} id={post.id} />
				))}
		</div>
	);
}

export default Explore;
