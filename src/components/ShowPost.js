import React, { useEffect, useState } from "react";
import { db } from "../config/Firebase";
import CloseIcon from "@material-ui/icons/Close";
import Comment from "./Comment";
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

	const [comments, setComments] = useState([]);
	useEffect(() => {
		db.collection("posts")
			.doc(id.id)
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
	}, []);

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
			<div className="showpost__card">
				<img src={post?.photo} alt={post?.created_by} />
				<div className="showpost__info">
					<div className="showpost__nav">
						<CloseIcon
							fontSize="large"
							style={{ fill: "black" }}
							onClick={() => history.push("/explore")}
						/>
						<Avatar src={posted_by} />
						<p>{post?.name}</p>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#abe9cd",
								backgroundImage:
									"linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
								color: "white",
							}}
							size="small">
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
						<Button
							variant="contained"
							style={{
								backgroundColor: "#f7b42c",
								backgroundImage:
									"linear-gradient(315deg, #f7b42c 0%, #fc575e 74%",
								color: "white",
							}}>
							<FavoriteBorderIcon />
							<span> Like</span>
						</Button>
						<Button
							variant="contained"
							style={{
								backgroundColor: "#abe9cd",
								backgroundImage:
									"linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
								color: "white",
							}}>
							<ChatBubbleOutlineIcon />
							<span> Comment</span>
						</Button>
					</div>
					<div className="showpost__comments">
						{comments.length > 0
							? comments.map((comment) => (
									<Comment key={comment.id} data={comment.data} />
							  ))
							: ""}
					</div>
					<div className="showpost_add_comment">
						<MakeComment id={id.id} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ShowPost;
