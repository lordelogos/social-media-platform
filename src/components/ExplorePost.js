import React, { useState, useRef, useLayoutEffect } from "react";
import "./ExplorePost.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { Link } from "react-router-dom";

function ExplorePost({ id, data }) {
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
		<Link to={`/p/${id}`}>
			<div className="explorepost" style={imageSize} ref={imgRef}>
				<img src={data.photo} alt={data.name} />
				<div className="explorepost__stats">
					<span>
						<FavoriteIcon /> {data.likes}
					</span>
					<span>
						<ChatBubbleIcon /> {data.likes}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ExplorePost;
