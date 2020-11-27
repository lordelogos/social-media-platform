import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import AddPost from "./AddPost";
import { Button } from "@material-ui/core";
import { useStateValue } from "../config/StateProvider";

import "./Feed.css";

function Feed() {
	let [{ posts }] = useStateValue();
	const [addPost, setAddPost] = useState(false);
	const [fetchPosts, setFetchPosts] = useState([]);

	let togglePost = () => {
		addPost ? setAddPost(false) : setAddPost(true);
	};

	useEffect(() => {
		if (posts) {
			setFetchPosts(posts);
		}
	}, [posts]);

	return (
		<div className="feed">
			{addPost ? (
				<AddPost togglePost={() => togglePost()} />
			) : (
				<Button
					variant="contained"
					onClick={togglePost}
					style={{
						backgroundColor: "#abe9cd",
						backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
						color: "white",
					}}>
					Create Post
				</Button>
			)}
			{fetchPosts?.map((post) => (
				<Posts id={post.id} data={post.data} key={post.id} />
			))}
		</div>
	);
}

export default Feed;
