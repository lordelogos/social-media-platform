import React from "react";
import { Avatar } from "@material-ui/core";
import "./Posts.css";
import Comment from "./Comment";
import MakeComment from "./MakeComment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

function Posts() {
	return (
		<div className="post">
			<div className="post__nav">
				<Avatar />
				<p>Display Name</p>
				<MoreHorizIcon />
			</div>
			<img className="post__image" src="" alt="" />
			<div className="post__content">
				text is a text and this is a text and text is a test and this is a test{" "}
			</div>
			<div className="post__stats">
				<span>
					<FavoriteIcon /> 10
				</span>
				<span className="post__stats__comments">10 Comments</span>
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
				<Comment />
				<Comment />
			</div>
			<div className="add_comment">
				<MakeComment />
			</div>
		</div>
	);
}

export default Posts;
