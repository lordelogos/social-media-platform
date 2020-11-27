import React, { useEffect, useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./Posts.css";
import Comment from "./Comment";
import MakeComment from "./MakeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { db } from "../config/Firebase";

function Posts(props) {
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState(0);
	useEffect(() => {
		db.collection("posts")
			.doc(props.id)
			.collection("comments")
			.onSnapshot((snapshot) => {
				if (snapshot.docs.length > 0) {
					setComments(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							data: doc.data(),
						}))
					);
				}
			});

		db.collection("posts")
			.doc(props.id)
			.onSnapshot((snapshot) => setLikes(snapshot.data().likes));
	}, []);

	return (
		<div className="post">
			<div className="post__nav">
				<Avatar />
				<p>{props.data.name}</p>
				<Button variant="contained" size="small" color="primary">
					Follow
				</Button>
			</div>
			{props.data.photo ? (
				<img
					className="post__image"
					src={props.data.photo}
					alt={props.data.name}
				/>
			) : (
				""
			)}
			<div className="post__content">{props.data.text}</div>
			<div className="post__stats">
				<span>
					<FavoriteIcon /> {likes}
				</span>
				<span className="post__stats__comments">
					{comments?.length} Comments
				</span>
			</div>
			<div className="post__cta">
				<div>
					<FavoriteBorderIcon />
					<span>Like</span>
				</div>
				<div>
					<ChatBubbleOutlineIcon />
					<span>Comment</span>
				</div>
			</div>
			<div className="post__comments">
				{comments.length > 0
					? comments.map((comment) => (
							<Comment key={comment.id} data={comment.data} />
					  ))
					: ""}
			</div>
			<div className="add_comment">
				<MakeComment id={props.id} />
			</div>
		</div>
	);
}

export default Posts;
