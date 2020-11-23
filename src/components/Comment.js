import React from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";

function Comment() {
	return (
		<div className="comment">
			<Avatar />
			<div className="comment__text">
				<p>Name Name</p>
				<p>Comment text goes here..</p>
			</div>
		</div>
	);
}

export default Comment;
