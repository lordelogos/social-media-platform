import React, { useState } from "react";
import InputEmoji from "react-input-emoji";
import { IconButton } from "@material-ui/core";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import "./MakeComment.css";
import { db } from "../config/Firebase";
import { useStateValue } from "../config/StateProvider";

let Posts = (props) => {
	// props.id id of post
	const [{ user }] = useStateValue();
	const [text, setText] = useState("");

	let handleClick = () => {};

	function handleOnEnter(text) {
		if (user && text.trim() !== "" && text.trim() !== null) {
			db.collection("posts").doc(props.id).collection("comments").add({
				name: user.displayName,
				text: text,
				id: user.uid,
			});
		}
	}

	return (
		<div className="makecomment">
			<InputEmoji
				value={text}
				onChange={setText}
				cleanOnEnter
				onEnter={handleOnEnter}
				maxLength={200}
				placeholder="Press Enter To Comment"
			/>
			{/* <IconButton onClick={handleClick}>
				<SendRoundedIcon />
			</IconButton> */}
		</div>
	);
};

export default Posts;
