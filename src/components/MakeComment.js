import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import "./MakeComment.css";

let Posts = () => {
	const [text, setText] = useState("");

	function handleOnEnter(text) {
		console.log("enter", text);
	}

	return (
		<form className="makecomment">
			<InputEmoji
				value={text}
				onChange={setText}
				cleanOnEnter
				onEnter={handleOnEnter}
				maxLength={200}
				placeholder="Write a comment.."
			/>
			<IconButton type="submit">
				<SendRoundedIcon />
			</IconButton>
		</form>
	);
};

export default Posts;
