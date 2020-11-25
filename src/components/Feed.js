import React, { useState } from "react";
import Posts from "./Posts";
import AddPost from "./AddPost";
import { Button } from "@material-ui/core";

import "./Feed.css";

function Feed() {
	const [post, setPost] = useState(false);

	let togglePost = () => {
		post ? setPost(false) : setPost(true);
	};

	return (
		<div className="feed">
			{post ? (
				<AddPost togglePost={() => togglePost()} />
			) : (
				<Button variant="contained" onClick={togglePost} color="primary">
					Create Post
				</Button>
			)}
			<Posts />
		</div>
	);
}

export default Feed;
