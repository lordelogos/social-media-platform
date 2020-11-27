import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import CloseIcon from "@material-ui/icons/Close";
import "./ShowPost.css";
import MakeComment from "./MakeComment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Avatar, Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";

function ShowPost() {
	const history = useHistory();
	const id = useParams();
	const [post, setPost] = useState(null);
	const [posted_by, setPosted_by] = useState(null);

	useEffect(() => {
		db.collection("posts")
			.doc(id.id)
			.onSnapshot((snapshot) => {
				setPost(snapshot.data());
				db.collection("users")
					.doc(snapshot.data().created_by)
					.onSnapshot((snapshot) => setPosted_by(snapshot.data().fileURL));
			});
	}, []);

	return (
		<div className="showpost">
			<CloseIcon
				fontSize="large"
				style={{ fill: "white" }}
				onClick={() => history.push("/explore")}
			/>
			<div className="showpost__card">
				<img src={post?.photo} alt={post?.created_by} />
				<div className="showpost__info">
					<div className="showpost__nav">
						<Avatar src={posted_by} />
						<p>{post?.name}</p>
						<Button variant="contained" color="primary" size="small">
							Follow
						</Button>
					</div>
					<div className="showpost__textContent">
						<p>{post?.text}</p>
					</div>
					<div className="showpost__stats">
						<p>{`${post?.likes} likes`}</p>
					</div>
					<div className="showpost__cta">
						<div>
							<FavoriteBorderIcon />
							<span>Like</span>
						</div>
						<div>
							<ChatBubbleOutlineIcon />
							<span>Comment</span>
						</div>
					</div>
					<div className="showpost_add_comment">
						<MakeComment />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShowPost;
