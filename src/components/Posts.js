import React, { useEffect, useState, useRef } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./Posts.css";
import Comment from "./Comment";
import MakeComment from "./MakeComment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { useStateValue } from "../config/StateProvider";
import { db } from "../config/Firebase";

function Posts(props) {
	const [{ user }] = useStateValue();
	const [avatar, setAvatar] = useState("");
	const [comments, setComments] = useState([]);
	const [likes, setLikes] = useState(0);
	const [liked, setLiked] = useState(false);
	const [following, setFollowing] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		db.collection("posts")
			.doc(props.id)
			.onSnapshot((snapshot) => {
				let userID = snapshot.data().created_by;
				db.collection("users")
					.doc(userID)
					.onSnapshot((snapshot) => setAvatar(snapshot.data().fileURL));
			});

		db.collection("posts")
			.doc(props.id)
			.onSnapshot((snapshot) => {
				let userID = snapshot.data().created_by;
				db.collection("users")
					.doc(user.uid)
					.collection("following")
					.doc(userID)
					.onSnapshot((snapshot) => setFollowing(snapshot.exists));
			});

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
			.collection("likes")
			.onSnapshot((snapshot) => setLikes(snapshot.docs.length));

		db.collection("posts")
			.doc(props.id)
			.collection("likes")
			.doc(user.uid)
			.onSnapshot((snapshot) => setLiked(snapshot.exists));
	}, []);

	let handleCommentClick = () => {
		inputRef.current.focus();
	};

	let handleLike = () => {
		if (user && !liked) {
			db.collection("posts")
				.doc(props.id)
				.collection("likes")
				.doc(user.uid)
				.set({
					id: user.uid,
				});
		} else if (user && liked) {
			db.collection("posts")
				.doc(props.id)
				.collection("likes")
				.doc(user.uid)
				.delete()
				.then(() => console.log("deleted"))
				.catch((err) => {
					console.log(err);
				});
		}
	};

	let handleFollow = () => {
		if (!following) {
			db.collection("posts")
				.doc(props.id)
				.onSnapshot((snapshot) => {
					let person = snapshot.data().created_by;
					let personName = snapshot.data().name;
					if (person !== user.uid) {
						db.collection("users")
							.doc(person)
							.collection("followers")
							.doc(user.uid)
							.set({
								name: user.displayName,
								id: user.uid,
							});
						db.collection("users")
							.doc(user.uid)
							.collection("following")
							.doc(person)
							.set({
								name: personName,
								id: person,
							});
					}
				});
		} else if (following) {
			db.collection("posts")
				.doc(props.id)
				.onSnapshot((snapshot) => {
					let person = snapshot.data().created_by;
					db.collection("users")
						.doc(user.uid)
						.collection("following")
						.doc(person)
						.delete();

					db.collection("users")
						.doc(person)
						.collection("followers")
						.doc(user.uid)
						.delete()
						.then(() => {
							setFollowing(false);
						});
				});
		}
	};

	return (
		<div className="post">
			<div className="post__nav">
				<Avatar src={avatar} />
				<p className="post__nav__name">{props.data.name}</p>
				<Button
					variant="contained"
					size="small"
					style={{
						backgroundColor: "#abe9cd",
						backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
						color: "white",
					}}
					onClick={handleFollow}>
					{following ? "following" : "follow"}
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
				<span>{likes} Likes</span>
				<span className="post__stats__comments">
					{comments?.length} Comments
				</span>
			</div>
			<div className="post__cta">
				<Button
					variant="contained"
					style={{
						backgroundColor: "#f7b42c",
						backgroundImage: "linear-gradient(315deg, #f7b42c 0%, #fc575e 74%",
						color: "white",
					}}
					onClick={handleLike}>
					{liked ? (
						<>
							<FavoriteIcon />
							<span>Liked</span>
						</>
					) : (
						<>
							<FavoriteBorderIcon />
							<span> Like</span>
						</>
					)}
				</Button>
				<Button
					variant="contained"
					style={{
						backgroundColor: "#abe9cd",
						backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
						color: "white",
					}}>
					<ChatBubbleOutlineIcon />
					<span> Comment</span>
				</Button>
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
