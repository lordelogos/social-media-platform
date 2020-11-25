import React, { useState, useRef, useLayoutEffect } from "react";
import "./ExplorePost.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";

function ExplorePost() {
	const [height, setHeight] = useState("100px");

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

	const imageSize = {
		position: "relative",
		width: "100%",
		height: height,
		cursor: "pointer",
	};

	return (
		<Link to="/p/12">
			<div className="explorepost" style={imageSize} ref={imgRef}>
				<img src="" alt="" />
				<div className="explorepost__stats">
					<span>
						<FavoriteIcon /> 10
					</span>
					<span>
						<ChatBubbleIcon /> 10
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ExplorePost;
