import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import "./ShowPost.css";
import MakeComment from "./MakeComment";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import { Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function ShowPost() {
	const history = useHistory();
	return (
		<div className="showpost">
			<CloseIcon
				fontSize="large"
				style={{ fill: "white" }}
				onClick={() => history.push("/explore")}
			/>
			<div className="showpost__card">
				<img src="" alt="" />
				<div className="showpost__info">
					<div className="showpost__nav">
						<Avatar />
						<p>Display Name</p>
						<MoreHorizIcon />
					</div>
					<div className="showpost__textContent">
						<p>This is the text portion</p>
					</div>
					<div className="showpost__stats">
						<p>10 Likes</p>
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
