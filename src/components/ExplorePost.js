import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import "./ExplorePost.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";
import { db } from "../config/Firebase";

function ExplorePost({ id, data }) {
	const [height, setHeight] = useState("100px");
	const [likes, setLikes] = useState(0);
	const [comments, setComments] = useState(0);

	const imgRef = useRef();

	useLayoutEffect(() => {
		const setSize = () => {
			setHeight(imgRef.current.offsetWidth);
		};

		window.addEventListener("resize", setSize);
		setSize();

		return () => {
			window.removeEventListener("resize", setSize);
		};
	}, []);

	useEffect(() => {
		db.collection("posts")
			.doc(id)
			.collection("likes")
			.onSnapshot((snapshot) => setLikes(snapshot.docs.length));

		db.collection("posts")
			.doc(id)
			.collection("comments")
			.onSnapshot((snapshot) => setComments(snapshot.docs.length));
	}, []);

	const imageSize = {
		position: "relative",
		width: "100%",
		height: height,
		cursor: "pointer",
	};

	return (
		<Link to={`/p/${id}`}>
			<div className="explorepost" style={imageSize} ref={imgRef}>
				<img src={data.photo} alt={data.name} />
				<div className="explorepost__stats">
					<span>
						<FavoriteIcon
							style={{
								color: "ff0000 ",
							}}
						/>{" "}
						{likes}
					</span>
					<span>
						<ChatBubbleIcon
							style={{
								color: "#24a0ed ",
							}}
						/>{" "}
						{comments}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ExplorePost;
