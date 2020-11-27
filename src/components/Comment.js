import React, { useState, useEffect } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import { db } from "../config/Firebase";
import { Twemoji } from "react-emoji-render";

function Comment(props) {
	const [img, setImg] = useState("");

	useEffect(() => {
		db.collection("users")
			.doc(props.data.id)
			.onSnapshot((snapshot) => setImg(snapshot.data().fileURL));
	}, []);

	return (
		<div className="comment">
			<Avatar src={img} />
			<div className="comment__text">
				<p className="comment__maker">{props.data.name}</p>
				<p>
					<Twemoji text={props.data.text} className="twemoji" />
				</p>
			</div>
		</div>
	);
}

export default Comment;
